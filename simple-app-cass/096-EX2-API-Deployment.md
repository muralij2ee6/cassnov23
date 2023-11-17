[Home](README.md)

[<<PREVIOUS: Main](095-EX1-DB-Deployment.md) 

# Deploy the API 

Deploying the API is basically the same as deploying the database, with the exception that the API may need to be compiled, and then dockerized.  For this exercise, we will push the docker image to [Docker Hub](https://hub.docker.com), where the MiniKube cluster will pull the image from.

There are three versions of the API, each with the same specifications.  
- [Java / Spring](APIs/animal-shelter-java-spring/README.md)
- [JavaScript / Node](APIs/animal-shelter-js-node/README.md) 
- [Python / Flask](APIs/animal-shelter-python-flask/README.md) (TBD) 

Configuration and build files will contain comments where necessary.  Be sure to study these files to understand how they work.  Check the Kubernetes documentations if needed.

## Steps

1. If the language requires it, compile the source code into its executable file. 
    - Java / Spring - `./gradlew build`
    - JavaScript - No compilation is required
    - Python / Flask - No compilation is required
1. Build the docker image for the application with the supplied `Dockerfile` 
    ```
    docker build -t <YourDockerHubId>/animal-shelter:<java | javascript | python>
    ```
1. Push your new image to Docker Hub (you may need to run `docker login` first)
    ```
    docker push <YourDockerHubId>/animal-shelter:<java | javascript | python>
    ```
    - Note the `FROM` line, first in the `Dockerfile`, is an image that contains what is needed for the application:
        - Java - [eclipse-temurin:11-alpine](https://hub.docker.com/_/eclipse-temurin) Is the official openJdk image for JDK 11.  `-alpine` indicates that it's a smaller Linux implementation.
        - Node - [node](https://hub.docker.com/_/node) is the official `node` image 
        - Python - [python](https://hub.docker.com/_/python) is the official python image 
    - Each `Dockerfile` is different in the files copied, and the destination directory.  The last line indicates the command to start up the application.  
        - You should be able to run the application with this command, given the files copied. This is a good way to confirm your `Dockerfile` contents required.
1. ConfigMap - If the API requires runtime configuration, you will find a configMap.yaml file.
1. Secrets - If the API requires runtime configuration, you will find a secrets.yaml file.
1. Deployment - Follow the application notes to deploy the API to your MiniKube cluster.

## Confirm deployment of the API 
Confirm deployment using `kubectl get deployments` and `kubectl get pods`.  If you see errors, check the logs: 
```
kubectl logs <pod id>
```
or describe the specific resource:
```
kubectl describe <deployment | pod> <deployment-name | pod-id>
```

## Access the application 

1. Port-forward, or use `minikube tunnel` to map to the api service.  
    - `kubectl port-forward <pod-id> 0000:1111` where `0000` is the localhost port, and `1111` is the container / pod port.
    - `minikub tunnel` will display the IP address and port to access the service. Note: This is only for MiniKube.
1. Run the following curl commands in a new terminal to test your application:

    - Send a POST request using the following CURL
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
    "description": "hungry", "name": "Scout", "type": "DOG", "birthdate": "2022-9-22"
    }' http://localhost:8080/animals
    ```
    - Send a GET request using the following CURL
    ```bash
    curl -X GET http://localhost:8080/animals
    ```
    - Alternatively use Postman or another API access tool.

[NEXT>>: UI Deployment](097-EX3-UI-Deployment.md)
