# README.md

# REFACTORING OF MONOLITH TO MICROSERVICES  ****

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### The project is split into two parts:

1. Frontend - Angular web application built with Ionic Framework
2. Backend RESTful API - Node-Express application

## Container and Microservices

### Divide an application into microservices

Refactoring the Udagram Backend API

- Backend-api [here](https://github.com/eedygreen/Monlith-Microservices/tree/dev/udagram-api)
    - Backend-feed [here](https://github.com/eedygreen/Monlith-Microservices/tree/dev/udagram-api/backend_feed) - /feed
    - Backend-users [here](https://github.com/eedygreen/Monlith-Microservices/tree/dev/udagram-api/backend_users) - /users

The Backend API was separeated into two microservices API as independent services.

### Build and run a container image using Docker

The project includes Dockerfiles to successfully create Docker images for /feed, /user backends, project frontend, and reverse proxy.

### Dockerfiles

- Backend Dockerfile
    - Feed [here](https://github.com/eedygreen/Monlith-Microservices/blob/dev/udagram-api/backend_feed/Dockerfile)
    - Users [here](https://github.com/eedygreen/Monlith-Microservices/blob/dev/udagram-api/backend_users/Dockerfile)
- Reverse-Proxy Dockerfile [here](https://github.com/eedygreen/Monlith-Microservices/blob/dev/reverse_proxy/Dockerfile)
- Frontend Dockerfile [here](https://github.com/eedygreen/Monlith-Microservices/blob/dev/udagram-frontend/Dockerfile)
- Base Image [here](https://github.com/eedygreen/Monlith-Microservices/blob/dev/udagram-api/base_image/Dockerfile)

### DockerHub Images

- Backend Images

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/nodejs_base_image.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/nodejs_base_image.png)

Fig 1.0: NodeJs Base Image

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_users_image.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_users_image.png)

Fig 1.1: Backend Users Docker Image

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_feed_image.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_feed_image.png)

Fig 1.2: Backend Feed Docker Image

Reverse-Proxy

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/reverse_proxy_image.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/reverse_proxy_image.png)

Fig 1.3: Reverse Proxy Docker Image

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/frontend_Docker_image.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/frontend_Docker_image.png)

Fig 1.4: Frontend Docker Image

<br>

### Independent Releases and Deployments

- Travis Config File

With Travis CI, the independent releases and deployment was automated following DevOps and Security best practices.

The configuration file .travis.yml can be found in the [Monolith-Microservices](https://github.com/eedygreen/Monlith-Microservices/blob/dev/.travis.yml) source repo.

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/travis_config_file.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/travis_config_file.png)

Fig 1.5: Travis Configuration File

<br>

- Travis Interface - Deployment Status

![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/Travis_CI_Interface.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/Travis_CI_Interface.png)

Fig 1.6: Travis Interface

<br>

### Service Orchestration with Kubernetes

- Create ConfigMap

Config file or Config.yaml file

```bash
POSTGRES_HOST: host_address
POSTGRES_DB: database_name
AWS_BUCKET: bucket_name
AWS_REGION: region
AWS_PROFILE: profile_name
JWT_SECRET: jwt_token
URL: http:
```

```bash
kubectl create -f confimap <name.yaml>

or 

kubectl create configmap <configmap_name> --from-file config
```

- Create Secret

 Encode the Data

```bash
base64 login_credentials
```

Create the secret.yaml file

```yaml
kind: Secret
metadata:
  name: env-secret
type: Opaque
data:
  POSTGRES_USERNAME: <your_base64_encoded_data>
  POSTGRES_PASSWORD: <your_base64_encoded_data>
```

- **Deployed Microservices using a Kubernetes cluster on AWS**
    - `kubectl get pods`

    ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/pods_running.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/pods_running.png)

    Fig 2.1: Deployed Resources

    <br>

    - `kubectl describe services`

    ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure1.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure1.png)

    ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure2.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure2.png)

    ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure3.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/services_no_exposure3.png)

    Fig 2.2: Sensitive Data Not Expose

    <br>

    - **Reverse proxy to direct requests to the appropriate backend**

    ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/loadbalancers.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/loadbalancers.png)

    Fig 2.3: Reverse Proxy

    <br>

    - S**caling and Self-healing for each service**
        - Replicas Defined in Deployment.yaml

        ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/replicas_deployment_manifest.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/replicas_deployment_manifest.png)

        Fig 2.4: Deployment File with 2 Replicas

        `kubectl apply -f deployment.yaml` 

        `kubectl get pods`

        ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/2_replicas.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/2_replicas.png)

        Fig 2.5: Deployment Status

        <br>

        Note: The next steps depends on Metric Server

        Installing metric server can be done in one of the following

        1. [Kubernetes Metric Server](https://github.com/kubernetes-sigs/metrics-server#deployment) 

        ```bash
        kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
        ```

        2. Helm charts

        Note: Previous Metric Server on helm is deprecated, use the [prometheus adaptor](https://github.com/helm/charts/tree/master/stable/prometheus-adapter) instead.

        ```bash
        helm install --name my-release stable/prometheus-adapter
        ```

    - **Autoscaling with CPU Metrics**

        `kubectl describe hpa backend-api`

        ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/hpa_backend-api.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/hpa_backend-api.png)

        Fig 2.6: Autoscaling with CPU Metrics

        <br>

        ### Debugging, Monitoring, and Logging

        ![README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_log_metrics.png](README%20md%203a1ad6a1fb0e4815b2aa8c2ebff2bcbe/backend_log_metrics.png)

        Fig 2.7: Debugging DB Connection Request

        ### Problems

        ### Solutions