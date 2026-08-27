import featureImage01 from "@/assets/images/feature-01.jpg";
import featureImage02 from "@/assets/images/feature-02.jpg";
import featureImage03 from "@/assets/images/feature-03.jpg";
import featureImage04 from "@/assets/images/feature-04.jpg";
import featureImage05 from "@/assets/images/feature-05.jpg";
import featureImage06 from "@/assets/images/feature-06.jpg";
import featureImage07 from "@/assets/images/feature-07.jpg";
import featureImage08 from "@/assets/images/feature-08.jpg";
import featureImage09 from "@/assets/images/feature-09.jpg";
import solutionImage01 from "@/assets/images/solutions-01.jpg";
import solutionImage02 from "@/assets/images/solutions-02.jpg";
import solutionImage03 from "@/assets/images/solutions-03.jpg";
import solutionImage04 from "@/assets/images/solutions-04.jpg";

import {
  ICtaProps,
  IFeaturesProps,
  IHomePageFaqProps,
  IHeroProps,
  IProblemsProps,
  ISolutionProps,
} from "./types";

export const defaultHeroProps: IHeroProps = {
  title: "AI Crew Suite: Eighteen agentic workflow plugins for Spotify's Backstage IDP",
  description:
    "Supercharge your Backstage developer portal with AI-powered workflows. Automate software delivery, infrastructure management, and developer onboarding with intelligent agents.",
  btnGetStarted: {
    text: "Start Your First Project",
    link: "/signup",
  },
};

export const defaultCtaProps: ICtaProps = {
  eyebrow: "Start your first workflow",
  title: "Turn scattered systems into automated workflows you can trust.",
  description:
    "Connect the plugins you already use, train one project on your team's workflow preferences, and let the next deployment start with ranked tasks, summaries, and a draft pipeline instead of a pile of scripts.",
  badges: [
    "Plugin-scoped automation",
    "Agent memory",
    "Workflow-ready orchestration",
  ],
  primaryAction: {
    text: "Start Your First Project",
    link: "/signup",
  },
  highlights: [
    {
      step: "01",
      title: "Install plugins",
      description:
        "Pull your Backstage plugins into one project and get a workflow shaped by what your development team actually uses.",
    },
    {
      step: "02",
      title: "Design workflows",
      description:
        "Entity summaries, plugin history, and dependency cues stay attached so every candidate workflow arrives with useful framing.",
    },
    {
      step: "03",
      title: "Orchestrate agents",
      description:
        "Move from manual steps to an automated pipeline without rebuilding the same integration from scratch every time.",
    },
  ],
};

export const defaultProblemsProps: IProblemsProps = {
  eyebrow: "The real struggle of developer productivity isn't adding more tools",
  title:
    "Orchestrating complex workflows across multiple systems without creating chaos.",
  description:
    "Existing workflow tools solve about a third of this problem. They rely on manual triggers and static templates, lacking adaptive intelligence and context-awareness.",
  toolsHeading: "Why current workflow tools break down",
  toolsDescription:
    "Existing automation tools like Zapier, Jenkins, and generic RPA products rely on predefined rules. They do not understand your team's preferences, they cannot tell you when three services in your stack already handle a similar task, and they have no concept of dependencies or your architectural standards.",
  toolFailures: [
    {
      title: <>Generic automation&nbsp;vs&nbsp;domain-specific workflows</>,
      description:
        "They automate tasks by generic rules instead of weighting the plugins and services your team actually trusts.",
    },
    {
      title: "Integration silos",
      description:
        "They cannot tell you when multiple plugins in your ecosystem already cover the same functionality and you are about to create redundancy.",
    },
    {
      title: "Lack of context awareness",
      description:
        "They have no concept of dependencies and zero understanding of your team's workflow preferences.",
    },
  ],
};

export const defaultSolutionProps: ISolutionProps = {
  title: "A plugin suite designed to adapt to your workflow",
  description:
    "AI Crew Suite is a project-scoped workflow automation pipeline. You point it at the plugins you already use, tell it which services and teams matter in your stack, and seed it with a handful of workflows that represent the kind of automation you need. From there, every new task gets embedded, scored, deduped, summarized, and ranked, while the borderline ones are routed through an agent briefed on your project specifically.",
  steps: [
    {
      title: "Install plugins",
      description:
        "Backstage plugins for CI/CD, infrastructure, security, compliance, and more. Each plugin handles its own auth, rate limiting, and health checks.",
      image: solutionImage01,
    },
    {
      title: "Define your workflow",
      description:
        "Flag a starter set of workflows as reference automation. Add tracked entities and, if you want, feed in a few existing pipelines to bootstrap dependency signals.",
      image: solutionImage02,
    },
    {
      title: "Let the agents orchestrate",
      description:
        "Every new task is embedded into a per-project vector space, scored against your reference corpus, deduped against everything ingested so far, classified, and summarized. Ambiguous tasks get routed through an LLM that knows your project's brief.",
      image: solutionImage03,
    },
    {
      title: "Monitor, don't micromanage",
      description:
        "Open the dashboard, view a ranked shortlist of automated workflows with summaries and dependency signals already attached, then give feedback on the successes and failures so the model keeps adapting.",
      image: solutionImage04,
    },
  ],
};

export const defaultFeatureItems: IFeaturesProps = {
  title: "Why AI Crew Suite feels different",
  description:
    "Every project gets its own workflow model, dependency graph, and automation flow so the system learns what your team needs instead of guessing.",
  items: [
    {
      title: "Infrastructure Provisioning Agent",
      description: "Automatically provision cloud resources based on policy and demand, with approval workflows and cost controls.",
      image: featureImage01,
      link: "/docs/infrastructure-provisioning-agent",
    },
    {
      title: "CI/CD Automation",
      description: "Orchestrate CI/CD pipelines with intelligent branch management, test selection, and deployment gating.",
      image: featureImage02,
      link: "/docs/ci-cd-automation",
    },
    {
      title: "Security Compliance Checker",
      description: "Continuously scan your infrastructure and code for compliance violations, with automated remediation suggestions.",
      image: featureImage03,
      link: "/docs/security-compliance-checker",
    },
    {
      title: "Incident Response Bot",
      description: "Detect incidents, automatically gather context, and coordinate response actions across teams and tools.",
      image: featureImage04,
      link: "/docs/incident-response-bot",
    },
    {
      title: "Documentation Generator",
      description: "Keep documentation up-to-date by automatically generating and updating docs based on code changes and system state.",
      image: featureImage05,
      link: "/docs/documentation-generator",
    },
    {
      title: "Cost Optimizer",
      description: "Identify unused resources, suggest resizing opportunities, and enforce budget policies across your cloud accounts.",
      image: featureImage06,
      link: "/docs/cost-optimizer",
    },
    {
      title: "Service Catalog Enricher",
      description: "Automatically enrich Backstage service catalog entries with ownership, dependencies, metrics, and compliance status.",
      image: featureImage07,
      link: "/docs/service-catalog-enricher",
    },
    {
      title: "Developer Onboarding Assistant",
      description: "Guide new developers through setup, training, and first contributions with personalized checklists and automated help.",
      image: featureImage08,
      link: "/docs/developer-onboarding-assistant",
    },
    {
      title: "License Compliance Scanner",
      description: "Scan dependencies for license compliance, track obligations, and automate approval workflows for third-party code.",
      image: featureImage09,
      link: "/docs/license-compliance-scanner",
    },
  ],
};

export const defaultHomePageFaqProps: IHomePageFaqProps = {
  eyebrow: "FAQ",
  title: "Questions teams ask before they trust this with their workflow",
  description:
    "Straight answers about models, hosting, hallucinations, plugins, and what the system is actually doing under the hood.",
  items: [
    {
      question: "How is this different from Zapier / Jenkins / generic RPA?",
      answer: (
        <>
          <p>Three things they don&apos;t do:</p>
          <ol className="mt-3 list-decimal space-y-3 pl-5">
            <li>
              <strong>Plugin-scoped workflow training.</strong> We ingest your existing Backstage plugins as a first-class source and build a dependency graph from what your team actually uses.
            </li>
            <li>
              <strong>Per-project automation tuning via explicit feedback.</strong> Your thumbs-up/thumbs-down drifts a per-project reference centroid. Your automated workflows genuinely improve over time. Theirs don&apos;t.
            </li>
            <li>
              <strong>A unified service model.</strong> One service, all its dependencies, one profile, one compliance score.
            </li>
          </ol>
          <p className="mt-3">
            We also retain workflow history indefinitely for long-term trend analysis, where most tools time out after a week.
          </p>
        </>
      ),
    },
    {
      question: "I don't use Backstage. I just want to orchestrate internal workflows / CI/CD / compliance checks. Does this work?",
      answer:
        "Yes. A \"Backstage project\" is just a project-scoped automation pipeline. The UI assembly step is optional. You can use AI Crew Suite as a pure workflow‑orchestration tool and ignore the Backstage side entirely.",
    },
    {
      question: "How does this handle private APIs or internal systems?",
      answer:
        "Plugin connectors handle their own auth, including service accounts, OAuth flows, and custom authentication headers. Anything your team can access, the system can access on your behalf. Anything you can't, it can't.",
    },
    {
      question: "How do I add a new plugin?",
      answer: (
        <>
          <p>
            Implement three methods on the plugin interface: <code>execute_workflow</code>, <code>get_service_status</code>, <code>health_check</code>.
          </p>
          <p className="mt-3">
            The core system handles scheduling, retry, error routing, and state writes. Adding a plugin is bounded work, not a refactor.
          </p>
        </>
      ),
    },
    {
      question: "Does my data get sent to OpenAI / Anthropic / etc.?",
      answer:
        "Only if you configure it to. The default development setup uses OpenRouter. The default production‑recommended setup uses Ollama on your own infrastructure. No data flows to a third party unless you point a skill at a third‑party model.",
    },
    {
      question: "Is this just ChatGPT wrapped in a UI?",
      answer: (
        <>
          <p>
            No. The core orchestration logic is deterministic state machines against your project's reference corpus. LLMs are only used to break ties in an explicit confidence band, to summarize, to extract entities, and to detect anomalies, each as a swappable, model‑agnostic skill.
          </p>
          <p className="mt-3">
            If every LLM API went dark tomorrow, you'd still get automated workflows.
          </p>
        </>
      ),
    },
    {
      question: "Can I self‑host?",
      answer:
        "Yes. Docker Compose for the MVP path, Kubernetes‑ready (Helm + ArgoCD) for scale. The license is AGPLv3.",
    },
  ],
};