
# Deploy a Full Stack Application 

In this exercise, you will deploy a full-stack application to a MiniKube Kubernetes cluster.  

![Sample Apps Architecture](assets/images/Sample-Apps%20Architecture.png) 

The application consists of a MySQL database, an API in one of 3 languages, and an Angular UI (Currently under development).  All applications will be provided in the Sample Apps CaaS project found in GitLab.GalvanizeLabs.net.  The project can be found in your cohort's group, in the "Sample Code" subgroup.  Your instructor will provide access for you.

There are three components you will be working on in this application:
1. DB - You will create this layer using the database image from [Docker Hub](https://hub.docker.com)
1. API - This is a RESTful API that makes calls to the database.  A version of the API is provided in Java/Spring, JavaScript/Node, and Python/Flask.  Feel free to use whatever you are most comfortable with.
1. UI - The UI is a very simple angular application that makes calls to the API.  This component will be made available as a service outside the cluster.

Note: All build and configuration files are provided for you to simplify the instructions.  These files will include explanation comments where applicable.  It is strongly recommended that you study each file thoroughly. 

Before starting this exercise, ensure that you have the MiniKube cluster selected in your environment:

```bash
% kubectl config get-contexts
CURRENT   NAME                                                            CLUSTER                                                         AUTHINFO                                                        NAMESPACE
*         minikube                                                        minikube                                                        minikube                                                 
```

The asterisk `*` indicates the selected cluster.  To select the MiniKube cluster run the following command:

`kubectl config use-context minikube`

## Steps to complete

1. [Deploy the database](095-EX1-DB-Deployment.md)
1. [Deploy the API](096-EX2-API-Deployment.md) in your preferred languages
1. [Deploy the UI](097-EX3-UI-Deployment.md) (Work In Progress) 

