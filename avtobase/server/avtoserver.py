"""Avtobase HTTP API.

Changes from the first version:
  * a connection pool with one cursor per request, instead of a single module
    level cursor shared by every worker thread;
  * the write endpoints require an admin bearer token - the frontend only ever
    greyed out the buttons, the API itself accepted anything;
  * request bodies are validated, so a missing field is a 400 rather than an
    unhandled KeyError;
  * CORS is limited to the configured origins and debug defaults to off.
"""
from contextlib import contextmanager
from functools import wraps

import mysql.connector
from mysql.connector import pooling
from flask import Flask, g, jsonify, request
from flask_cors import CORS

import config
from users_db import authenticate, revoke_token, user_for_token

app = Flask(__name__)
CORS(app, origins=config.CORS_ORIGINS, supports_credentials=True)

config.require_db_password()

# A pool hands each request its own connection. The previous global cursor was
# shared across threads, which corrupts results under concurrent requests.
connection_pool = pooling.MySQLConnectionPool(
    pool_name="avtobase_pool",
    pool_size=int(getattr(config, "DB_POOL_SIZE", 5)),
    pool_reset_session=True,
    **config.mysql_connector_kwargs(),
)


@contextmanager
def db_cursor(commit=False):
    """Borrow a pooled connection for the duration of one operation."""
    conn = connection_pool.get_connection()
    cursor = conn.cursor()
    try:
        yield cursor
        if commit:
            conn.commit()
    except Exception:
        if commit:
            conn.rollback()
        raise
    finally:
        cursor.close()
        conn.close()  # returns it to the pool


# --------------------------------------------------------------------------
# auth
# --------------------------------------------------------------------------

def _bearer_token():
    header = request.headers.get("Authorization", "")
    prefix = "Bearer "
    return header[len(prefix):].strip() if header.startswith(prefix) else None


def require_admin(view):
    """Reject anyone who is not a signed in admin (role 1)."""
    @wraps(view)
    def wrapper(*args, **kwargs):
        user = user_for_token(_bearer_token())

        if user is None:
            return jsonify({"error": "Authentication required"}), 401
        if user.get("role") != 1:
            return jsonify({"error": "Administrator rights required"}), 403

        g.current_user = user
        return view(*args, **kwargs)

    return wrapper


REQUIRED_VEHICLE_FIELDS = (
    "brand", "model", "year", "price", "fuel_type", "doors", "description", "image_url",
)


def read_vehicle_payload():
    """Validate the request body. Returns (values, error_response)."""
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None, (jsonify({"error": "A JSON body is required"}), 400)

    missing = [field for field in REQUIRED_VEHICLE_FIELDS if field not in data]
    if missing:
        return None, (jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400)

    try:
        values = (
            int(data["brand"]),
            str(data["model"]).strip(),
            int(data["year"]),
            float(data["price"]),
            int(data["fuel_type"]),
            int(data["doors"]),
            str(data["description"] or ""),
            str(data["image_url"] or ""),
        )
    except (TypeError, ValueError):
        return None, (jsonify({"error": "brand, year, price, fuel_type and doors must be numbers"}), 400)

    if not values[1]:
        return None, (jsonify({"error": "Model is required"}), 400)

    return values, None


# --------------------------------------------------------------------------
# routes
# --------------------------------------------------------------------------

@app.route('/brands', methods=['GET'])
def get_brands():
    try:
        with db_cursor() as cursor:
            cursor.execute("SELECT id, brand FROM vehicle_brand")
            rows = cursor.fetchall()
    except mysql.connector.Error as e:
        app.logger.error("Fetching brands failed: %s", e)
        # Previously this returned an empty list, so a database outage was
        # indistinguishable from "there are no brands".
        return jsonify({'error': 'Could not load brands'}), 500

    return jsonify([{"id": row[0], "brand": row[1]} for row in rows])


@app.route('/vehicles', methods=['POST'])
def get_vehicles():
    params = request.get_json(silent=True) or {}

    query = (
        "SELECT id, brand, model, year, price, fuel_type, doors, description, image_url "
        "FROM vehicles"
    )
    conditions = []
    params_list = []

    checked_brands = params.get('checkedBrands') or []
    if checked_brands:
        placeholders = ', '.join(['%s'] * len(checked_brands))
        conditions.append(f"brand IN ({placeholders})")
        params_list.extend(checked_brands)

    if params.get('fromPrice') not in (None, ""):
        conditions.append("price >= %s")
        params_list.append(params['fromPrice'])

    if params.get('toPrice') not in (None, ""):
        conditions.append("price <= %s")
        params_list.append(params['toPrice'])

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    # Keep the response bounded; the table is unpaginated otherwise.
    query += " ORDER BY id LIMIT %s OFFSET %s"
    try:
        limit = min(int(params.get('limit', 200)), 500)
        offset = max(int(params.get('offset', 0)), 0)
    except (TypeError, ValueError):
        limit, offset = 200, 0
    params_list.extend([limit, offset])

    try:
        with db_cursor() as cursor:
            cursor.execute(query, params_list)
            rows = cursor.fetchall()
    except mysql.connector.Error as e:
        app.logger.error("Fetching vehicles failed: %s", e)
        return jsonify({'error': 'Could not load vehicles'}), 500

    return jsonify([
        {
            "id": row[0],
            "brand": row[1],
            "model": row[2],
            "year": row[3],
            "price": row[4],
            "fuel_type": row[5],
            "doors": row[6],
            "description": row[7],
            "image_url": row[8],
        }
        for row in rows
    ])


@app.route('/add_vehicle', methods=['POST'])
@require_admin
def add_vehicle():
    values, error = read_vehicle_payload()
    if error:
        return error

    query = """
        INSERT INTO vehicles (brand, model, year, price, fuel_type, doors, description, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    try:
        with db_cursor(commit=True) as cursor:
            cursor.execute(query, values)
            new_id = cursor.lastrowid
    except mysql.connector.Error as e:
        app.logger.error("Adding vehicle failed: %s", e)
        return jsonify({'error': 'Could not add the vehicle'}), 500

    return jsonify({'message': 'Vehicle added successfully', 'id': new_id}), 201


@app.route('/update_vehicle/<int:vehicle_id>', methods=['PUT'])
@require_admin
def update_vehicle(vehicle_id):
    values, error = read_vehicle_payload()
    if error:
        return error

    query = """
        UPDATE vehicles
        SET brand = %s, model = %s, year = %s, price = %s, fuel_type = %s,
            doors = %s, description = %s, image_url = %s
        WHERE id = %s
    """
    try:
        with db_cursor(commit=True) as cursor:
            cursor.execute(query, values + (vehicle_id,))
            affected = cursor.rowcount
    except mysql.connector.Error as e:
        app.logger.error("Updating vehicle failed: %s", e)
        return jsonify({'error': 'Could not update the vehicle'}), 500

    if affected == 0:
        return jsonify({'error': 'Vehicle not found'}), 404

    return jsonify({'message': 'Vehicle updated successfully'}), 200


@app.route('/delete_vehicle/<int:vehicle_id>', methods=['DELETE'])
@require_admin
def delete_vehicle(vehicle_id):
    try:
        with db_cursor(commit=True) as cursor:
            cursor.execute("DELETE FROM vehicles WHERE id = %s", (vehicle_id,))
            affected = cursor.rowcount
    except mysql.connector.Error as e:
        app.logger.error("Deleting vehicle failed: %s", e)
        return jsonify({'error': 'Could not delete the vehicle'}), 500

    if affected == 0:
        return jsonify({'error': 'Vehicle not found'}), 404

    return jsonify({'message': 'Resource deleted successfully'}), 200


@app.route('/login', methods=['POST'])
def user_login():
    params = request.get_json(silent=True) or {}
    email = params.get('name')
    password = params.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = authenticate(email, password)
    if user is None:
        # One generic message so the response cannot be used to probe for
        # which email addresses exist.
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify(user), 200


@app.route('/logout', methods=['POST'])
def user_logout():
    revoke_token(_bearer_token())
    return jsonify({'message': 'Logged out'}), 200


@app.route('/me', methods=['GET'])
def current_user():
    user = user_for_token(_bearer_token())
    if user is None:
        return jsonify({'error': 'Authentication required'}), 401
    return jsonify(user), 200


if __name__ == '__main__':
    # Debug is off unless AVTO_DEBUG is set: the reloader console is a remote
    # code execution hole if the port is ever reachable.
    app.run(debug=config.DEBUG)
