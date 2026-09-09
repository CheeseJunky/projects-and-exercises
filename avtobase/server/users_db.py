"""User storage and authentication.

Changes from the first version:
  * passwords are hashed (PBKDF2 via Werkzeug) instead of stored in clear text,
    with a one-time transparent upgrade for the existing plain text rows;
  * login issues a random session token, so the admin endpoints can actually
    verify who is calling them;
  * no module level Session object - a SQLAlchemy Session is not thread safe and
    Flask serves requests from several threads.
"""
import secrets
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone

from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from werkzeug.security import check_password_hash, generate_password_hash

import config

Base = declarative_base()

config.require_db_password()

# echo=True printed every statement (including credentials) to stdout.
# pool_pre_ping recycles connections the database has dropped.
engine = create_engine(
    config.sqlalchemy_url(),
    echo=False,
    pool_pre_ping=True,
    pool_recycle=3600,
)

SessionFactory = sessionmaker(bind=engine)


@contextmanager
def session_scope():
    """One short lived session per unit of work."""
    session = SessionFactory()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


class User(Base):
    __tablename__ = "users"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(50))
    surname = Column("surname", String(50))
    username = Column("username", String(50))
    role = Column("role", Integer)
    email = Column("email", String(50))
    # Widened to hold a PBKDF2 hash - see db/002_auth.sql for the migration.
    password = Column("password", String(255))
    token = Column("token", String(255))
    token_expires = Column("token_expires", DateTime)

    def __init__(self, name, surname, username, role, email, password, token=None):
        self.name = name
        self.surname = surname
        self.username = username
        self.role = role
        self.email = email
        self.set_password(password)
        self.token = token

    def __repr__(self):
        return f"({self.id} {self.name} {self.surname} {self.username} {self.email})"

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        """True if the password matches.

        Rows created before hashing existed hold clear text; those are accepted
        once and rewritten as a hash by `authenticate` below.
        """
        stored = self.password or ""
        if _looks_hashed(stored):
            return check_password_hash(stored, password)
        # Constant time comparison so the legacy path does not leak length/prefix.
        return secrets.compare_digest(stored, password)

    def needs_password_upgrade(self):
        return not _looks_hashed(self.password or "")

    def to_dict(self):
        """Public representation. Never includes the password hash."""
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "role": self.role,
            "email": self.email,
        }


def _looks_hashed(value):
    # Werkzeug hashes look like "pbkdf2:sha256:600000$salt$digest".
    return value.startswith(("pbkdf2:", "scrypt:", "argon2"))


def _now():
    return datetime.now(timezone.utc).replace(tzinfo=None)


def authenticate(email, password):
    """Verify credentials and start a session.

    Returns the user dict plus a fresh token, or None when the credentials are
    wrong. Callers cannot tell an unknown email from a wrong password.
    """
    with session_scope() as session:
        user = session.query(User).filter(User.email == email).first()

        if user is None or not user.verify_password(password):
            return None

        # Opportunistic migration of the old clear text rows.
        if user.needs_password_upgrade():
            user.set_password(password)

        token = secrets.token_urlsafe(32)
        user.token = token
        user.token_expires = _now() + timedelta(hours=config.TOKEN_TTL_HOURS)

        result = user.to_dict()
        result["token"] = token
        return result


def user_for_token(token):
    """Resolve a bearer token to a user dict, or None if invalid/expired."""
    if not token:
        return None

    with session_scope() as session:
        user = session.query(User).filter(User.token == token).first()

        if user is None:
            return None
        if user.token_expires is None or user.token_expires < _now():
            return None

        return user.to_dict()


def revoke_token(token):
    """Log out: drop the token so it cannot be replayed."""
    if not token:
        return

    with session_scope() as session:
        user = session.query(User).filter(User.token == token).first()
        if user is not None:
            user.token = None
            user.token_expires = None


def init_db():
    """Create missing tables. Called explicitly, never on import."""
    Base.metadata.create_all(bind=engine)


def create_user(name, surname, username, role, email, password):
    """Helper for seeding an account from a shell."""
    with session_scope() as session:
        user = User(name, surname, username, role, email, password)
        session.add(user)
        session.flush()
        return user.to_dict()


if __name__ == "__main__":
    # python users_db.py  ->  create the tables if they do not exist yet
    init_db()
    print(f"schema ensured on {config.DB_NAME}")
