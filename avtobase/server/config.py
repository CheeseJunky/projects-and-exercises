"""Central configuration, read from the environment.

Credentials used to be hard coded in two places, and users_db pointed at a
different database ("test") than avtoserver ("avtobase"), so logins were
resolved against a different schema than the rest of the app. Everything now
reads the same values from here.
"""
import os

DB_HOST = os.environ.get("AVTO_DB_HOST", "localhost")
DB_PORT = int(os.environ.get("AVTO_DB_PORT", "3306"))
DB_USER = os.environ.get("AVTO_DB_USER", "root")
DB_NAME = os.environ.get("AVTO_DB_NAME", "avtobase")

# No default: a password does not belong in the repository, and a missing one
# should fail loudly rather than quietly trying a guessed value.
DB_PASSWORD = os.environ.get("AVTO_DB_PASSWORD", "")

# Debug mode exposes the Werkzeug console; it must never default to on.
DEBUG = os.environ.get("AVTO_DEBUG", "").lower() in ("1", "true", "yes")

# Browser origins allowed to call the API (comma separated).
CORS_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "AVTO_CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

# How long a session token stays valid.
TOKEN_TTL_HOURS = int(os.environ.get("AVTO_TOKEN_TTL_HOURS", "12"))


def require_db_password():
    """Fail with an actionable message instead of a MySQL access-denied error."""
    if not DB_PASSWORD:
        raise RuntimeError(
            "AVTO_DB_PASSWORD is not set. Set it before starting the server:\n"
            "  PowerShell:  $env:AVTO_DB_PASSWORD = '<your database password>'\n"
            "  bash:        export AVTO_DB_PASSWORD='<your database password>'\n"
            "See the Configuration section of the README."
        )


def sqlalchemy_url():
    return (
        f"mysql+mysqldb://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )


def mysql_connector_kwargs():
    return {
        "host": DB_HOST,
        "port": DB_PORT,
        "user": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "collation": "utf8mb4_general_ci",
    }
