import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { defaultTermsPageContent } from "@/lib/termsDefaults";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("renders the terms route with hardcoded contract sections", () => {
    const markup = renderToStaticMarkup(<TermsPage />);

    expect(markup).toContain(defaultTermsPageContent.metadata.title);
    expect(markup).toContain(defaultTermsPageContent.hero.title);
    expect(markup).toContain(defaultTermsPageContent.policySection.items[0].title);
    expect(markup).toContain(defaultTermsPageContent.policySection.items[1].title);
    expect(markup).toContain('href="https://github.com/backstage/ai-crew-suite"');
    expect(markup).toContain('href="/privacy"');
  });
});
