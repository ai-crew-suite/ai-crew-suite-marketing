// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { defaultBrandSettingsContent } from "@/sanity/queries/brandSettings";
import { defaultFooterComponentContent } from "@/sanity/queries/footerComponent";

import { Footer } from "./index";

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string | { src: string } }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={className} src={typeof src === "string" ? src : src.src} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Footer", () => {
  it("renders brand, navigation groups, and legal links", () => {
    render(
      <Footer
        brandTagline={defaultBrandSettingsContent.tagline}
        content={defaultFooterComponentContent}
      />,
    );

    const footer = screen.getByRole("contentinfo");
    const productNav = within(footer).getByRole("navigation", {
      name: "Footer product links",
    });
    const legalNav = within(footer).getByRole("navigation", {
      name: "Footer legal links",
    });

    expect(footer).toHaveAttribute("id", "marketing-footer");
    expect(within(footer).getByRole("img", { name: "Digest Engine logo" })).toBeInTheDocument();
    expect(within(footer).getByText(defaultBrandSettingsContent.tagline)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Start Your First Project" })).toHaveAttribute("href", "/signup");
    expect(within(productNav).getByRole("link", { name: "How It Works" })).toHaveAttribute("href", "/tour");
    expect(within(productNav).getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(within(legalNav).getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(within(legalNav).getByRole("link", { name: "Compliance" })).toHaveAttribute("href", "/compliance");
    expect(within(footer).getByText(defaultFooterComponentContent.description)).toBeInTheDocument();
  });

  it("keeps the brand copy ahead of nav groups and CTA links in document order", () => {
    const { container } = render(
      <Footer
        brandTagline={defaultBrandSettingsContent.tagline}
        content={defaultFooterComponentContent}
      />,
    );

    const footer = container.querySelector("footer");

    expect(footer).not.toBeNull();

    const summary = within(footer as HTMLElement).getByText(defaultFooterComponentContent.description);
    const exploreHeading = within(footer as HTMLElement).getByText("Explore");
    const startProjectLink = within(footer as HTMLElement).getByRole("link", {
      name: defaultFooterComponentContent.primaryAction.text,
    });

    expect(summary.compareDocumentPosition(exploreHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(exploreHeading.compareDocumentPosition(startProjectLink)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
