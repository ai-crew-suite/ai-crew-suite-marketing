---
layout: default
title: Getting Started with AI Crew Suite
parent: Overview
subcategory: Introduction
---

# Getting Started with AI Crew Suite

{: .no_toc }

<span class="label label-blue">{{ page.subcategory }}</span>

Welcome to AI Crew Suite, an open-source monorepo of eighteen agentic workflow plugins for Spotify's Backstage IDP. This guide will help you get started with installing, configuring, and using our plugins to automate your development workflows.

## What is AI Crew Suite?

AI Crew Suite is a collection of deterministic AI agents designed to work within Backstage, Spotify's internal developer portal. Each plugin provides specific workflow automation capabilities while maintaining strict production safety through:

- **Deterministic pipelines** that use LLMs only for narrative synthesis, not decision-making
- **Read-only tool allow-lists** that prevent autonomous mutations
- **Citation-backed outputs** that trace claims back to specific evidence
- **Human approval gates** for any proposed infrastructure changes

## Quick Start

### Prerequisites

1. A running Backstage instance (v1.18.0 or later)
2. The `ai-core` plugin installed and configured
3. Access to an LLM provider (OpenAI, OpenRouter, or self-hosted)

### Installation Steps

1. **Add plugin packages** to your Backstage instance:

   ```bash
   # Example: Install Alert Fatigue Tuner
   pnpm add @webstackbuilders/plugin-ai-agent-backend-alert-ai-tuner
   pnpm add @webstackbuilders/plugin-ai-agent-frontend-alert-ai-tuner
   ```

2. **Configure the backend module** in your `packages/backend/src/plugins/ai.ts`:

   ```typescript
   import { createAlertAiTunerModule } from '@webstackbuilders/plugin-ai-agent-backend-alert-ai-tuner';
   
   export const aiModules = [
     createAlertAiTunerModule(),
     // ... other AI modules
   ];
   ```

3. **Add the frontend plugin** to your `packages/app/src/App.tsx`:

   ```typescript
   import { AlertAiTunerPage } from '@webstackbuilders/plugin-ai-agent-frontend-alert-ai-tuner';
   
   const routes = (
     <FlatRoutes>
       <Route path="/alert-ai-tuner" element={<AlertAiTunerPage />} />
     </FlatRoutes>
   );
   ```

4. **Configure agent permissions** in your `app-config.yaml`:

   ```yaml
   ai:
     agents:
       alertAiTuner:
         enabled: true
         tools:
           - kubernetes.workload.get_timeline
           - vcs.repository.read
   ```

## Choosing Your First Plugin

Based on your team's needs:

- **For SRE/Operations teams**: Start with [Alert Fatigue Tuner](/docs/alert-ai-tuner) or [Kubernetes AI Responder](/docs/kubernetes-ai-responder)
- **For platform engineers**: Begin with [Catalog AI Insights](/docs/catalog-ai-insights)
- **For development teams**: Explore our scaffolder AI guardrail plugins (coming soon)

## Next Steps

1. Explore the [plugin documentation](/docs) for detailed configuration options
2. Check out our [example configurations](https://github.com/webstackbuilders/ai-crew-suite/tree/main/examples)
3. Join our [community Discord](https://discord.gg/ai-crew-suite) for support and discussions
4. Contribute to the project on [GitHub](https://github.com/webstackbuilders/ai-crew-suite)

## Need Help?

- **Documentation**: Browse our complete docs at [/docs](/docs)
- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/webstackbuilders/ai-crew-suite/issues)
- **Community**: Ask questions in our [Discord community](https://discord.gg/ai-crew-suite)