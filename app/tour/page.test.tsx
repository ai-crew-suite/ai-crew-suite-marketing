import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { defaultTourPageContent } from "@/lib/tourDefaults";
import TourPage from "./page";

describe("TourPage", () => {
  it("renders the tour route with hardcoded workflow and capabilities sections", () => {
    const markup = renderToStaticMarkup(<TourPage />);

    expect(markup).toContain(defaultTourPageContent.metadata.title);
    expect(markup).toContain(defaultTourPageContent.hero.eyebrow);
    expect(markup).toContain(defaultTourPageContent.workflowSection.title);
    expect(markup).toContain(defaultTourPageContent.capabilitiesSection.items[0].title);
    expect(markup).toContain(defaultTourPageContent.ctaSection.title);
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/docs/reference/overview"');
  });
});
