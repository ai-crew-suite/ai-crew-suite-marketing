import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Orbit, PanelsTopLeft, ShieldCheck } from "lucide-react";

import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import {
  getDocsPageContent,
  type DocsHighlightIconKey,
} from "@/sanity/queries/docsPage";

const docsHighlightIcons: Record<DocsHighlightIconKey, typeof PanelsTopLeft> = {
  panelsTopLeft: PanelsTopLeft,
  orbit: Orbit,
  bookOpen: BookOpen,
  shieldCheck: ShieldCheck,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDocsPageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function DocsHomePage() {
  const content = await getDocsPageContent();

  return (
    <main className="relative mx-auto flex w-full flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="docs-home" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-secondary px-4 py-2 font-medium text-content-inverse">
            {content.hero.badge}
          </span>

          <div className="space-y-5">
            <h1 className="text-wrap text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
              {content.hero.title}
            </h1>

            <p className="text-lg leading-8 text-content-active">
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {content.highlightsSection.items.map(({ title, description, iconKey, href }) => {
            const Icon = docsHighlightIcons[iconKey];

            return (
            <Link
              key={title}
              href={href}
              className="block rounded-3xl border border-trim-offset bg-page-offset p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card-strong"
            >
              <article>
                <div className="flex justify-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-trim-offset bg-secondary text-content-inverse shadow-soft">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="pt-2 pl-4 text-2xl font-semibold tracking-tight text-secondary">{title}</h2>
                </div>
                <p className="mtext-base leading-7 text-content-active">{description}</p>
              </article>
            </Link>
            );
          })}
        </div>
      </PageSection>
    </main>
  );
}
