---
layout: default
title: Incident Response Plugins
parent: Incident Response
subcategory: Operations
---

# Incident Response Plugins

{: .no_toc }

<span class="label label-blue">{{ page.subcategory }}</span>

AI Crew Suite's incident response plugins provide automated diagnostic and tuning agents for managing Kubernetes incidents and optimizing alert systems. These plugins follow our core philosophy of **deterministic safety** — using LLMs only for narrative synthesis while keeping all decision-making logic programmatic.

## Available Plugins

### Alert Fatigue Tuner

The **Alert Fatigue Tuner** plugin provides an automated backend agent that statistically analyzes alert firing histories to identify noisy, self-clearing alert rule configurations and proposes reviewable Infrastructure-as-Code (IaC) threshold patches.

**Key Features:**
- Deterministic noise scoring using nearest-rank percentile algorithms
- Incident & deployment correlation to suppress recommendations during real incidents
- Surgical IaC discovery with exact line number pinpointing
- Human approval gate architecture (no autonomous writes)

[Read Alert Fatigue Tuner documentation →](/docs/alert-ai-tuner)

### Kubernetes AI Responder

The **Kubernetes AI Responder** plugin provides an automated diagnostic agent that investigates Kubernetes workload failures on-demand, triggered by Alertmanager webhooks or manual developer actions.

**Key Features:**
- Deterministic failure classification for common K8s errors
- Bounded log collection with memory safeguards
- Citation-backed diagnostics separating observed data from inference
- Multi-turn incident memory for follow-up troubleshooting

[Read Kubernetes AI Responder documentation →](/docs/kubernetes-ai-responder)

## Architecture Philosophy

All incident response plugins share these architectural principles:

1. **Read-Only First**: Agents start with pure diagnostics before gaining mutation capabilities
2. **Deterministic Classification**: Error patterns are mapped to evidence plans without model-driven discovery
3. **Citation Tracking**: Every claim in outputs traces back to specific evidence IDs
4. **Human-in-the-Loop**: Proposed changes require explicit approval before application
5. **Bounded Execution**: Memory, logs, and tool invocations are strictly capped

## Use Cases

### Reducing Alert Fatigue
Teams experiencing high alert volumes can use the Alert Fatigue Tuner to:
- Identify chronically noisy alerts with statistical analysis
- Review threshold adjustment proposals before application
- Correlate alerts with real incidents to avoid masking real problems

### Accelerating Incident Triage
On-call engineers can use the Kubernetes AI Responder to:
- Automatically collect bounded diagnostics when alerts fire
- Get cited root cause analysis with evidence backing
- Maintain conversation context for follow-up questions
- Reduce mean time to resolution (MTTR) for common failures

### Operational Consistency
Platform teams can standardize incident response across:
- Multiple Kubernetes clusters
- Different teams with varying expertise levels
- Day and night shift rotations
- Development and production environments

## Getting Started

### Prerequisites
- Backstage backend with `ai-core` plugin installed
- Kubernetes cluster access (for K8s responder)
- Alertmanager/Prometheus integration (for alert tuner)
- LLM provider configured in Backstage

### Installation
See individual plugin documentation for installation steps. Both plugins follow the standard two-package Backstage agent layout with backend modules and frontend pages.

## Configuration Examples

```yaml
# app-config.yaml excerpt for incident response
ai:
  agents:
    alertAiTuner:
      enabled: true
      weeklySweep:
        enabled: true
        schedule: "0 2 * * 0"  # Sundays at 2 AM
      tools:
        - kubernetes.workload.get_timeline
        - vcs.repository.read
        - vcs.pull_request.list
    
    kubernetesAiResponder:
      enabled: true
      webhookTriggers:
        - alertmanager
      tools:
        - kubernetes.pod.list
        - kubernetes.pod.logs
        - kubernetes.event.list
```

## Best Practices

1. **Start Small**: Enable one plugin at a time and monitor its behavior
2. **Review Proposals**: Always review tuning suggestions before approval
3. **Set Boundaries**: Configure memory and invocation limits appropriately
4. **Monitor Usage**: Track token consumption and tool invocation counts
5. **Iterate Gradually**: Add more capabilities as confidence grows

## Next Steps

- [Alert Fatigue Tuner documentation](/docs/alert-ai-tuner)
- [Kubernetes AI Responder documentation](/docs/kubernetes-ai-responder)
- [AI Core plugin configuration](/docs/ai-core-configuration)
- [Back to Documentation Hub](/docs)