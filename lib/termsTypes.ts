export type TermsPageContent = {
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
    items: Array<{
      text: string;
    }>;
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
      label: string;
      href: string;
    };
    secondaryAction: {
      label: string;
      href: string;
    };
  };
};