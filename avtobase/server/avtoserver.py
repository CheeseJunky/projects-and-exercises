from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db_host = "localhost"
db_user = "root"
db_password = "admin"
db_name = "avtobase"

# Connect to the database, create cursor for executing SQL statements
conn = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name,
        collation="utf8mb4_general_ci"
)
cursor = conn.cursor()


@app.route('/brands', methods=['GET'])
def get_brands():
    brands = []

    try:
        # fetch vehicle brands from db, structure: id, brand
        query = "SELECT * FROM vehicle_brand"
        cursor.execute(query)
        rows = cursor.fetchall()

        for row in rows:
            brands.append({"id": row[0], "brand": row[1]})

    except mysql.connector.Error as e:
        print("Error:", e)

    return jsonify(brands)

@app.route('/delete_vehicle/<int:resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    try:
        query = "DELETE FROM vehicles WHERE id = %s"
        cursor.execute(query, (resource_id,))
        conn.commit()

        return jsonify({'message': 'Resource deleted successfully'}), 200
    
    except mysql.connector.Error as e:
        # Handle database errors
        return jsonify({'error': str(e)}), 500
    
@app.route('/add_vehicle', methods=['POST'])
def add_vehicle():
    try:
        # get data from request
        vehicle_data = request.get_json()

        # construct and execure query
        query = """
            INSERT INTO vehicles (brand, model, year, price, fuel_type, doors, description, image_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            vehicle_data['brand'],
            vehicle_data['model'],
            vehicle_data['year'],
            vehicle_data['price'],
            vehicle_data['fuel_type'],
            vehicle_data['doors'],
            vehicle_data['description'],
            vehicle_data['image_url']
        ))
        conn.commit()

        return jsonify({'message': 'Vehicle added successfully'}), 201
    
    except mysql.connector.Error as e:
        # Handle database errors
        return jsonify({'error': str(e)}), 500
    
@app.route('/update_vehicle/<int:vehicle_id>', methods=['PUT'])
def update_vehicle(vehicle_id):
    try:
        # get data from request body
        vehicle_data = request.get_json()

        # generate and execute the query
        query = """
            UPDATE vehicles
            SET brand = %s, model = %s, year = %s, price = %s, fuel_type = %s, doors = %s, description = %s, image_url = %s
            WHERE id = %s
        """
        cursor.execute(query, (
            vehicle_data['brand'],
            vehicle_data['model'],
            vehicle_data['year'],
            vehicle_data['price'],
            vehicle_data['fuel_type'],
            vehicle_data['doors'],
            vehicle_data['description'],
            vehicle_data['image_url'],
            vehicle_id
        ))
        conn.commit()

        return jsonify({'message': 'Vehicle updated successfully'}), 200

    except mysql.connector.Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/vehicles', methods=['POST'])
def get_vehicles():
    vehicles = []

    try:
        # get data from request body
        params  = request.get_json()
        
        # by default we return all vehicles
        # TODO: optimize / paginate query
        query = "SELECT * FROM vehicles"
        conditions = []
        params_list = []
        # brand, from and to are optional parameters
        if 'brand' in params:
            conditions.append("brand = %s")
            params_list.append(params['brand'])
        if 'fromPrice' in params:
            conditions.append("price >= %s")
            params_list.append(params['fromPrice'])
        if 'toPrice' in params:
            conditions.append("price <= %s")
            params_list.append(params['toPrice'])

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        cursor.execute(query, params_list)
        rows = cursor.fetchall()

        # structure the data for further use
        for row in rows:
            vehicles.append({
                "id": row[0], 
                "brand": row[1],
                "model": row[2],
                "year": row[3],
                "price": row[4],
                "fuel_type": row[5],
                "doors": row[6],
                "description": row[7],
                "image_url": row[8],
            })

    except mysql.connector.Error as e:
        print("Error:", e)

    return jsonify(vehicles)


if __name__ == '__main__':
    app.run(debug=True)