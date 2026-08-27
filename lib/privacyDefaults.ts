export type PrivacyPageContent = {
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
    items: Array<{ text: string }>;
  };
  policySection: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: {
      href: string;
      label: string;
    };
    secondaryAction: {
      href: string;
      label: string;
    };
  };
};

export const defaultPrivacyPageContent: PrivacyPageContent = {
  metadata: {
    title: "Privacy Policy | AI Crew Suite",
    description: "Learn how AI Crew Suite collects, uses, and protects your personal information.",
  },
  hero: {
    title: "Privacy Policy",
    description: "Your privacy is important to us. This policy explains how AI Crew Suite collects, uses, and protects your information when you use our services.",
    effectiveDate: "Effective August 27, 2026",
  },
  summarySection: {
    items: [
      { text: "We collect only the information necessary to provide and improve our services." },
      { text: "Your data is never sold to third parties." },
      { text: "You have full control over your data and can delete it at any time." },
    ],
  },
  policySection: {
    eyebrow: "Policy details",
    title: "How we handle your data",
    description: "This section provides a detailed breakdown of our data practices.",
    items: [
      {
        title: "Information we collect",
        body: "We collect information you provide directly, such as your name, email address, and company details when you sign up for an account. We also automatically collect certain technical data, including your IP address, browser type, and usage patterns.",
      },
      {
        title: "How we use your information",
        body: "We use your information to provide, maintain, and improve our services; to communicate with you about updates, security alerts, and support; and to develop new features and products.",
      },
      {
        title: "Information sharing",
        body: "We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our platform, subject to strict confidentiality obligations.",
      },
      {
        title: "Data security",
        body: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        title: "Your rights",
        body: "You have the right to access, correct, or delete your personal data. You can also object to or restrict certain processing activities.",
      },
      {
        title: "Changes to this policy",
        body: "We may update this policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the effective date.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Questions?",
    title: "Contact us about privacy",
    description: "If you have any questions or concerns about our privacy practices, please reach out.",
    primaryAction: {
      href: "mailto:privacy@aicrewsuite.com",
      label: "Email our privacy team",
    },
    secondaryAction: {
      href: "/signup",
      label: "Create an account",
    },
  },
};

export async function getPrivacyPageContent(): Promise<PrivacyPageContent> {
  return defaultPrivacyPageContent;
}