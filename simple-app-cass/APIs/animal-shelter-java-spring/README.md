# Animal Shelter - Java/Spring

Implementation of the Animal Shelter API implemented with Java / Spring

## Local Setup

1. Requires Java 11 installed
2. Build command - `./gradlew clean build`
3. Running with an H2 in-memory database
    `./gradlew -DDB_TYPE=test bootRun`
4. Run with a MySQL database in [Docker container](../../database/mysql/README.md)
  ```bash
  export DB_TYPE=mysql
  export DB_HOST=
  export DB_PORT=<db port number>
  export DB_NAME=animal_shelter 
  export DB_USER=shelter 
  export DB_PWD=shelter
  ./gradlew bootRun 
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
1. `docker build -t animal-shelter:java .`

## Run the newly built image with H2
   ```text
   docker run -p 8080:8080 -eDB_TYPE=test animal-shelter:java
   ```
## Running the container with Animal Shelter MySQL database
  - [animal-shelter-db container](../../database/mysql/README.md)
  ```
  docker run -p 8080:8080 -eDB_TYPE=mysql \
    -e DB_HOST=host.docker.internal \
    -e DB_PORT=3306 \
    -e DB_NAME=animal_shelter \
    -e DB-USER=shelter \
    -e DB-PWD=shelter \
    animal-shelter:java 
  ```

