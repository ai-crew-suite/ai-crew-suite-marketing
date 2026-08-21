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
  title: "The research desk for your newsletter",
  description:
    "Digest Engine reads thousands of blogs, peer newsletters, and social feeds. Track the people and companies that matter in your space. Rank every article against your own reference corpus. Get back a relevance-scored shortlist, summaries, and a draft outline.",
  btnGetStarted: {
    text: "Start Your First Project",
    link: "/signup",
  },
};

export const defaultCtaProps: ICtaProps = {
  eyebrow: "Start your first project",
  title: "Turn scattered feeds into a shortlist you can trust.",
  description:
    "Connect the sources you already trust, train one project on your editorial taste, and let the next issue start with ranked content, summaries, and a draft outline instead of a pile of tabs.",
  badges: [
    "Project-scoped ranking",
    "Editorial memory",
    "Draft-ready research",
  ],
  primaryAction: {
    text: "Start Your First Project",
    link: "/signup",
  },
  highlights: [
    {
      step: "01",
      title: "Rank the signal",
      description:
        "Pull your sources into one project and get a shortlist shaped by what your editorial team actually trusts.",
    },
    {
      step: "02",
      title: "Keep the context",
      description:
        "Entity summaries, source history, and authority cues stay attached so every candidate story arrives with useful framing.",
    },
    {
      step: "03",
      title: "Start from a draft",
      description:
        "Move from ranked research to a draft outline without rebuilding the same judgment call from scratch every week.",
    },
  ],
};

export const defaultProblemsProps: IProblemsProps = {
  eyebrow: "The real struggle of curation isn't finding content",
  title:
    "Spotting real news that's trustworthy, engaging, and not already flooding your subscribers' feeds.",
  description:
    "Existing curation tools solve about a third of this problem. They rank by global popularity instead of editorial fit, so they cannot reflect who you trust or what your readers expect from you.",
  toolsHeading: "Why current discovery tools break down",
  toolsDescription:
    "Existing curation tools like Feedly, UpContent, ContentStudio, and generic AI content discovery products rank by generic clicks. They do not know who you trust, they cannot tell you when three peer newsletters in your niche already covered a topic this week, and they have no concept of authority or your point of view.",
  toolFailures: [
    {
      title: <>Global popularity&nbsp;&ne;&nbsp;niche authority</>,
      description:
        "They rank content by generic clicks instead of weighting the people and publications you actually trust.",
    },
    {
      title: "The echo-chamber trap",
      description:
        "They cannot tell you when multiple peer newsletters in your niche already covered the same topic and you are about to arrive late.",
    },
    {
      title: "Blind to perspective",
      description:
        "They have no concept of authority and zero understanding of your editorial point of view.",
    },
  ],
};

export const defaultSolutionProps: ISolutionProps = {
  title: "A system designed to learn what you favor",
  description:
    "Digest Engine is a project-scoped content pipeline. You point it at the sources you already use, tell it which people and companies matter in your space, and seed it with a handful of articles that represent the kind of thing you would cover. From there, every new piece of content gets embedded, scored, deduped, summarized, and ranked, while the borderline ones are routed through an LLM briefed on your project specifically.",
  steps: [
    {
      title: "Connect your sources",
      description:
        "RSS, Reddit, Bluesky, Mastodon, LinkedIn, and inbound newsletter email via a dedicated address. Each plugin handles its own auth, rate limiting, and health checks.",
      image: solutionImage01,
    },
    {
      title: "Define your taste",
      description:
        "Flag a starter set of articles as reference content. Add tracked entities and, if you want, feed in a few peer newsletters to bootstrap authority signals.",
      image: solutionImage02,
    },
    {
      title: "Let the pipeline run",
      description:
        "Every new item is embedded into a per-project vector space, scored against your reference corpus, deduped against everything ingested so far, classified, and summarized. Ambiguous items get routed through an LLM that knows your project's brief.",
      image: solutionImage03,
    },
    {
      title: "Curate, don't research",
      description:
        "Open the review queue, skim a ranked shortlist with summaries and authority signals already attached, then give feedback on the keepers and misses so the model keeps adapting.",
      image: solutionImage04,
    },
  ],
};

export const defaultFeatureItems: IFeaturesProps = {
  title: "Why Digest Engine feels different",
  description:
    "Every project gets its own taste model, authority graph, and review flow so the system learns what your readers care about instead of guessing.",
  items: [
    {
      title: "Authority-aware ranking",
      description: "Ingest peer newsletters and score people or companies by who trusted editors actually link to, not just who shouts the loudest.",
      image: featureImage01,
      link: "/blog/authority-aware-ranking",
    },
    {
      title: "Per-project relevance training",
      description: "Thumbs up and thumbs down reshape the shortlist around your editorial judgment, with explicit feedback drifting the project centroid over time.",
      image: featureImage02,
      link: "/blog/per-project-relevance-training",
    },
    {
      title: "Unified entity profiles",
      description: "Roll a person or company's blog, social posts, releases, and mentions into a single view with one authority score and one activity stream.",
      image: featureImage03,
      link: "/blog/unified-entity-profiles",
    },
    {
      title: "Competitive intelligence built in",
      description: "Because Digest Engine ingests peer newsletters as a first-class source, you can see which topics editors in your niche already covered this week and which ones are still open for you to own.",
      image: featureImage04,
      link: "/blog/competitive-intelligence-built-in",
    },
    {
      title: "Trend velocity, not trend volume",
      description: "Spot topics accelerating across the last few days before they become saturated. Trend detection focuses on momentum, not just mention count.",
      image: featureImage05,
      link: "/blog/trend-velocity-not-trend-volume",
    },
    {
      title: "Composable AI skills",
      description: "Classification, summaries, dedupe, entity extraction, and more run as modular skills you can use in the pipeline, in the UI, or in your own workflows.",
      image: featureImage06,
      link: "/blog/composable-ai-skills",
    },
    {
      title: "Human review by default",
      description: "Low-confidence entities, failed skills, and ambiguous scores land in a review queue instead of silently becoming bad data.",
      image: featureImage07,
      link: "/blog/human-review-by-default",
    },
    {
      title: "Draft assembly, not just curation",
      description: "Once you lock in your shortlist, Digest Engine builds a themed draft outline with summaries in your voice so you can skip the blank page and get straight to writing.",
      image: featureImage08,
      link: "/blog/draft-assembly-not-just-curation",
    },
    {
      title: "Self-hostable, bring your own models",
      description: "Run skills through OpenRouter in development or swap to Ollama in production. The model is a configuration choice, not a platform lock-in.",
      image: featureImage09,
      link: "/blog/self-hostable-bring-your-own-models",
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
      question: "How is this different from Feedly / UpContent / ContentStudio?",
      answer: (
        <>
          <p>Three things they don&apos;t do:</p>
          <ol className="mt-3 list-decimal space-y-3 pl-5">
            <li>
              <strong>Authority scoring from peer newsletters.</strong> We ingest other newsletters as a first-class source and build a trust graph from who real editors link to.
            </li>
            <li>
              <strong>Per-project taste training via explicit feedback.</strong> Your thumbs-up/thumbs-down drifts a per-project reference centroid. Your shortlist genuinely changes over time. Theirs doesn&apos;t.
            </li>
            <li>
              <strong>A unified entity model.</strong> One person, all their channels, one profile, one authority score.
            </li>
          </ol>
          <p className="mt-3">
            We also retain content indefinitely for long-term trend analysis, where most tools time out after a week.
          </p>
        </>
      ),
    },
    {
      question: "I don't run a newsletter. I just want to curate a Slack channel / internal digest / research feed. Does this work?",
      answer:
        "Yes. A \"newsletter project\" is just a project-scoped curation pipeline. The draft assembly step is optional. You can use Digest Engine as a pure ranked-shortlist tool and ignore the email side entirely.",
    },
    {
      question: "How does this handle paywalled or private content?",
      answer:
        "Source plugins handle their own auth, including authenticated RSS, OAuth flows (Bluesky, LinkedIn, Mastodon), and email-based ingestion (newsletters). Anything you can read, the system can read on your behalf. Anything you can't, it can't.",
    },
    {
      question: "How do I add a new source?",
      answer: (
        <>
          <p>
            Implement three methods on the source plugin interface: <code>fetch_new_content</code>, <code>get_entity_profile</code>, <code>health_check</code>.
          </p>
          <p className="mt-3">
            The core system handles scheduling, retry, error routing, and Qdrant writes. Adding a source is bounded work, not a refactor.
          </p>
        </>
      ),
    },
    {
      question: "Does my content get sent to OpenAI / Anthropic / etc.?",
      answer:
        "Only if you configure it to. The default development setup uses OpenRouter. The default production-recommended setup uses Ollama on your own infrastructure. No data flows to a third party unless you point a skill at a third-party model.",
    },
    {
      question: "Is this just ChatGPT wrapped in a UI?",
      answer: (
        <>
          <p>
            No. The core curation logic is deterministic vector similarity against your project&apos;s reference corpus. LLMs are only used to break ties in an explicit confidence band, to summarize, to extract entities, and to detect themes, each as a swappable, model-agnostic skill.
          </p>
          <p className="mt-3">
            If every LLM API went dark tomorrow, you&apos;d still get ranked shortlists.
          </p>
        </>
      ),
    },
    {
      question: "Can I self-host?",
      answer:
        "Yes. Docker Compose for the MVP path, Kubernetes-ready (Helm + ArgoCD) for scale. The license is AGPLv3.",
    },
  ],
};