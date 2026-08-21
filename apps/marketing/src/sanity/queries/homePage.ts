import { createElement, Fragment, type ReactNode } from "react";
import { createClient, groq } from "next-sanity";

import {
  defaultCtaProps,
  defaultFeatureItems,
  defaultHeroProps,
  defaultHomePageFaqProps,
  defaultProblemsProps,
  defaultSolutionProps,
} from "@/lib/homePageDefaults";
import type {
  ICtaProps,
  IFeaturesProps,
  IHomePageFaqProps,
  IHeroProps,
  IProblemsProps,
  ISolutionProps,
} from "@/lib/types";
import { buildSanityImageUrl, type SanityImageObject } from "@/sanity/image";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});

interface PortableTextSpan {
  _key?: string;
  _type: "span";
  marks?: string[];
  text: string;
}

interface PortableTextBlock {
  _key?: string;
  _type: "block";
  children: PortableTextSpan[];
  level?: number;
  listItem?: "bullet" | "number";
}

interface HomePageContent {
  hero: IHeroProps;
  problems: IProblemsProps;
  solution: ISolutionProps;
  features: IFeaturesProps;
  faq: IHomePageFaqProps;
  cta: ICtaProps;
}

interface RawAction {
  link: string;
  text: string;
}

interface RawHero {
  btnGetStarted?: RawAction;
  description: string;
  title: string;
}

interface RawProblems {
  description: string;
  eyebrow: string;
  title: string;
  toolFailures: Array<{
    description: string;
    title: string;
  }>;
  toolsDescription: string;
  toolsHeading: string;
}

interface RawSolution {
  description: string;
  steps: Array<{
    description: string;
    image: SanityImageObject | null;
    title: string;
  }>;
  title: string;
}

interface RawFeatures {
  description: string;
  items: Array<{
    description: string;
    image: SanityImageObject | null;
    link: string;
    title: string;
  }>;
  title: string;
}

interface RawFaq {
  description: string;
  eyebrow: string;
  items: Array<{
    answer: PortableTextBlock[];
    question: string;
  }>;
  title: string;
}

interface RawCta {
  badges: string[];
  description: string;
  eyebrow: string;
  highlights: Array<{
    description: string;
    step: string;
    title: string;
  }>;
  primaryAction: RawAction;
  title: string;
}

interface RawHomePageContent {
  cta: RawCta;
  faq: RawFaq;
  features: RawFeatures;
  hero: RawHero;
  problems: RawProblems;
  solution: RawSolution;
}

export const defaultHomePageContent: HomePageContent = {
  hero: defaultHeroProps,
  problems: defaultProblemsProps,
  solution: defaultSolutionProps,
  features: defaultFeatureItems,
  faq: defaultHomePageFaqProps,
  cta: defaultCtaProps,
};

const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    hero,
    problems,
    solution,
    features,
    faq,
    cta
  }
`;

function renderSpan(span: PortableTextSpan, index: number): ReactNode {
  let node: ReactNode = span.text;

  for (const mark of span.marks ?? []) {
    if (mark === "strong") {
      node = createElement("strong", { key: `${span._key ?? index}-strong` }, node);
    }

    if (mark === "code") {
      node = createElement("code", { key: `${span._key ?? index}-code` }, node);
    }
  }

  return createElement(Fragment, { key: span._key ?? `span-${index}` }, node);
}

function renderInlineChildren(children: PortableTextSpan[]): ReactNode[] {
  return children.map((child, index) => renderSpan(child, index));
}

function renderPortableText(blocks: PortableTextBlock[]): ReactNode[] {
  const rendered: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.listItem) {
      const listTag = block.listItem === "number" ? "ol" : "ul";
      const listItems: PortableTextBlock[] = [block];

      while (
        index + 1 < blocks.length &&
        blocks[index + 1].listItem === block.listItem
      ) {
        index += 1;
        listItems.push(blocks[index]);
      }

      rendered.push(
        createElement(
          listTag,
          { key: block._key ?? `list-${index}` },
          listItems.map((item, listIndex) =>
            createElement(
              "li",
              { key: item._key ?? `list-item-${listIndex}` },
              renderInlineChildren(item.children),
            ),
          ),
        ),
      );

      continue;
    }

    rendered.push(
      createElement(
        "p",
        { key: block._key ?? `paragraph-${index}` },
        renderInlineChildren(block.children),
      ),
    );
  }

  return rendered;
}

function mapHomePageContent(content: RawHomePageContent): HomePageContent {
  return {
    hero: content.hero,
    problems: content.problems,
    solution: {
      ...content.solution,
      steps: content.solution.steps.map((step, index) => ({
        ...step,
        image:
          buildSanityImageUrl(step.image, {
            fit: "crop",
            height: 180,
            width: 180,
          }) ?? defaultHomePageContent.solution.steps[index]?.image,
      })),
    },
    features: {
      ...content.features,
      items: content.features.items.map((item, index) => ({
        ...item,
        image:
          buildSanityImageUrl(item.image, {
            fit: "crop",
            height: 180,
            width: 180,
          }) ?? defaultHomePageContent.features.items[index]?.image,
      })),
    },
    faq: {
      ...content.faq,
      items: content.faq.items.map((item) => ({
        ...item,
        answer: renderPortableText(item.answer),
      })),
    },
    cta: content.cta,
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const content = await client.fetch<RawHomePageContent | null>(homePageQuery);

    return content ? mapHomePageContent(content) : defaultHomePageContent;
  } catch {
    return defaultHomePageContent;
  }
}