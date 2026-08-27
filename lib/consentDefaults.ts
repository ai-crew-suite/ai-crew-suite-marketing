export type ConsentComponentContent = {
  badge: string;
  title: string;
  description: string;
  policyLink: {
    href: string;
    label: string;
  };
  essentialOnlyButtonText: string;
  acceptAllButtonText: string;
};

export const defaultConsentComponentContent: ConsentComponentContent = {
  badge: "Privacy",
  title: "AI Crew Suite uses cookies to improve your experience",
  description:
    "We use essential cookies to keep the site secure and functional, and analytics cookies to understand how you use AI Crew Suite. You can choose to accept all cookies or only essential ones.",
  policyLink: {
    href: "/privacy",
    label: "Privacy policy",
  },
  essentialOnlyButtonText: "Essential only",
  acceptAllButtonText: "Accept all cookies",
};

export async function getConsentComponentContent(): Promise<ConsentComponentContent> {
  return defaultConsentComponentContent;
}