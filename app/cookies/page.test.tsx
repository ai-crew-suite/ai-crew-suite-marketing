import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { defaultCookiesPageContent } from "@/lib/cookiesDefaults";
import CookiesPage from "./page";

describe("CookiesPage", () => {
  it("renders the cookies route with hardcoded cookie policy sections", () => {
    const markup = renderToStaticMarkup(<CookiesPage />);

    expect(markup).toContain(defaultCookiesPageContent.metadata.title);
    expect(markup).toContain(defaultCookiesPageContent.hero.title);
    expect(markup).toContain(defaultCookiesPageContent.policySection.items[0].title);
    expect(markup).toContain(defaultCookiesPageContent.policySection.items[1].title);
    expect(markup).toContain('href="/privacy"');
    expect(markup).toContain('href="/terms"');
  });
});
