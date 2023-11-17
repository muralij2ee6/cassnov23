# Uses AdoptOpenJDK 11 alpin image.  "Alpine" is a version that is slimed down from the full JDK, but has everything that we need.
FROM eclipse-temurin:11
WORKDIR /app
COPY build/libs/g-autos-0.0.1-SNAPSHOT.jar app.jar
CMD java -jar app.jar
EXPOSE 8080

