# Simple Autos Reference Implementation

## Environment Variables 
See the file `env.sh` for the environment variables to set for this application.

Use these to for a command line run (set them to your values)
```bash 
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=automobiles
export DB_USER=autos_user
export DB_PWD=autos_user
```

Use this string to set the env vars in the IntelliJ Run Configuration
(set them to your values)
```text
DB_HOST=localhost: DB_PORT=5432: DB_NAME=automobiles:  DB_USER=autos_user: DB_PWD=autos_user
```

## To change the database
The following files point to the database you wish to use.  Currently, 
the app is configured for a MySQL database.  Reverse the comments (`#`)
to configure a PostgreSQL database:



### application.properties
```properties 
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
#spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL95Dialect
spring.datasource.url=jdbc:mysql://${DB_HOST}/${DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true
#spring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
```

### build.gradle
``` 
dependencies {
    //...

	runtimeOnly 'mysql:mysql-connector-java'
//	implementation 'org.postgresql:postgresql:42.3.6'

    //...
```

## To deploy using Docker 

1. Build the application `./gradlew build`
2. Build the docker image `docker build -t simple-autos .`
3. Run the container `docker run -d -p8080:8080 --rm simple-autos`
