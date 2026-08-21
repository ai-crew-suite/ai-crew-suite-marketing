// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen, within } from "@testing-library/react";
import { Fragment } from "react";
import { describe, expect, it, vi } from "vitest";

import type { IProblemsProps } from "@/lib/types";

import Problems from "./Problems";

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string }) =>
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} className={className} height={300} src={src} width={300} />
    ),
}));

const problemsProps: IProblemsProps = {
  eyebrow: "Editorial pain",
  title: "Finding relevant stories is harder than it looks.",
  description: "A short setup sentence for the section.",
  toolsHeading: "Where current tools fall short",
  toolsDescription: "A short explanation of the current-tool failure mode.",
  toolFailures: [
    {
      title: "Signal mismatch",
      description: "Generic popularity is not the same as niche authority.",
    },
    {
      title: "Saturation blindness",
      description: "You cannot see when the topic is already over-covered.",
    },
    {
      title: "No editorial context",
      description: "The system does not know your point of view.",
    },
  ],
};

describe("Problems", () => {
  it("renders the problem framing structure from props", () => {
    render(<Problems {...problemsProps} />);

    const gapList = screen.getByRole("list", { name: "Curation tool gaps" });

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: problemsProps.title,
      }),
    ).toBeInTheDocument();
    expect(within(gapList).getAllByRole("listitem")).toHaveLength(3);

    const illustration = screen.getByRole("img", {
      name: "Editorial workflow comparison illustration",
    });

    expect(illustration).toHaveAttribute("width", "300");
    expect(illustration).toHaveAttribute("height", "300");
  });

  it("renders entity markup supplied through TSX props as decoded text", () => {
    render(
      <Problems
        {...problemsProps}
        toolFailures={[
          {
            title: (
              <Fragment>
                Global popularity &ne; niche authority
              </Fragment>
            ),
            description: "Generic popularity is not the same as niche authority.",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Global popularity ≠ niche authority",
      }),
    ).toBeInTheDocument();
  });

  it("stacks the illustration above the copy on mobile widths", () => {
    const { container } = render(<Problems {...problemsProps} />);

    expect(container.innerHTML).toContain("flex flex-col gap-6 md:flex-row md:items-start md:gap-12");
    expect(container.innerHTML).toContain("mx-auto shrink-0 overflow-hidden rounded-3xl md:mx-0");
  });
});
