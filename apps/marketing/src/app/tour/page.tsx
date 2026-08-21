import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  FileSearch,
  type LucideIcon,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";

import { CTA } from "@/components/HomePage/CTA";
import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import {
  getTourPageContent,
  type TourCapabilityItem,
} from "@/sanity/queries/tourPage";

const capabilityIconMap: Record<TourCapabilityItem["icon"], LucideIcon> = {
  blocks: Blocks,
  fileSearch: FileSearch,
  messageSquareQuote: MessageSquareQuote,
  sparkles: Sparkles,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTourPageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function TourPage() {
  const content = await getTourPageContent();

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="tour-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-secondary px-4 py-2 text-sm font-medium text-content-inverse">
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
                <Link href={content.hero.primaryAction.link}>
                  {content.hero.primaryAction.text}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href={content.hero.secondaryAction.link}>
                  {content.hero.secondaryAction.text}
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-4xl border border-trim-offset bg-page-base p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-content-offset">
              {content.highlightsSection.heading}
            </p>
            <div className="mt-5 space-y-4">
              {content.highlightsSection.items.map((item) => (
                <div key={item.text} className="flex gap-3 rounded-3xl border border-trim-offset bg-page-offset p-4">
                  <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-secondary" aria-hidden="true" />
                  <p className="text-base leading-7 text-content-active">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="tour-flow" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="sm:max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            {content.workflowSection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            {content.workflowSection.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {content.workflowSection.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-8 grid gap-4 lg:grid-cols-3">
          {content.workflowSection.steps.map((step, index) => {
            return (
              <article
                key={step.title}
                className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
              >
                <div className="flex gap-6">
                  <span className="mt-2 text-3xl font-semibold text-secondary">0{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-tight text-secondary">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-7 text-content-offset">{step.description}</p>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection id="tour-capabilities" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
              {content.capabilitiesSection.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
              {content.capabilitiesSection.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-content-offset">
              {content.capabilitiesSection.description}
            </p>

            <Link
              href={content.capabilitiesSection.link.link}
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-content-active transition-colors hover:text-content-offset"
            >
              {content.capabilitiesSection.link.text}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.capabilitiesSection.items.map((capability) => {
              const Icon = capabilityIconMap[capability.icon] ?? Sparkles;

              return (
                <article
                  key={capability.title}
                  className="rounded-3xl border border-trim-offset bg-page-base px-4 pb-4"
                >
                  <div className="flex items-center gap-3 text-secondary">
                    <span className="mt-4 sm:mt-2 inline-flex size-12 items-center justify-center rounded-2xl bg-background">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-content-offset">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </PageSection>

      <CTA {...content.ctaSection} />
    </main>
  );
}
