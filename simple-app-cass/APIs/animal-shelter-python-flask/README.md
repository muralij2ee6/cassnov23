# Animal Shelter - Python / Flask

Implementation of the Animal Shelter API implemented with Python Flask

## Local Setup

1. Requires Python installed `brew install python`
1. Requires PIP `python3 get-pip.py`
1. Run `pip install`
1. Running with an in-memory objects
    ```bash 
    python3 app.py
    ```
1. Run with a MySQL database in a [Docker container](../../database/mysql/README.md)
  ```bash
  export USE_DATABASE=true
  export DB_HOST=host.docker.internal
  export DB_DATABASE=animal_shelter 
  export DB_USER=shelter 
  export DB_PASSWORD=shelter
  
  python3 -m flask --app app.py run --host=0.0.0.0
  ```

# Testing the installation
Send a POST request using the following CURL
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "description": "hungry", "name": "Scout", "type": "DOG", "birthdate": "2022-9-22"
}' http://localhost:5000/animals
```
Send a GET request using the following CURL
```bash
curl -X GET http://localhost:5000/animals
```

## Docker image build
  ```
  docker build -t animal-shelter:python .
  ```

## Run the newly built image with H2
   ```text
   docker run -d -p 5000:5000 -eUSE_DATABASE=false animal-shelter:python
   ```

## Running the container with Animal Shelter MySQL database
  - [animal-shelter-db container](../../database/mysql/README.md)
  ```
  docker run -d -p 5000:5000 -eUSE_DATABASE=true \
    -eDB_HOST=host.docker.internal \
    -eDB_DATABASE=animal_shelter \
    -eDB_USER=shelter \
    -eDB_PASSWORD=shelter \
    animal-shelter:python 
  ```
