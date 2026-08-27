---
layout: default
title: Operations Plugins
parent: Operations
subcategory: Maintenance
---

# Operations Plugins

{: .no_toc }

<span class="label label-blue">{{ page.subcategory }}</span>

Operations plugins in AI Crew Suite automate routine maintenance, optimization, and day-to-day operational tasks within your Backstage ecosystem. These plugins help platform teams scale their operations while maintaining strict safety controls.

## Available Plugins

### Alert Fatigue Tuner (Operations Focus)

While categorized under Incident Response, the **Alert Fatigue Tuner** serves a critical operations function by continuously optimizing alerting systems to reduce noise and improve signal clarity.

**Operational Benefits:**
- Automated weekly noise analysis across alerting systems
- Infrastructure-as-Code threshold optimization proposals
- Correlation with deployment timelines to understand impact
- Gradual, reviewable improvement of alerting hygiene

[Read Alert Fatigue Tuner documentation →](/docs/alert-ai-tuner)

### Kubernetes AI Responder (Operations Focus)

The **Kubernetes AI Responder** provides operational consistency in incident diagnosis, ensuring all team members follow the same evidence-gathering processes regardless of experience level.

**Operational Benefits:**
- Standardized diagnostic workflows for common failures
- Bounded resource consumption during investigations
- Consistent evidence collection and presentation
- Knowledge capture in persistent investigation sessions

[Read Kubernetes AI Responder documentation →](/docs/kubernetes-ai-responder)

## Operations Philosophy

AI Crew Suite's operations plugins follow these core principles:

1. **Proactive Over Reactive**: Prefer scheduled optimizations over emergency fixes
2. **Consistency Over Cleverness**: Standardized workflows beat ad-hoc brilliance at scale
3. **Transparency Over Magic**: Every recommendation is fully cited and explainable
4. **Safety Over Speed**: Human approval gates ensure no autonomous harmful actions

## Operational Workflows

### Alert Hygiene Management

**Weekly Tuning Workflow:**
1. **Friday Evening**: Alert Fatigue Tuner begins weekly noise analysis
2. **Saturday Morning**: Team reviews optimization proposals with cited evidence
3. **Monday Morning**: Approved changes are applied via Infrastructure-as-Code
4. **Wednesday Review**: Impact assessment of previous week's changes

### Incident Response Standardization

**Incident Triage Workflow:**
1. **Alert Fires**: Kubernetes AI Responder is triggered via Alertmanager webhook
2. **Automatic Diagnostics**: Bounded evidence collection begins immediately
3. **On-call Review**: Engineer examines cited diagnostic report
4. **Follow-up Questions**: Multi-turn session allows iterative investigation

## Configuration Example

```yaml
ai:
  agents:
    alertAiTuner:
      teamScoped: true
      weeklySweep:
        enabled: true
        schedule: "0 2 * * 0"  # Sundays at 2 AM
    
    kubernetesAiResponder:
      namespaceScoped: true
      resourceLimits:
        maxLogBytes: 1048576  # 1MB per investigation
        maxToolInvocations: 20
```

## Next Steps

- [Alert Fatigue Tuner documentation](/docs/alert-ai-tuner)
- [Kubernetes AI Responder documentation](/docs/kubernetes-ai-responder)
- [Operational metrics dashboard setup](/docs/operational-metrics)
- [Back to Documentation Hub](/docs)