import { CookiesPageContent } from "./cookiesTypes";

export const defaultCookiesPageContent: CookiesPageContent = {
  metadata: {
    title: "AI Crew Suite Cookie Policy",
    description:
      "How AI Crew Suite uses cookies and similar technologies on the marketing site and open-source project.",
  },
  hero: {
    title: "How AI Crew Suite uses cookies and similar technologies",
    description:
      "This policy outlines how AI Crew Suite uses cookies and similar technologies for security, functionality, and analytics on our marketing site. As an open-source project, we prioritize transparency in how we handle user data.",
    effectiveDate: "Effective date: August 27, 2026",
  },
  summarySection: {
    items: [
      {
        text: "Essential cookies ensure site security and basic functionality.",
      },
      {
        text: "Analytics cookies help us understand how visitors use our site.",
      },
      {
        text: "Preference cookies remember your consent choices and settings.",
      },
    ],
  },
  policySection: {
    eyebrow: "Policy details",
    title: "AI Crew Suite Cookie Policy",
    description:
      "Please read this policy to learn more about the tools we use and your choices regarding them.",
    items: [
      {
        title: "How we use cookies",
        body: "The AI Crew Suite marketing site uses cookies and similar technologies to maintain site security, remember consent preferences, and understand how visitors interact with our content. As an open-source project focused on Backstage plugins, we keep cookie usage minimal and focused on essential functions.",
      },
      {
        title: "Types of cookies we use",
        body: "We use strictly necessary cookies for site security and functionality, analytics cookies to understand site usage patterns (using privacy-first tools), and preference cookies to remember your consent choices. We do not use cookies for advertising or cross-site tracking.",
      },
      {
        title: "Managing cookie choices",
        body: "You can manage cookies through browser settings, device controls, or using our site consent tool. Most browsers allow you to block or delete cookies, though blocking essential cookies may limit some site functionality. Our consent tool lets you control analytics and preference cookies.",
      },
      {
        title: "Third-party services",
        body: "We use minimal third-party services that may set their own cookies: Cloudflare for security and performance, and privacy-focused analytics tools. These services are bound by their own privacy policies and may use cookies for security and analytics purposes.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Questions about cookies, consent, or data handling?",
    description:
      "For questions about our cookie policy, consent management, or data handling practices, please reach out through our GitHub repository or contact channels.",
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