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



import Home from "./page";

describe("Marketing home page", () => {
  beforeEach(() => {
    // No Sanity queries needed
  });

  it("renders the AI Crew Suite landing page sections in the expected order", async () => {
    const markup = renderToStaticMarkup(await Home());
    const featuresIndex = markup.indexOf('id="features"');
    //const clientsIndex = markup.indexOf('id="clients"');
    const faqIndex = markup.indexOf('id="faq"');
    const ctaIndex = markup.indexOf('id="cta"');

    expect(markup).toContain("pt-24");
    expect(markup).toContain(defaultHeroProps.title);
    expect(markup).toContain(defaultFeatureItems.title);
    expect(markup).toContain(defaultHomePageFaqProps.title);
    expect(markup).toContain('aria-label="Homepage call to action"');
    //expect(clientsIndex).toBeGreaterThan(-1);
    expect(featuresIndex).toBeGreaterThan(-1);
    //expect(featuresIndex).toBeGreaterThan(clientsIndex);
    expect(faqIndex).toBeGreaterThan(featuresIndex);
    expect(ctaIndex).toBeGreaterThan(faqIndex);
  });
});