import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, LockKeyhole, ServerCrash, ShieldCheck } from "lucide-react";

import { PageSection } from "@/components/Section";
import {
  getCompliancePageContent,
  type ComplianceHighlightItem,
} from "@/sanity/queries/compliancePage";

const iconMap: Record<ComplianceHighlightItem["icon"], typeof LockKeyhole> = {
  badgeCheck: BadgeCheck,
  lockKeyhole: LockKeyhole,
  serverCrash: ServerCrash,
  shieldCheck: ShieldCheck,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCompliancePageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function CompliancePage() {
  const content = await getCompliancePageContent();

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="compliance-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
              {content.hero.title}
            </h1>

            <p className="text-lg leading-8 text-content-active">
              {content.hero.description}
            </p>

            <p className="text-base leading-7 italic">
              {content.hero.note}
            </p>
          </div>

          <div className="rounded-4xl border border-trim-offset bg-page-base p-6 shadow-card backdrop-blur-[18px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
              {content.hero.checklistEyebrow}
            </p>
            <div className="mt-5 space-y-4">
              {content.hero.checklistItems.map((item) => (
                <div key={item.text} className="flex justify-center rounded-3xl border border-trim-offset bg-page-offset p-4">
                  <p className="text-base font-semibold tracking-tight text-content-active">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="compliance-highlights" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            {content.highlightsSection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            {content.highlightsSection.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.highlightsSection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4 sm:grid-cols-2">
          {content.highlightsSection.items.map((highlight) => {
            const Icon = iconMap[highlight.icon] ?? LockKeyhole;

            return (
              <article
                key={highlight.title}
                className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
              >
                <div className="flex justify-start gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-background text-secondary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-secondary">
                    {highlight.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-7 text-content-offset">
                  {highlight.description}
                </p>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection id="compliance-frameworks" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            {content.frameworksSection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            {content.frameworksSection.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.frameworksSection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4 lg:grid-cols-4">
          {content.frameworksSection.items.map((framework) => (
            <article
              key={framework.name}
              className="rounded-3xl border border-trim-offset bg-page-base p-5 shadow-card"
            >
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-content-offset">
                  {framework.name}
                </p>
                <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-content-inverse">
                  {framework.status}
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-content-offset">{framework.detail}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="compliance-details" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            {content.detailsSection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            {content.detailsSection.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.detailsSection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4 lg:grid-cols-2">
          {content.detailsSection.items.map((section, index) => (
            <section
              key={section.title}
              aria-labelledby={section.title}
              className="flex items-start gap-5 rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <span className="text-3xl font-semibold tracking-tight text-trim-offset">
                0{index + 1}
              </span>
              <div>
                <h3
                  id={section.title}
                  className="text-2xl font-semibold tracking-tight text-content-active"
                >
                  {section.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-content-offset">
                  {section.body}
                </p>
              </div>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection id="compliance-contact" classes="px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
          {content.contactSection.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
          {content.contactSection.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-content-offset">
          {content.contactSection.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
          <Link
            href={content.contactSection.primaryAction.href}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-semibold text-primary-inverse no-underline transition-colors hover:bg-accent-offset"
          >
            {content.contactSection.primaryAction.label}
          </Link>
          <Link
            href={content.contactSection.secondaryAction.href}
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-semibold text-content-inverse no-underline transition-colors bg-secondary hover:bg-secondary/90"
          >
            {content.contactSection.secondaryAction.label}
          </Link>
        </div>
      </PageSection>
    </main>
  );
}
