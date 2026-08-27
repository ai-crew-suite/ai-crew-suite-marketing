export type ComplianceHighlightItem = {
  title: string;
  description: string;
  icon: "badgeCheck" | "lockKeyhole" | "serverCrash" | "shieldCheck";
};

export type ComplianceChecklistItem = {
  text: string;
};

export type ComplianceFrameworkItem = {
  name: string;
  status: string;
  detail: string;
};

export type ComplianceDetailItem = {
  title: string;
  body: string;
};

export type CompliancePageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    note: string;
    checklistEyebrow: string;
    checklistItems: ComplianceChecklistItem[];
  };
  highlightsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceHighlightItem[];
  };
  frameworksSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceFrameworkItem[];
  };
  detailsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceDetailItem[];
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