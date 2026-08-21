import type { Metadata } from "next";
import Link from "next/link";

import { PageSection } from "@/components/Section";
import { getCookiesPageContent } from "@/sanity/queries/cookiesPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCookiesPageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function CookiesPage() {
  const content = await getCookiesPageContent();

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="cookies-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="space-y-5">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
            {content.hero.title}
          </h1>

          <p className="text-lg leading-8 text-content-active">
            {content.hero.description}
          </p>

          <p className="text-sm text-content-offset">{content.hero.effectiveDate}</p>
        </div>
      </PageSection>

      <PageSection id="cookies-summary" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.summarySection.items.map((item, index) => (
            <div
              key={item.text}
              className="flex items-start gap-5 rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <span className="text-3xl font-semibold tracking-tight text-trim-offset">
                0{index + 1}
              </span>
              <p className="text-base font-semibold tracking-tight text-content-active">{item.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="cookies-policy" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            {content.policySection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            {content.policySection.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.policySection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4">
          {content.policySection.items.map((section) => (
            <section
              key={section.title}
              aria-labelledby={section.title}
              className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <h3
                id={section.title}
                className="text-xl font-semibold tracking-tight text-content-active"
              >
                {section.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-content-offset">{section.body}</p>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection id="cookies-contact" classes="px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
          {content.contactSection.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-content-active sm:text-3xl">
          {content.contactSection.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-content-offset">
          {content.contactSection.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={content.contactSection.primaryAction.href}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-semibold text-primary-inverse no-underline transition-colors hover:bg-accent-offset"
          >
            {content.contactSection.primaryAction.label}
          </Link>
          <Link
            href={content.contactSection.secondaryAction.href}
            className="inline-flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/90 px-5 py-3 text-base font-semibold text-content-inverse no-underline transition-colors"
          >
            {content.contactSection.secondaryAction.label}
          </Link>
        </div>
      </PageSection>
    </main>
  );
}
