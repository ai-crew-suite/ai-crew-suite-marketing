import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { CTA } from "@/components/HomePage/CTA";
import Pricing from "@/components/Pricing";
import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import { getPricingComponentContent } from "@/sanity/queries/pricingComponent";
import { getPricingPageContent } from "@/sanity/queries/pricingPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPricingPageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function PricingPage() {
  const [content, pricingComponentContent] = await Promise.all([
    getPricingPageContent(),
    getPricingComponentContent(),
  ]);

  const renderMatrixValue = (value: string) => {
    if (value === "Included") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-trim-offset bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-inverse">
          <Check aria-hidden="true" className="size-4 text-secondary-inverse" />
          {value}
        </span>
      );
    }

    if (value === "Custom") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-trim-offset bg-page-offset px-3 py-1.5 text-sm font-semibold text-content-active">
          <Minus aria-hidden="true" className="size-4 text-content-offset" />
          {value}
        </span>
      );
    }

    return <span className="text-base leading-7 text-content-active">{value}</span>;
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="pricing-page-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-trim-offset bg-secondary px-8 py-2 font-medium text-content-inverse">
              {content.hero.eyebrow}
            </span>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
                {content.hero.title}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-content-active">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button
                asChild
                variant="default"
                size="lg"
                className="h-12 rounded-full bg-accent px-6 text-lg font-semibold text-primary-inverse transition-colors hover:bg-accent-offset"
              >
                <Link href={content.hero.primaryAction.link}>{content.hero.primaryAction.text}</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href={content.hero.secondaryAction.link}>{content.hero.secondaryAction.text}</Link>
              </Button>
            </div>
          </div>

          <div className=" h-full flex flex-col justify-center gap-4 sm:gap-8">
            {content.highlightsSection.items.map((highlight) => (
              <div
                key={highlight}
                className="flex justify-center rounded-3xl bg-page-active p-5"
              >
                <p className="text-lg text-content-active font-semibold tracking-tight">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Pricing content={pricingComponentContent} />

      <PageSection id="pricing-matrix" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl text-secondary font-semibold tracking-tight">
            {content.matrixSection.heading}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.matrixSection.description}
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table aria-label="Pricing feature matrix" className="min-w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[34%] sm:w-[28%]" />
              {content.matrixSection.columns.map((column) => (
                <col key={column} className="w-[22%] sm:w-[18%]" />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-trim-offset">
                <th
                  className="p-0 align-middle text-sm font-semibold uppercase tracking-widest text-primary"
                  scope="col"
                >
                  <div className="py-4 sm:py-6 pl-4 sm:pl-6 pr-4 sm:pr-6">
                    Feature
                  </div>
                </th>
                {content.matrixSection.columns.map((column) => (
                  <th
                    key={column}
                    className="p-0 text-center text-base font-semibold tracking-tight text-content-active sm:text-lg align-middle"
                    scope="col"
                  >
                    <div className="py-4 sm:py-6 px-4 sm:px-6">
                      {column}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-trim-offset">
              {content.matrixSection.rows.map((row) => (
                <tr key={row.feature}>
                  <th
                    className="p-0 align-middle text-base font-semibold tracking-tight text-primary"
                    scope="row"
                  >
                    <div className="py-4 sm:py-6 pl-4 sm:pl-6 pr-4 sm:pr-6">
                      {row.feature}
                    </div>
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.feature}-${index}`}
                      className="p-0 text-center align-middle text-base font-semibold tracking-tight text-primary"
                    >
                      <div className="py-4 sm:py-6 px-4 sm:px-6">
                        {renderMatrixValue(value)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="pricing-faq" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            {content.faqSection.heading}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.faqSection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4 lg:grid-cols-3">
          {content.faqSection.items.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <h3 className="text-xl font-semibold tracking-tight text-secondary">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-content-offset">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <CTA {...content.ctaSection} />
    </main>
  );
}
