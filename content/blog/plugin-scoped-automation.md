---
title: "Plugin-scoped automation: How AI Crew Suite maintains context across workflows"
description: "Explore how each plugin maintains its own memory and context, enabling complex multi-step workflows without losing track of dependencies."
publishedAt: "August 20, 2026"
previewImage: "feature-02"
author: "AI Crew Suite Team"
tags: ["architecture", "plugins", "workflows", "context"]
---

# Plugin-Scoped Automation

One of the most challenging aspects of building agentic workflows is maintaining context across multiple steps and tool invocations. AI Crew Suite solves this through **plugin-scoped automation** - a design pattern where each plugin manages its own memory and context lifecycle.

## The Context Problem

Consider a typical incident response workflow:

1. **Detect** - Alert fires in Alertmanager
2. **Diagnose** - Gather logs, metrics, and traces
3. **Remediate** - Execute runbook steps
4. **Document** - Generate post-mortem

If each step runs as an independent LLM call, the system loses context between steps. The remediation step doesn't know what the diagnosis found, and the documentation step doesn't know what actions were taken.

## Plugin-Scoped Memory

In AI Crew Suite, each plugin maintains a **session-based memory** that persists throughout a workflow execution. This memory is scoped to:

- **Plugin instance** - Separate memory per plugin
- **Workflow execution** - Memory cleared when workflow completes
- **User session** - Memory can optionally persist across multiple interactions

```typescript
type PluginMemory = {
  sessionId: string;
  workflowId: string;
  evidence: Record<string, Evidence>;
  decisions: Decision[];
  context: Record<string, any>;
};
```

## Context Inheritance Across Plugins

While each plugin has its own memory, plugins can inherit context from upstream plugins through well-defined interfaces.

### Example: Incident Response Chain

```
Alert Fatigue Tuner
    ↓ (provides optimized thresholds)
Kubernetes AI Responder
    ↓ (provides diagnostic evidence)
Incident Post-Mortem Generator
```

Each plugin in the chain receives a **context envelope** containing:
- Previous plugin's findings
- Evidence collected so far
- Decisions made
- Resource usage metrics

## Memory Implementation

### 1. Deterministic Context Gathering
Before any LLM interaction, plugins gather all available context programmatically:

```typescript
async function gatherContext(trigger: Trigger): Promise<Context> {
  return {
    // Always gather these evidence types
    metrics: await getRelevantMetrics(trigger),
    logs: await getRelevantLogs(trigger, { maxBytes: 1024 * 1024 }),
    traces: await getRelevantTraces(trigger),
    // Plugin-specific context
    pluginState: await getPluginState(trigger),
  };
}
```

###他的话

### 2. Memory Pruning
To prevent memory bloat, plugins automatically prune:
- Old evidence beyond relevance window
- Duplicate findings
- Low-confidence observations

### 3. Persistence Strategies
Plugins support multiple persistence backends:
- **In-memory** - For single-user sessions
- **Redis** - For distributed deployments
- **PostgreSQL** - For audit and compliance requirements

## Workflow Examples

### Multi-Step Incident Diagnosis

```yaml
workflow:
  id: "kubernetes-incident-triage"
  steps:
    - plugin: "kubernetes-ai-responder"
      action: "diagnose"
      inputs:
        alert: "PodCrashLooping"
        namespace: "production"
    - plugin: "runbook-automation"
      action: "execute"
      inputs:
        runbook: "pod-crash-recovery"
        context: "{{previous_step.findings}}"
    - plugin: "incident-post-mortem"
      action: "generate"
      inputs:
        template: "standard-rca"
        context: "{{all_previous_steps}}"
```

### Cross-Plugin Context Sharing

```typescript
// Plugin A stores context
await memory.set("diagnosis", {
  rootCause: "memory leak",
  evidence: ["heap-dump-analysis", "gc-logs"],
});

// Plugin B retrieves context
const diagnosis = await memory.get("diagnosis");
// Plugin B can now act on the diagnosis
```

## Benefits of Plugin-Scoped Automation

### 1. Predictable Resource Usage
Each plugin knows its own memory limits and cleans up after itself.

### 2. Isolated Failures
A bug in one plugin's memory management doesn't affect other plugins.

### 3. Testability
Plugins can be tested in isolation with mocked memory.

### 4. Composability
Plugins can be combined in novel ways without redesign.

## Implementation Guide

Adding plugin-scoped memory to your own Backstage plugin:

```typescript
import { createPluginWithMemory } from "@webstackbuilders/plugin-ai-core";

export const myPlugin = createPluginWithMemory({
  id: "my-plugin",
  memoryConfig: {
    maxSize: 1024 * 1024, // 1MB
    ttlSeconds: 3600, // 1 hour
    persistence: "redis", // or "memory", "postgres"
  },
  workflow: async ({ memory, context }) => {
    // Store evidence
    await memory.set("evidence", context.evidence);
    
    // Retrieve later
    const storedEvidence = await memory.get("evidence");
    
    return { findings: storedEvidence };
  },
});
```

## Next Steps

Plugin-scoped automation is just one of the architectural patterns in AI Crew Suite. In future posts, we'll cover:

- **Evidence Collection Patterns** - Bounded, cited, verifiable data gathering
- **Tool Selection Algorithms** - Programmatic tool choice without LLMs
- **Safety Gates** - Human approval workflows for dangerous operations

Check out our [Developer Guide](/docs/developer-guide) to start building your own plugin-scoped automations.