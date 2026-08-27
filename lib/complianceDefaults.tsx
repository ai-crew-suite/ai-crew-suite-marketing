import { CompliancePageContent } from "./complianceTypes";

export const defaultCompliancePageContent: CompliancePageContent = {
  metadata: {
    title: "AI Crew Suite Security & Compliance",
    description:
      "Security practices, vulnerability management, and compliance information for the AI Crew Suite open-source project.",
  },
  hero: {
    title: "Security and compliance for open-source AI workflows",
    description:
      "AI Crew Suite is built with security-first principles, focusing on transparency, vulnerability management, and secure development practices for our agentic workflow plugins.",
    note:
      "As an open-source project, we prioritize transparency in our security practices and welcome community feedback on security improvements.",
    checklistEyebrow: "Security checklist",
    checklistItems: [
      { text: "Regular security audits and code reviews" },
      { text: "Vulnerability scanning and dependency updates" },
      { text: "Secure defaults and configuration guidance" },
      { text: "Transparent security incident reporting" },
    ],
  },
  highlightsSection: {
    eyebrow: "Core security practices",
    title: "Our approach to securing AI workflows",
    description:
      "We implement comprehensive security controls to ensure safe operation of agentic workflows while maintaining the flexibility needed for plugin-based architectures.",
    items: [
      {
        title: "Secure plugin architecture",
        description:
          "Each plugin operates with least-privilege principles, isolated execution contexts, and secure inter-plugin communication channels.",
        icon: "lockKeyhole",
      },
      {
        title: "Vulnerability management",
        description:
          "Automated scanning for dependencies, regular security updates, and a responsible disclosure program for vulnerability reporting.",
        icon: "shieldCheck",
      },
      {
        title: "Code quality & review",
        description:
          "All code undergoes peer review, automated testing, and security-focused analysis before merging into the main repository.",
        icon: "badgeCheck",
      },
      {
        title: "Incident response",
        description:
          "Clear procedures for security incident reporting, investigation, and remediation with transparent communication to the community.",
        icon: "serverCrash",
      },
    ],
  },
  frameworksSection: {
    eyebrow: "Standards & compliance",
    title: "Alignment with security standards",
    description:
      "While primarily an open-source project, we align our practices with established security frameworks and industry standards.",
    items: [
      {
        name: "OpenSSF Best Practices",
        status: "Adopted",
        detail:
          "Following Open Source Security Foundation guidelines for secure development, dependency management, and vulnerability disclosure.",
      },
      {
        name: "CII Best Practices",
        status: "Implementing",
        detail:
          "Working towards Core Infrastructure Initiative best practices badge for open-source security.",
      },
      {
        name: "OWASP Top 10",
        status: "Addressed",
        detail:
          "All plugins are designed with OWASP Top 10 application security risks in mind, including injection protection and secure authentication.",
      },
    ],
  },
  detailsSection: {
    eyebrow: "Detailed practices",
    title: "Comprehensive security implementation details",
    description:
      "Our security practices are documented transparently to help users understand and trust the AI Crew Suite platform.",
    items: [
      {
        title: "Security architecture",
        body: "AI Crew Suite uses a defense-in-depth approach with plugin isolation, secure defaults, and comprehensive logging. Each plugin operates in its own security context with controlled access to resources.",
      },
      {
        title: "Vulnerability disclosure",
        body: "We maintain a responsible disclosure program and encourage security researchers to report vulnerabilities through our GitHub security advisory system. Critical vulnerabilities receive immediate attention and public disclosure.",
      },
      {
        title: "Supply chain security",
        body: "All dependencies are regularly scanned for vulnerabilities, and we use automated tools to detect compromised packages. Build artifacts are signed and verified to prevent tampering.",
      },
      {
        title: "Access control & authentication",
        body: "Plugins implement granular permission systems and support integration with enterprise identity providers. Authentication flows follow current security best practices.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Security contact",
    title: "Have security questions or concerns?",
    description:
      "For security-related inquiries, vulnerability reports, or questions about our security practices, please reach out to our team.",
    primaryAction: {
      label: "Report a vulnerability",
      href: "https://github.com/backstage/ai-crew-suite/security/advisories",
    },
    secondaryAction: {
      label: "View privacy policy",
      href: "/privacy",
    },
  },
};