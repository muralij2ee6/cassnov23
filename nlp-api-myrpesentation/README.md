# NLP API
This project uses hugging face transformer fast api with NLP model "bert based uncased" to give the results based on user input

Hugging facetransfomer API implementation can be found here
```bash
https://github.com/huggingface/transformers/blob/067c4a310dd36d0472d4a587145e94d20bf64964/src/transformers/commands/serving.py#L163
```

## prerequisites

install these libraries in your local 
```bash
pip install transformers[serving]
pip install torch 
transformer-cli --help
```

## Creating an API
```bash
transformers-cli serve --task=fill-mask --model=bert-base-uncased
```

Open a new terminal, test whether server is returing with GET first
```bash
curl http://localhost:8888 | jq 
```
To test actual API endpoint use below command, it should retuen a valid json for a sucessful run
```bash
curl -X POST http://localhost:8888/forward  -H "accept: application/json" -H "Content-Type: application/json" -d '{"inputs": "Today is going to be a [MASK] day"}' | jq 
```

examples results
```bash
{
  "output": [
    {
      "score": 0.28878313302993774,
      "token": 2146,
      "token_str": "long",
      "sequence": "today is going to be a long day"
    },
    {
      "score": 0.1835578829050064,
      "token": 2307,
      "token_str": "great",
      "sequence": "today is going to be a great day"
    },
    {
      "score": 0.08591026067733765,
      "token": 2502,
      "token_str": "big",
      "sequence": "today is going to be a big day"
    },
    {
      "score": 0.07791231572628021,
      "token": 2204,
      "token_str": "good",
      "sequence": "today is going to be a good day"
    },
    {
      "score": 0.07498608529567719,
      "token": 5697,
      "token_str": "busy",
      "sequence": "today is going to be a busy day"
    }
  ]
}
```

## Containerization
Build first image.
```bash
docker build -t nlp-api:v1 .
```

Build second image.
```bash
docker build -t nlp-api:v2 -f DockerfileConda .
```

Run image.
```bash
docker run -it --rm -P nlp-api:v1
```

To test locally run this command, it should bring up results in json for a sucessful test
```bash
curl -X POST http://localhost:8888/forward  -H "accept: application/json" -H "Content-Type: application/json" -d '{"inputs": "Today is going to be a [MASK] day"}' | jq 
```

To push docker images in container registry, create a deployment token and using that token create file like k8-deploy-tokent.sh ( change values with generated token).
```bash
chomod 755 k8*
source k8s-deploy-token.sh
```

To build and push the image in the container
```bash
docker login registry.gitlab.galvanize.com
docker build -t registry.gitlab.galvanize.com/galvanize-it/curricula/delivery/enterprise/sf/cse-caas-november-2023/student-work/murali-venigalla/nlp-api .
docker push registry.gitlab.galvanize.com/galvanize-it/curricula/delivery/enterprise/sf/cse-caas-november-2023/student-work/murali-venigalla/nlp-api
```

## Deploying on Kubernetes
Configure EKS in your aws account
```bash
aws eks update-kubeconfig --name <clustername> --region <region>
```


Run deployment
```bash
kubectl apply -f nlp-api.yaml
```

Create a service
```bash
kubectl apply -f nlp-service.yaml
```

Scale up.
```bash
kubectl scale deploy/nlp-api --replicas=3
```

Get logs.
```bash
kubectl logs -f PODFULLNAME
```


To test in the kubectl use this command in terminal, it should retuen a valid json for a sucessful run just like local test
```bash
curl -X POST http://<Elastic IP address of service>:8888/forward -H "accept: application/json" -H "Content-Type: application/json" -d '{"inputs": "Today is going to be a [MASK] day"}' | jq 
```