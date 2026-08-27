import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DocsHomePage from "./page";
import { defaultDocsPageContent } from "@/lib/docsDefaults";

describe("DocsHomePage", () => {
  it("renders the custom docs landing page", async () => {
    const markup = renderToStaticMarkup(await DocsHomePage());

    expect(markup).toContain("Documentation");
    expect(markup).toContain(defaultDocsPageContent.hero.title);
    expect(markup).toContain('href="/docs/incident-response"');
    expect(markup).toContain('href="/docs/catalog"');
    expect(markup).toContain('href="/docs/operations"');
    expect(markup).toContain('href="/docs/developer-guide"');
    expect(markup).toContain('href="/docs/getting-started"');
    expect(markup).toContain('href="/"');
  });
});
