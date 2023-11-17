# Start from the mysql image on Docker Hub
FROM mysql:8
# Environment variables from https://hub.docker.com/_/mysql 
ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE animal_shelter
ENV MYSQL_USER shelter
ENV MYSQL_PASSWORD shelter
# The script to run when the container starts
ADD animal_shelter_mysql.sql /docker-entrypoint-initdb.d
EXPOSE 3306

