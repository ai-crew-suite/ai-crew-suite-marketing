import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  defaultCtaProps,
  defaultFeatureItems,
  defaultHeroProps,
  defaultHomePageFaqProps,
  defaultProblemsProps,
  defaultSolutionProps,
} from "@/lib/homePageDefaults";
import { defaultPricingComponentContent } from "@/sanity/queries/pricingComponent";

vi.mock("@/sanity/queries/homePage", () => ({
  getHomePageContent: vi.fn(),
}));

vi.mock("@/sanity/queries/pricingComponent", () => ({
  defaultPricingComponentContent: {
    title: "Pick the operating model that fits your stack",
    description:
      "Start open source, move to a hosted workflow later, or keep the whole pipeline in your own infrastructure from day one.",
    annualDiscount: 20,
    plans: [
      {
        name: "Hosted",
        monthlyPrice: 399,
        description: "Managed plan.",
        features: ["Managed upgrades", "Email support"],
        link: "/signup",
        buttonLabel: "Join waitlist",
        buttonVariant: "default",
        isPopular: true,
      },
    ],
  },
  getPricingComponentContent: vi.fn(),
}));

import { getHomePageContent } from "@/sanity/queries/homePage";
import { getPricingComponentContent } from "@/sanity/queries/pricingComponent";

import Home from "./page";

describe("Marketing home page", () => {
  beforeEach(() => {
    vi.mocked(getHomePageContent).mockResolvedValue({
      hero: defaultHeroProps,
      problems: defaultProblemsProps,
      solution: defaultSolutionProps,
      features: defaultFeatureItems,
      faq: defaultHomePageFaqProps,
      cta: defaultCtaProps,
    });
    vi.mocked(getPricingComponentContent).mockResolvedValue(defaultPricingComponentContent);
  });

  it("renders the Digest Engine landing page sections in the expected order", async () => {
    const markup = renderToStaticMarkup(await Home());
    const featuresIndex = markup.indexOf('id="features"');
    //const clientsIndex = markup.indexOf('id="clients"');
    const pricingIndex = markup.indexOf('id="pricing"');
    const faqIndex = markup.indexOf('id="faq"');
    const ctaIndex = markup.indexOf('id="cta"');

    expect(markup).toContain("pt-24");
    expect(markup).toContain(defaultHeroProps.title);
    expect(markup).toContain(defaultFeatureItems.title);
    expect(markup).toContain(defaultPricingComponentContent.title);
    expect(markup).toContain(defaultHomePageFaqProps.title);
    expect(markup).toContain('aria-label="Homepage call to action"');
    //expect(clientsIndex).toBeGreaterThan(-1);
    expect(featuresIndex).toBeGreaterThan(-1);
    //expect(featuresIndex).toBeGreaterThan(clientsIndex);
    expect(pricingIndex).toBeGreaterThan(featuresIndex);
    expect(faqIndex).toBeGreaterThan(pricingIndex);
    expect(ctaIndex).toBeGreaterThan(faqIndex);
  });
});