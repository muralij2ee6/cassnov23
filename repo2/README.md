**Public Docker image Testing insturctions README**

**Introduction**

This README provides instructions on how to run a docker image in your local workstation and test it.

**Prerequisites**
Before you begin, you'll need the following:

* Docker installed on your local machine
* Dockerhub need to be in running with no issue
* An account or access credentials to dockerhub 





1. **Log in to the registry:**

        docker login 

you should be able to see this message

        `Authenticating with existing credentials...
        Login Succeeded`
2. Run the Postsgres Database from docker hub


3. **Pull my docker image:**

Please use below command to pull and run my image on your local docker

        docker run -d -p 81:8080 muralij2ee/g-autos:latest

you should be able to see this message

        Unable to find image 'muralij2ee/g-autos:latest' locally
        latest: Pulling from muralij2ee/g-autos

4. **Testing**

Please go web browser and type

        localhost:81/autos

on a successful test you should be able to see

        [{"id":1,"year":"1967","make":"Ford","model":"Mustang"},{"id":2,"year":"1970","make":"AMC","model":"Gremlin"},{"id":3,"year":"1981","make":"Chrysler","model":"Imperial"},{"id":4,"year":"1972","make":"Chevrolet","model":"Impala"},{"id":5,"year":"1981","make":"DeLorean","model":"DMC-12"},{"id":6,"year":"1982","make":"Cadillac","model":"Cimarron"},{"id":7,"year":"1982","make":"Renault","model":"Fuego"},{"id":8,"year":"1982","make":"Alfa-Romeo","model":"Arna"},{"id":9,"year":"1984","make":"Ford","model":"Bronco II"},{"id":10,"year":"2022","make":"Tesla","model":"Model 3"}]
 
as a browser output.


