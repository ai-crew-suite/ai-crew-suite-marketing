// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { defaultHomePageFaqProps } from "@/lib/homePageDefaults";

import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders a details-based FAQ section with toggleable items", () => {
    const { container } = render(<FAQ {...defaultHomePageFaqProps} />);
    const detailsElements = Array.from(container.querySelectorAll("details"));

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(detailsElements).toHaveLength(defaultHomePageFaqProps.items.length);

    for (const element of detailsElements) {
      expect(element.querySelector("summary")).not.toBeNull();
      expect(element).not.toHaveAttribute("open");
    }

    const firstItem = detailsElements[0];
    const firstSummary = firstItem?.querySelector("summary");

    expect(firstSummary).not.toBeNull();

    fireEvent.click(firstSummary as HTMLElement);

    expect(firstItem).toHaveAttribute("open");
  });

  it("uses the shared page section width contract", () => {
    const { container } = render(<FAQ {...defaultHomePageFaqProps} />);

    expect(container.firstElementChild).toHaveClass("w-full");
  });
});