import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { defaultCompliancePageContent } from "@/lib/complianceDefaults";
import CompliancePage from "./page";

describe("CompliancePage", () => {
  it("renders the compliance page with hardcoded security topics and frameworks", () => {
    const markup = renderToStaticMarkup(<CompliancePage />);

    expect(markup).toContain(defaultCompliancePageContent.hero.title);
    expect(markup).toContain(defaultCompliancePageContent.metadata.title);
    expect(markup).toContain(defaultCompliancePageContent.highlightsSection.items[0].title);
    expect(markup).toContain(defaultCompliancePageContent.frameworksSection.items[0].name);
    expect(markup).toContain("Verified"); // status for one of the frameworks
    expect(markup).toContain('href="https://github.com/backstage/ai-crew-suite/security/advisories"');
    expect(markup).toContain('href="/privacy"');
  });
});
