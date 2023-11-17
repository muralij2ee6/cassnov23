[<<PREVIOUS: Main](README.md) 

# Exercise: Deploy the Database

In this step, you will deploy a database container to the MiniKube cluster.

The database is where the data for the application is stored.  In this application, we store the records that represent the animals in our shelter.  In the case of this application, we will create the database as a service in our Kubernetes cluster.

>Reminder: Study EACH of the configuration files to understand the options available.  If questions arise, search the vast selection of Kubernetes documentation available on the web.  Your instructor can provide more information if necessary.

## Configmap

`[Sample Apps CaaS Root]/database/mysql/configMap.yaml`

For our database, the `configmap` includes the information users may need to create or access the database.  Any generally available configuration elements can be located here, and be accessed by the database containers, and users.  Note: Do not put secure data in this config map.  This will be done in the next step.

Run the following command in a terminal to deploy the configmap to your MiniKube cluster:

```bash
# cd to the mysql folder
cd [Sample Apps CaaS Root]/database/mysql/configMap.yaml
# Apply the configMap.yaml file using kubectl
% kubectl apply -f configMap.yaml 
configmap/db-config created
```

Confirm that the configmap was deployed to the cluster:

``` 
% kubectl get configmaps
NAME               DATA   AGE
db-config          3      60s
kube-root-ca.crt   1      31m
```

## Secret

Some configuration requires secure information.  Secrets in kubernetes are encoded with base64.  Note: these are still not very secure.  However, they are more secure than a ConfigMap, and are acceptable in a development environment, especially for learning.  In a real-world situation, you should use something like Hashi Corp's [Vault](https://www.hashicorp.com/products/vault) plugin for Kubernetes.

This secret's configuration file provides two attributes, `username` and `password`.  Note that the two attribute values are un-readable.  This is because they are encoded with base64.  To decode the values use the following command:

```
% echo -n "cm9vdA==" | base64 -D
root%                        
```

To encode a value, use the following:
```
% echo -n "MyVerySecretRootPassword" | base64 
TXlWZXJ5U2VjcmV0Um9vdFBhc3N3b3Jk
```
Place the encoded value in the `config.yaml` file for the `password` attribute.

Now deploy the secrets.yaml file using the following code:

```bash
# cd to the mysql folder
cd [Sample Apps CaaS Root]/database/mysql/configMap.yaml
# Apply the configMap.yaml file using kubectl
% kubectl apply -f secrets.yaml 
secret/mysql-secrets created
```

Confirm that the secrets were applied:
```
% kubectl get secrets
NAME            TYPE     DATA   AGE
mysql-secrets   Opaque   2      56s
```

## Perform the deployment 

The final step will be to deploy the database to the cluster.  This configuration is done with the [db-deployment.yaml](database/mysql/db-deployment.yaml) file.  This file actually contains 3 configuration items, each separated with the *triple dash* `---`.  These three items could also be contained in three separate `yaml` files.

1. **Persistent Volume Claim** - 
    A PersistentVolumeClaim (PVC) is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., they can be mounted ReadWriteOnce, ReadOnlyMany or ReadWriteMany, see AccessModes).

1. **Deployment** - 
    A Deployment provides declarative updates for Pods and ReplicaSets.

1. **Service** - 
    In Kubernetes, a Service is a method for exposing a network application that is running as one or more Pods in your cluster.

Apply the `db-deployment.yaml` file with `kubectl` with the following command:

```
# cd to the mysql folder
cd [Sample Apps CaaS Root]/database/mysql/configMap.yaml
# Apply the configMap.yaml file using kubectl
% kubectl apply -f db-deployment.yaml 
persistentvolumeclaim/mysql-pv-claim created
deployment.apps/mysql created
service/mysql created
```

Note that there were 3 confirmations, one for each section of the `db-deployment.yaml` file.

Now confirm that the deployment was successful:

```
% kubectl get deployments
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
mysql   1/1     1            1           9m26s
√ mysql % kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6c84867cc4-nq8w7   1/1     Running   0          2m26s
```

`kubectl get deployments` lists the deployments in this cluster.  This listing shows that 1 of 1 mysql pods are `READY` or available to be accessed.  The same is true for the pods.  In the case of a deployment error, these commands will point you to what the problem.  Some common error messages are:

- `CrashLoopBackOff` - Indicates that the container could not be created. 
    - Check the pod logs: `kubectl logs <pod id>`
    - Describe the pod: `kubectl describe pod <pod id>`
- `OOMKilled` - Indicates that the resources allowed in the deploy yaml were exceeded.  Increase the limits, or re-configure the deployment.

Once the deployment is successful, you can attach directly to the pod with the following command:

```
% kubectl exec -it mysql-6c84867cc4-nq8w7 -- bash
bash-4.4#
```

You may remember that `exec` is the Docker command used to attach to a running container.  This command is very similar in Kubernetes except for the `--` that separates the pod from the command to execute. The prompt changes to `bash-4.4#` which indicates that we are now inside the pod, and able to execute commands in that environment, now `mysql`

Try this out by accessing the database with the following commands:

```
bash-4.4# mysql -uroot -pMyVerySecretRootPassword
bash-4.4# mysql -uroot -pMyVerySecretRootPassword
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.33 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

We are now connected to the `mysql` server using the mysql client.  Now, MySQL commands can be run, such as:

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| animal_shelter     |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

Note that the first database is `animal_shelter`, which was created on line 56 of the `db-deployment.yaml` file, and specified in the `configMap.yaml` file line 9, or the attribute `dbName`.

Now, quit the `mysql` client, and exit the pod as follows:

```
mysql> quit
Bye
bash-4.4# exit
exit
```

# Summary

Leave the `mysql` deployment running in the cluster.  In the [next exercise](096-EX2-API-Deployment.md) we will deploy the API that will access this database.
<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->

[NEXT>>: API Deployment](096-EX2-API-Deployment.md)