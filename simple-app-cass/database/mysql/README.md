# MySQL database for the Animal Shelter application

This project customizes the database for the associated animal-shelter application and packages it in its own docker image

***Dockerfile***: Specifies the environment variables from Docker Hub.  

## Kubernetes installation files:
- `animal_shelter_mysql.sql`: The database creation load script
- `configMap.yaml`: Configuration file
- `secrets.yaml`: Secrets configuration

## Build the docker image 

`docker build -t animal-shelter-db:mysql .` 

## Run the new container 

`docker run -d -p3306:3306 --name shelter-db animal-shelter-db:mysql`

## Confirm that the container is running

`docker ps | grep shelter-db`

You should see the container

## Connecting to the database with a local MySQL client 
- `brew install mysql-client`
- Values are found in [Dockerfile](Dockerfile)
```
mysql -ushelter -pshelter -h127.0.0.1
```
***NOTE:*** The DNS name `localhost` won't work, but the IP address `127.0.0.1` will.

You can also connect to the database using a database tool like [DBeaver](https://dbeaver.io/)

