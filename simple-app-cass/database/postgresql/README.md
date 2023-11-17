# PostgreSQL database for the Animal Shelter application

This project customizes the database for the associated animal-shelter application and packages it in its own docker image

***Dockerfile***: Specifies the environment variables from Docker Hub.  

## Kubernetes installation files:
- `animal_shelter_psql.sql`: The database creation load script
- `configMap.yaml`: Configuration file
- `secrets.yaml`: Secrets configuration

## Build the docker image 

`docker build -t animal-shelter-db:psql .` 

## Run the new container 

`docker run -d -p5432:5432 --name shelter-db animal-shelter-db:psql`

## Confirm that the container is running

`docker ps | grep shelter-db`

You should see the container

Connect to the database using a database tool like [DBeaver](https://dbeaver.io/)
- Host: Localhost 
- User: shelter 
- Password: shelter 


