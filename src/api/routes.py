"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        if not data["email"] or not data["password"]: 
            raise Exception("Missing required information")
        
        #Check if user is registered
        stm = select(User).where(User.email==data["email"])
        user = db.session.execute(stm).scalar_one_or_none()

        if user is not None:
            return jsonify({"Error": "This email is already registered, please log in"}), 418
        
        #hash password to not show to others
        hashed_password = generate_password_hash(data["password"])

        new_user = User(
            email=data["email"],
            password=hashed_password,
            is_active=True
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"User created": True})
        
    except Exception as e:
        print(e)
        return jsonify({"Error": "Something went wrong, please try again later"})



@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json

        if not data["email"] or not data["password"]: 
            raise Exception("Required information is missing")
        
        #Check if the user has an account
        stm = select(User).where(User.email==data["email"])
        user = db.session.execute(stm).scalar_one_or_none()

        if not user:
            return jsonify({"error": "User not found, please sign up"}), 418
        
        #Check if the password matches the user
        if not check_password_hash(user.password, data["password"]):
            return jsonify({"error": "email/contraseña no valido"}), 418

       #Generate str token as it's not possible to be a number
        token = create_access_token(identity=str(user.id))
  

        return jsonify({"User logged": True, "Token": token})
    
    except Exception as e:
        print(e)
        return jsonify({"Error": "Something went wrong, please try again later"})


#Private endpoint
@api.route('/private', methods=['GET'])
@jwt_required() #obliga a enviar el token desde el front
def get_user_info():

    id = get_jwt_identity()
    stm = select(User).where(User.id == id)
    user = db.session.execute(stm).scalar_one_or_none()
    
    if not user:
        return jsonify({"Success": False, 'Message': 'User not registered'})

    return jsonify({"Success": True, 'User':user.serialize()})
