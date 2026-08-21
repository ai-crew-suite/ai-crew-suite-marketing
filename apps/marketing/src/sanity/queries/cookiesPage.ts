import { createClient, groq } from "next-sanity";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});

export interface CookiesSectionAction {
  label: string;
  href: string;
}

export interface CookiesSummaryItem {
  text: string;
}

export interface CookiesPolicyItem {
  title: string;
  body: string;
}

export interface CookiesPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    effectiveDate: string;
  };
  summarySection: {
    items: CookiesSummaryItem[];
  };
  policySection: {
    eyebrow: string;
    title: string;
    description: string;
    items: CookiesPolicyItem[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: CookiesSectionAction;
    secondaryAction: CookiesSectionAction;
  };
}

export const defaultCookiesPageContent: CookiesPageContent = {
  metadata: {
    title: "Digest Engine Cookie Policy",
    description:
      "How Digest Engine uses cookies and similar technologies on the marketing site and service.",
  },
  hero: {
    title: "How Digest Engine uses cookies and similar technologies",
    description:
      "This policy outlines how Digest Engine uses cookies and similar technologies for security, functionality, analytics, and marketing. Please read it to understand how we set and manage these tools.",
    effectiveDate: "Effective date: May 16, 2026",
  },
  summarySection: {
    items: [
      {
        text: "Necessary cookies help the service stay secure and usable.",
      },
      {
        text: "Optional analytics and marketing cookies should follow local consent rules.",
      },
      {
        text: "Users can typically manage cookie settings through browsers or consent tools.",
      },
    ],
  },
  policySection: {
    eyebrow: "Policy details",
    title: "Digest Engine Cookie Policy",
    description:
      "Please read this policy to learn more about the tools we use and your choices regarding them.",
    items: [
      {
        title: "What cookies are",
        body: "Cookies are small text files stored on a browser or device when someone visits a website or uses an online service. Similar technologies can include pixels, local storage, tags, SDKs, and identifiers that help recognize a browser, remember settings, measure usage, or support product functionality.",
      },
      {
        title: "How we use cookies",
        body: "A SaaS product like Digest Engine may use cookies and similar technologies to keep users signed in, remember preferences, maintain security, understand product usage, measure site performance, and support onboarding, support, and marketing operations.",
      },
      {
        title: "Strictly necessary cookies",
        body: "These cookies are used to operate core site and product functions such as authentication, session continuity, security protections, load balancing, fraud prevention, and saving basic preferences. Because these cookies are required for the service to function, they are typically not subject to the same consent choices as optional cookies in some jurisdictions.",
      },
      {
        title: "Analytics cookies",
        body: "Analytics cookies help measure traffic, understand how visitors use pages and product flows, and identify areas that need improvement. They may collect information such as page views, navigation patterns, approximate geography, device attributes, and referral sources. Where required by law, these cookies should be enabled only after appropriate consent is obtained.",
      },
      {
        title: "Functional cookies",
        body: "Functional cookies remember choices such as language, theme, form progress, feature preferences, and other convenience settings so users do not have to re-enter them every time they return. These cookies improve usability but are not always strictly necessary to operate the service.",
      },
      {
        title: "Advertising and third-party cookies",
        body: "If the marketing site uses embedded content, campaign attribution, or advertising measurement tools, third parties may place cookies or receive information from them according to their own policies. These tools can help measure campaigns or personalize outreach, but they should be reviewed carefully and managed through consent controls where legally required.",
      },
      {
        title: "Managing cookie choices",
        body: "Users can usually manage cookies through browser settings, device controls, or site-level consent tools. Blocking some cookies may affect how parts of the site or product function. In jurisdictions that require consent for optional cookies, users should be able to accept, reject, or later update those preferences.",
      },
      {
        title: "Do Not Track and similar signals",
        body: "Some browsers provide privacy preference signals such as Do Not Track or other browser-based controls. Whether and how those signals are honored depends on the applicable law, technical implementation, and the specific tools in use. If your organization has stricter requirements, the service configuration should be reviewed accordingly.",
      },
      {
        title: "Changes to this policy",
        body: "We may update this Cookie Policy from time to time to reflect changes in technology, law, or product operations. When we do, we will post the updated version here and revise the effective date. Material changes may also be communicated through the site, product, or another reasonable notice channel.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Questions about consent, tracking, or cookie settings?",
    description:
      "Contact the Digest Engine team through the signup page or your existing customer channel if you need more detail about cookies, consent handling, or third-party tools used with the service.",
    primaryAction: {
      label: "View privacy policy",
      href: "/privacy",
    },
    secondaryAction: {
      label: "View terms",
      href: "/terms",
    },
  },
};

const cookiesPageQuery = groq`
  *[_type == "cookiesPage" && _id == "cookiesPage"][0] {
    metadata,
    hero,
    summarySection,
    policySection,
    contactSection
  }
`;

export async function getCookiesPageContent(): Promise<CookiesPageContent> {
  try {
    const content = await client.fetch<CookiesPageContent | null>(cookiesPageQuery);

    return content ?? defaultCookiesPageContent;
  } catch {
    return defaultCookiesPageContent;
  }
}