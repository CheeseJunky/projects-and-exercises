from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(50))
    surname = Column("surname", String(50))
    username = Column("username", String(50))
    role = Column("role", Integer)
    email = Column("email", String(50))
    password = Column("password", String(50))
    token = Column("token", String(250))

    # constructor
    def __init__(self, name, surname, username, role, email, password, token):
        self.name = name
        self.surname = surname
        self.username = username
        self.role = role
        self.email = email
        self.password = password
        self.token = token

    # print
    def __repr__(self):
        return f"({self.id} {self.name} {self.surname} {self.username} {self.email})"
    
    # TODO: encrypt/decrypt pass
    def verify_password(self, password):
        return self.password == password
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "role": self.role,
            "email": self.email
        }

engine = create_engine("mysql+mysqldb://root:admin@127.0.0.1:3306/test", echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

# user = User("Admin", "Test", "testni", 1, "admin@test.com", "admin123", "")
# session.add(user)
# session.commit()


def auth_user(email, password):
    session = Session(bind=engine)

    try:
        user = session.query(User).filter(User.email == email).first()

        if user and user.verify_password(password):
            return user.to_dict()
        else: 
            return {"username": "error"}
    finally:
        session.close()
