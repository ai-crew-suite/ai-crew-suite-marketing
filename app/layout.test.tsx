import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string | { src: string } }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={className} src={typeof src === "string" ? src : src.src} />
  ),
}));

vi.mock("@/lib/brandDefaults", () => ({
  defaultBrandSettingsContent: {
    tagline: "AI-powered workflow automation for Backstage developer portals",
  },
  getBrandSettingsContent: vi.fn(),
}));

vi.mock("@/lib/consentDefaults", () => ({
  getConsentComponentContent: vi.fn(),
}));

vi.mock("@/lib/footerDefaults", () => ({
  getFooterComponentContent: vi.fn(),
}));

vi.mock("@/lib/headerDefaults", () => ({
  getHeaderComponentContent: vi.fn(),
}));

import { getBrandSettingsContent } from "@/lib/brandDefaults";
import { getConsentComponentContent } from "@/lib/consentDefaults";
import { getFooterComponentContent } from "@/lib/footerDefaults";
import { getHeaderComponentContent } from "@/lib/headerDefaults";

describe("Root layout", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getBrandSettingsContent).mockResolvedValue({
      tagline: "AI-powered workflow automation for Backstage developer portals",
    });
    vi.mocked(getConsentComponentContent).mockResolvedValue({
      acceptButtonText: "Accept",
      closeButtonText: "Close",
      declineButtonText: "Decline",
      description: "Consent message",
      manageButtonText: "Manage",
      preferencesTitle: "Privacy controls",
      saveButtonText: "Save",
      title: "Privacy controls",
    } as never);
    vi.mocked(getFooterComponentContent).mockResolvedValue({
      description: "Footer description",
      primaryAction: { text: "Start", link: "/signup" },
      secondaryAction: { text: "Docs", link: "/docs" },
      productLinks: [{ href: "/tour", label: "Tour" }],
      legalLinks: [{ href: "/privacy", label: "Privacy" }],
    });
    vi.mocked(getHeaderComponentContent).mockResolvedValue({
      loginButtonText: "Sign up",
      navigationItems: [{ href: "/tour", label: "Tour" }],
    });
  });

  it("uses the Sanity tagline for default metadata", async () => {
    const { generateMetadata } = await import("./layout");

    await expect(generateMetadata()).resolves.toMatchObject({
      title: "AI Crew Suite",
      description: "AI-powered workflow automation for Backstage developer portals",
    });
  });

  it("passes the Sanity tagline into the footer brand area", async () => {
    const { default: RootLayout } = await import("./layout");
    const markup = renderToStaticMarkup(
      await RootLayout({ children: <div>Child content</div> }),
    );

    expect(markup).toContain("AI-powered workflow automation for Backstage developer portals");
    expect(markup).toContain("Footer description");
  });
});