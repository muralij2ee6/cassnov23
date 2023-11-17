# Start from the mysql image on Docker Hub
FROM postgres:14.0  
ENV POSTGRES_USER=shelter
ENV POSTGRES_PASSWORD=shelter
# The script to run when the container starts
ADD animal_shelter_psql.sql /docker-entrypoint-initdb.d
EXPOSE 5432


# docker run -p 5432:5432 --name postgres -e POSTGRES_USER=autos -e  POSTGRES_PASSWORD=autos123 -d postgres

