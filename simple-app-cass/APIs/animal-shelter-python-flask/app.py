from flask import Flask, request, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
import os

app = Flask(__name__)

# In-memory data storage
animals_data = []

# Check if the app should use a database connection
use_database = os.environ.get('USE_DATABASE', '').lower() == 'true'

if use_database:
    import mysql.connector

    # MySQL database configuration
    db_host = os.environ.get('DB_HOST', 'localhost')
    db_user = os.environ.get('DB_USER', 'root')
    db_password = os.environ.get('DB_PASSWORD', 'password')
    db_database = os.environ.get('DB_DATABASE', 'animal_shelter')

    # Connect to the MySQL database
    db_connection = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )

    def retrieve_animals():
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM animals')
        rows = cursor.fetchall()
        cursor.close()
        return rows

    def add_animal(name, type, description, birthdate):
        cursor = db_connection.cursor()
        cursor.execute('INSERT INTO animals (name, type, description, birthdate) VALUES (%s, %s, %s, %s)',
                       (name, type, description, birthdate))
        db_connection.commit()
        inserted_id = cursor.lastrowid
        cursor.close()

        cursor = db_connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM animals WHERE id = %s', (inserted_id,))
        inserted_row = cursor.fetchone()
        cursor.close()

        return inserted_row

else:
    def retrieve_animals():
        return animals_data

    def add_animal(name, type, description, birthdate):
        new_animal = {
            'id': len(animals_data) + 1,
            'name': name,
            'type': type,
            'description': description,
            'birthdate': birthdate
        }
        animals_data.append(new_animal)
        return new_animal

# Swagger API documentation
SWAGGER_URL = '/swagger'
API_URL = '/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "Animal-Shelter"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Animals API routes
@app.route('/animals', methods=['GET'])
def get_animals():
    try:
        animals = retrieve_animals()
        return jsonify(animals)
    except Exception as e:
        print('Error retrieving animals:', e)
        return jsonify(error='Failed to retrieve animals'), 500

@app.route('/animals', methods=['POST'])
def add_animal_route():
    try:
        data = request.get_json()
        name = data.get('name')
        type = data.get('type')
        description = data.get('description')
        birthdate = data.get('birthdate')

        inserted_row = add_animal(name, type, description, birthdate)
        return jsonify(inserted_row)
    except Exception as e:
        print('Error adding animal:', e)
        return jsonify(error='Failed to add animal'), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
