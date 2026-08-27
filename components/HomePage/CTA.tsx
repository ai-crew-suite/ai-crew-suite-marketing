import Link from "next/link";

import type { ICtaProps } from "@/lib/types";

import { PageSection } from "../Section";
import { Button } from "../shared/button";

export const CTA = ({
  title,
  description,
  badges,
  primaryAction,
  highlights,
}: ICtaProps) => {
  return (
    <PageSection
      id="cta"
      aria-label="Homepage call to action"
      classes="px-6 py-8 sm:px-8 sm:py-10"
    >
      <div className="relative isolate overflow-hidden rounded-4xl border border-trim-offset bg-page-base px-6 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="relative grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
          <div className="flex flex-col items-start gap-6 text-left lg:self-center">
            <div className="space-y-4">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-content-offset sm:text-lg">
                {description}
              </p>
            </div>

            <ul className="m-0 flex flex-wrap gap-3 p-0 text-sm text-content-offset justify-center sm:justify-start">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="list-none rounded-full border border-trim-offset bg-page-offset px-3 py-1.5 shadow-soft"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <div className="w-full flex justify-center sm:justify-start">
              <Button
                asChild
                className="h-12 rounded-full bg-accent hover:bg-accent-offset px-7 text-base font-semibold text-primary-inverse transition-colors"
              >
                <Link href={primaryAction.link}>{primaryAction.text}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:pb-1">
            {highlights.map((highlight, index) => (
              <article
                key={highlight.step}
                className={[
                  "rounded-3xl border border-trim-offset px-5 py-5",
                  index === 1 ? "bg-secondary/20 lg:translate-x-6" : "bg-page-offset",
                  index === 2 ? "lg:-translate-x-4" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-trim-offset bg-page-base text-sm font-semibold tracking-widest text-content-active">
                    {highlight.step}
                  </span>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-content-active">
                    {highlight.title}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-6 text-content-offset">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
};
