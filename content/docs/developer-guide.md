---
layout: default
title: Developer Guide
parent: Development
subcategory: Guides
---

# Developer Guide

{: .no_toc }

<span class="label label-blue">{{ page.subcategory }}</span>

Welcome to the AI Crew Suite Developer Guide. This documentation is for developers who want to extend, customize, or integrate AI Crew Suite plugins into their Backstage instance.

## Architecture Overview

AI Crew Suite follows a consistent architectural pattern across all plugins:

### Two-Package Layout
Each plugin consists of two separate packages:

1. **Backend Module** (`@webstackbuilders/plugin-ai-agent-backend-*`)
   - Registers workflow runners, agents, and triggers
   - Implements the core deterministic logic
   - Integrates with the `ai-core` extension point system

2. **Frontend Plugin** (`@webstackbuilders/plugin-ai-agent-frontend-*`)
   - Provides standalone pages at `/plugin-name`
   - Implements typed SSE API clients
   - Renders live workflow progress and evidence panels

### Deterministic Pipeline Pattern
All plugins follow a deterministic pipeline where:
- LLMs are used **only** for narrative synthesis
- Tool selection and execution are **programmatic**
- Evidence gathering is **bounded and scoped**
- Outputs are **citation-backed** and **validated**

## Building Your First Agent

### Prerequisites
- Familiarity with TypeScript and React
- Understanding of Backstage's plugin system
- Basic knowledge of the `ai-core` extension points

### Step 1: Project Setup
```bash
git clone https://github.com/webstackbuilders/ai-crew-suite.git
cd ai-crew-suite
pnpm install
```

### Step 2: Define Your Agent
```typescript
import { createAgentDefinition } from '@webstackbuilders/plugin-ai-core-node';

export const myNewAgent = createAgentDefinition({
  id: 'my-new-agent',
  name: 'My New Agent',
  description: 'An agent that does something useful',
  tools: ['catalog.entity.get', 'knowledge.retrieve'],
  memory: 'session',
});
```

## Core Concepts

### Deterministic Tool Selection
Never let an LLM choose tools. Instead:
```typescript
// GOOD: Programmatic tool selection
const tools = selectToolsByPattern(userQuery, predefinedToolPlans);
```

### Citation-Backed Outputs
Every claim in agent outputs must be traceable to evidence.

### Bounded Execution
Always limit resource consumption:
```typescript
const limits = {
  maxToolInvocations: 10,
  maxLogBytes: 1024 * 1024,
  timeoutSeconds: 300,
};
```

## Integration Patterns

### With Existing Backstage Plugins
```typescript
const entity = await catalogApi.getEntityByRef(entityRef);
const pods = await kubernetesApi.getPods(namespace);
```

## Testing Your Agent

### Unit Tests
```typescript
describe('MyNewAgent', () => {
  it('selects correct tools for query patterns', () => {
    const tools = selectToolsByPattern('Who owns this service?');
    expect(tools).toContain('ownership.team.get');
  });
});
```

## Best Practices

### Security
1. **Redaction First**: Always redact credentials before prompting LLMs
2. **Allow-List Tools**: Never give agents open-ended tool access
3. **Human Approval**: Gate all mutations behind explicit approval

### Performance
1. **Cache Aggressively**: Cache LLM responses and tool results when safe
2. **Stream Progress**: Use Server-Sent Events for long-running workflows
3. **Monitor Resources**: Track token usage and tool invocation counts

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/webstackbuilders/ai-crew-suite/blob/main/CONTRIBUTING.md).

## Next Steps

- [AI Core Plugin Documentation](/docs/ai-core)
- [Backstage Plugin Development Guide](https://backstage.io/docs/plugins/)
- [Example Agent Implementations](https://github.com/webstackbuilders/ai-crew-suite/tree/main/examples)
- [Back to Documentation Hub](/docs)