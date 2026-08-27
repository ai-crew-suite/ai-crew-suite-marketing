---
layout: default
title: Catalog AI Plugins
parent: Catalog
subcategory: Knowledge
---

# Catalog AI Plugins

{: .no_toc }

<span class="label label-blue">{{ page.subcategory }}</span>

Catalog AI plugins provide conversational interfaces and intelligent insights for Spotify Backstage's Software Catalog. These plugins enable developers to ask natural language questions about any catalog entity and receive cited, evidence-backed answers grounded in live operational data.

## Available Plugins

### Catalog AI Insights

The **Catalog AI Insights** plugin provides a conversational interface for Backstage to answer operational questions about any Software Catalog entity. By asking questions like *"Who is on call?"* or *"Why did the last deployment fail?"*, developers receive real-time, cited answers.

**Key Features:**
- Deterministic intent routing via pattern matching (not model-driven)
- Entity-scoped RAG with configurable retrieval limits
- Automated data redaction for security
- Multi-turn session memory for follow-up questions
- Proactive nightly deployment health scans

[Read Catalog AI Insights documentation →](/docs/catalog-ai-insights)

## How It Works

### Deterministic Intent Classification
Unlike traditional chatbots that use LLMs for tool selection, Catalog AI Insights uses pattern matching to classify queries into fixed tool plans:

1. **Ownership & On-call**: `"Who owns this service?"`, `"Who's on call?"`
2. **Observability Links**: `"Show me the dashboard"`, `"Where are the logs?"`
3. **Deployment Health**: `"Did the last deployment fail?"`, `"What's the deployment status?"`
4. **General Context**: `"Tell me about this service"`, `"What dependencies does it have?"`

### Entity-Scoped Retrieval
When you ask about a specific catalog entity, the plugin:
1. Resolves the entity reference from the catalog
2. Retrieves only documentation and operational data scoped to that entity
3. Applies automatic redaction to strip credentials and secrets
4. Presents gathered context to the LLM for narrative synthesis

### Safety-First Architecture
- **No Autonomous Actions**: The plugin is purely read-only and diagnostic
- **Deterministic Fallbacks**: If the model fails validation, raw context is presented instead
- **Citation Requirements**: Every claim must be backed by specific evidence
- **Memory Boundaries**: Session memory is bounded and scoped to a single entity

## Use Cases

### Developer Self-Service
New team members can quickly understand services by asking:
- "What does this service do?"
- "Who owns this component?"
- "Where can I find the documentation?"
- "What are the recent deployments?"

### Operational Awareness
On-call engineers can get quick context during incidents:
- "Who's on call for this service?"
- "Show me the monitoring dashboard"
- "What was the last deployment status?"
- "Are there any active incidents?"

### Documentation Discovery
Developers can find relevant information without searching:
- "What runbooks exist for this service?"
- "Show me the API documentation"
- "What are the performance SLOs?"
- "Where are the architectural diagrams?"

## Getting Started

### Prerequisites
- Backstage catalog with populated entities
- `ai-core` plugin installed and configured
- Knowledge base or documentation source (optional)
- LLM provider configured

### Installation
```bash
# Install Catalog AI Insights
pnpm add @webstackbuilders/plugin-ai-agent-backend-catalog-ai-insights
pnpm add @webstackbuilders/plugin-ai-agent-frontend-catalog-ai-insights
```

### Configuration
```yaml
# app-config.yaml excerpt
ai:
  agents:
    catalogAiInsights:
      enabled: true
      nightlyScans:
        enabled: true
        schedule: "0 3 * * *"  # Daily at 3 AM
      maxContextItems: 10
      maxRetrievalChunks: 20
      tools:
        - catalog.entity.get
        - knowledge.retrieve
        - ownership.team.get
        - observability.dashboard.list
```

## Integration Points

### Entity Page Cards
The plugin provides entity page cards that appear automatically on catalog entity pages, offering:
- One-click canned questions
- Free-form question input
- Cited answer display with evidence
- Conversation history for the session

### Standalone Page
A dedicated `/catalog-ai-insights` page allows:
- Entity selection via search or manual input
- Full conversation history
- Evidence panel examination
- Session management

### Nightly Scans
Optional proactive scans can:
- Check deployment health across Kubernetes-annotated components
- Save findings as replayable AI Core runs
- (Future) Post summaries to configured notification channels

## Best Practices

1. **Start with High-Quality Catalog Data**: Well-annotated entities produce better insights
2. **Configure Appropriate Retrieval Limits**: Balance context richness with token usage
3. **Use Entity Filtering**: Ensure RAG searches are scoped to relevant entities
4. **Monitor Token Usage**: Track costs as usage scales
5. **Review Nightly Scan Findings**: Regularly check automated discovery results

## Future Roadmap

- **Multi-entity questions**: "Which services owned by team-payments had deployment failures?"
- **Portfolio-level insights**: Cross-entity analysis and comparison
- **Notification integration**: Slack/PagerDuty alerts for concerning findings
- **Write-capable follow-ups**: "Fix this" actions that delegate to other agents

## Next Steps

- [Catalog AI Insights documentation](/docs/catalog-ai-insights)
- [Catalog annotation guide](/docs/catalog-annotations)
- [AI Core configuration](/docs/ai-core-configuration)
- [Back to Documentation Hub](/docs)