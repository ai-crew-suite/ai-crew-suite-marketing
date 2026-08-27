---
title: "Self-hosting AI Crew Suite: A Kubernetes-ready deployment guide"
description: "Step-by-step instructions for deploying AI Crew Suite in your own infrastructure with Docker Compose and Helm charts."
publishedAt: "August 13, 2026"
previewImage: "feature-03"
author: "AI Crew Suite Team"
tags: ["deployment", "kubernetes", "docker", "self-hosting"]
---

# Self-Hosting AI Crew Suite

This guide covers Docker Compose (development/testing) and Kubernetes (production) deployments of AI Crew Suite within your own infrastructure.

## Deployment Options

### 1. **Docker Compose** (Development/Testing)
- Single-node deployment
- All dependencies included
- Perfect for evaluation and development

### 2. **Kubernetes Helm Charts** (Production)
- Multi-node, high availability
- Resource limits and requests
- Integrated with existing K8s tooling

## Docker Compose Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/webstackbuilders/ai-crew-suite.git
cd ai-crew-suite
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your Backstage URL and database credentials
```

### 3. Start Services
```bash
docker compose up -d
```

This starts:
- **PostgreSQL** - Backstage database
- **Redis** - Plugin memory store
- **Backstage** with AI Crew Suite plugins pre-installed
- **Example agents** - Pre-configured workflow runners

## Kubernetes Deployment (Production)

### 1. Add the Helm Repository
```bash
helm repo add ai-crew-suite https://webstackbuilders.github.io/ai-crew-suite-helm
helm repo update
```

### 2. Create Namespace
```bash
kubectl create namespace ai-crew-suite
```

### 3. Install Dependencies
```bash
# Install PostgreSQL (if not using external)
helm install postgres oci://registry-1.docker.io/bitnamicharts/postgresql \
  --namespace ai-crew-suite \
  --set auth.database=backstage \
  --set auth.username=backstage \
  --set auth.password=$(openssl rand -hex 16)

# Install Redis
helm install redis oci://registry-1.docker.io/bitnamicharts/redis \
  --namespace ai-crew-suite \
  --set architecture=standalone
```

### 4. Install AI Crew Suite
```bash
helm install ai-crew-suite ai-crew-suite/ai-crew-suite \
  --namespace ai-crew-suite \
  --values values-production.yaml
```

### Example values-production.yaml
```yaml
backstage:
  enabled: true
  image:
    repository: ghcr.io/webstackbuilders/backstage-with-ai-crew-suite
    tag: latest
  ingress:
    enabled: true
    className: nginx
    hosts:
      - host: backstage.company.com
        paths:
          - path: /
            pathType: Prefix
```

## Configuration

### Plugin Configuration
Each plugin can be configured via environment variables or a config map:

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ai-crew-suite-config
  namespace: ai-crew-suite
data:
  PLUGIN_KUBERNETES_AI_RESPONDER_ENABLED: "true"
  PLUGIN_KUBERNETES_AI_RESPONDER_MAX_TOOL_INVOCATIONS: "10"
  PLUGIN_ALERT_FATIGUE_TUNER_SCHEDULE: "0 2 * * 0"  # Sundays at 2 AM
```

## Monitoring and Observability

### 1. Prometheus Metrics
All plugins expose Prometheus metrics at `/metrics`:
- `ai_crew_suite_plugin_invocations_total`
- `ai_crew_suite_tool_executions_total`
- `ai_crew_suite_evidence_collected_bytes`
- `ai_crew_suite_llm_tokens_used`

### 2. Logging
Structured JSON logging with correlation IDs.

### 3. Tracing
Distributed tracing with OpenTelemetry.

## Troubleshooting

### Common Issues

#### 1. Plugin Not Appearing in Backstage
```bash
# Check plugin registration
kubectl logs deployment/backstage -n ai-crew-suite | grep "plugin.*registered"
```

#### 2. Memory Issues
```bash
# Check Redis connection
kubectl exec deployment/backstage -n ai-crew-suite -- redis-cli -h redis ping
```

## Next Steps

Once deployed, check out our:

- [Getting Started Guide](/docs/getting-started) for initial configuration
- [Plugin Documentation](/docs) for individual plugin setup

For enterprise support or custom deployment assistance, contact us at [enterprise@webstackbuilders.com](mailto:enterprise@webstackbuilders.com).