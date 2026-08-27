import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";

export type SectionTag = "section" | "header" | "footer";
export type MarketingImageSource = StaticImageData | string;

export interface IPageSectionProps<T extends SectionTag> {
  as?: T;
  id?: string;
  classes?: string;
  shadowClass?: string;
  children: ReactNode;
}

export interface IHeroProps {
  title: string;
  description: string;
  btnGetStarted?: {
    text: string;
    link: string;
  };
}

export interface IProblemsCard {
  title: ReactNode;
  description: string;
}

export interface IProblemsProps {
  eyebrow: string;
  title: string;
  description: string;
  toolsHeading: string;
  toolsDescription: string;
  toolFailures: IProblemsCard[];
}

export interface ISolutionStep {
  title: string;
  description: string;
  image: MarketingImageSource;
}

export interface ISolutionProps {
  title: string;
  description: string;
  steps: ISolutionStep[];
}

export interface IFeatureItem {
  title: string;
  description: string;
  image: MarketingImageSource;
  link: string;
}

export interface IFeaturesProps {
  title: string;
  description: string;
  items: IFeatureItem[];
}

export interface IIntegrationItem {
  label: string;
  description: string;
}

export interface IClientsProps {
  title: string;
  description: string;
  badge: string;
  items: IIntegrationItem[];
}

export interface ICtaAction {
  text: string;
  link: string;
}

export interface ICTAHighlight {
  step: string;
  title: string;
  description: string;
}

export interface ICtaProps {
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
  primaryAction: ICtaAction;
  highlights: ICTAHighlight[];
}

export interface IHomePageFaqItem {
  question: string;
  answer: ReactNode;
}

export interface IHomePageFaqProps {
  eyebrow: string;
  title: string;
  description: string;
  items: IHomePageFaqItem[];
}

