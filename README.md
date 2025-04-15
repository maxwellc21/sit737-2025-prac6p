# 🚀 SIT737 Kubernetes Microservice Deployment – P & C Tasks

This project demonstrates the deployment of a containerized Node.js microservice architecture using Docker, Docker Compose, and Kubernetes. It includes both the **Practical Task (6.1P)** and the **Challenge Task (6.2C)** for SIT737 – Cloud Native Application Development.

---

## 🧩 Overview

- ✅ **P Task (6.1P):** Set up Kubernetes deployment for microservices with Docker, Docker Compose, and kubectl.
- 🔁 **C Task (6.2C):** Extend 6.1P by adding liveness and readiness probes for health checks.

---

# 🛠️ Build, Push, and Deploy

#### 1. Build all images locally

```bash
    docker compose build
```

#### 2. Push images to Docker Hub

```bash
./push-all.sh
```

#### 3. Apply Kubernetes manifests

```bash
kubectl apply -f k8s/
```

#### 4. Check pod and service status

```bash
kubectl get pods
kubectl get svc
```

#### 5. Port-forward the API Gateway

```bash
kubectl port-forward svc/api-gateway 8080:80
```

#### 6. Visit in browser

```bash
http://localhost:8080
```
