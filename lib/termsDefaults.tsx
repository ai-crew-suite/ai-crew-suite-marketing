import { TermsPageContent } from "./termsTypes";

export const defaultTermsPageContent: TermsPageContent = {
  metadata: {
    title: "AI Crew Suite Terms of Service",
    description:
      "Terms governing access to and use of AI Crew Suite open-source project and documentation.",
  },
  hero: {
    title: "Standard terms for using AI Crew Suite",
    description:
      "By accessing or using AI Crew Suite documentation, examples, or code, you agree to be bound by these Terms of Service. Please read them carefully, as they outline rights, responsibilities, and acceptable use for the open-source project.",
    effectiveDate: "Effective date: August 27, 2026",
  },
  summarySection: {
    items: [
      {
        text: "AI Crew Suite is open-source software licensed under the MIT License.",
      },
      {
        text: "You retain ownership of your content and plugins built using AI Crew Suite.",
      },
      {
        text: "We provide documentation and examples as-is, without warranties.",
      },
    ],
  },
  policySection: {
    eyebrow: "Policy details",
    title: "AI Crew Suite Terms of Service",
    description:
      "Please read these terms carefully to understand your rights and obligations when using the AI Crew Suite open-source project.",
    items: [
      {
        title: "Acceptance of terms",
        body: "By accessing or using AI Crew Suite documentation, code, or examples, you agree to these Terms of Service. The software is licensed under the MIT License, which governs your use of the code.",
      },
      {
        title: "Open-source license",
        body: "AI Crew Suite is released under the MIT License. You are free to use, modify, distribute, and sublicense the software, subject to the terms of the MIT License. The license is included with the source code.",
      },
      {
        title: "Documentation and examples",
        body: "Documentation, tutorials, and examples are provided as-is for informational purposes. While we strive for accuracy, we make no warranties regarding completeness, correctness, or suitability for your specific use case.",
      },
      {
        title: "User contributions",
        body: "Contributions to the AI Crew Suite project are welcome and governed by the project's contribution guidelines. By contributing code, documentation, or examples, you agree to license your contributions under the MIT License.",
      },
      {
        title: "Limitation of liability",
        body: "To the maximum extent permitted by law, the AI Crew Suite maintainers and contributors shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from the use of the software or documentation.",
      },
      {
        title: "Acceptable use",
        body: "You agree not to misuse AI Crew Suite for illegal activities, harassment, spam, or any purpose that violates applicable laws or third-party rights. The software is intended for legitimate Backstage plugin development and AI integration.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Questions about licensing, contributions, or terms?",
    description:
      "For questions about the MIT License, contribution process, or terms of service, please reach out through our GitHub repository or community channels.",
    primaryAction: {
      label: "View GitHub",
      href: "https://github.com/backstage/ai-crew-suite",
    },
    secondaryAction: {
      label: "View privacy policy",
      href: "/privacy",
    },
  },
};