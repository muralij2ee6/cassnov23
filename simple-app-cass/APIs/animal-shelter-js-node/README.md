# Animal Shelter - JavaScript / Node

Implementation of the Animal Shelter API implemented with JavaScript / Node

## Local Setup

1. Requires node installed
3. Running with an in-memory objects
    ```bash 
    npm install 
    node run app.js
    ```
4. Run with a MySQL database in a [Docker container](../../database/mysql/README.md)
  ```bash
  export DB_TYPE=mysql
  export DB_HOST=host.docker.internal
  export DB_DATABASE=animal_shelter 
  export DB_USER=shelter 
  export DB_PASSWORD=shelter
  
  npm install 
  node app.js
  ```

# Testing the installation
Send a POST request using the following CURL
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "description": "hungry", "name": "Scout", "type": "DOG", "birthdate": "2022-9-22"
}' http://localhost:8080/animals
```
Send a GET request using the following CURL
```bash
curl -X GET http://localhost:8080/animals
```

## Docker image build
  ```
  docker build -t animal-shelter:javascript .
  ```

## Run the newly built image with H2
   ```text
   docker run -d -p 8080:8080 -eDB_TYPE=test animal-shelter:javascript
   ```
## Running the container with Animal Shelter MySQL database
  - [animal-shelter-db container](../../database/mysql/README.md)
  ```
  docker run -d -p 8080:8080 -eDB_TYPE=mysql \
    -eDB_HOST=host.docker.internal \
    -eDB_PORT=3306 \
    -eDB_DATABASE=animal_shelter \
    -eDB_USER=shelter \
    -eDB_PASSWORD=shelter \
    animal-shelter:javascript 
  ```
