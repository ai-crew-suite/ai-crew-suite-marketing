import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import { getSignupPageContent } from "@/sanity/queries/signupPage";
import SignupLoginNotice from "./_components/SignupLoginNotice";
import SignupForm from "./_components/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSignupPageContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function SignupPage() {
  const content = await getSignupPageContent();

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="signup-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-secondary px-4 py-2 font-medium text-content-inverse">
              {content.hero.badge}
            </span>

            <Suspense fallback={null}>
              <SignupLoginNotice />
            </Suspense>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-content-active">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href={content.hero.primaryAction.link}>{content.hero.primaryAction.text}</Link>
              </Button>

              <Button
                asChild
                variant="default"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href={content.hero.secondaryAction.link}>{content.hero.secondaryAction.text}</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.hero.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-3xl border border-trim-offset bg-page-base p-5 shadow-card backdrop-blur-[18px]"
                >
                  <p className="text-base font-semibold tracking-tight text-content-active">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SignupForm />
        </div>
      </PageSection>

      <PageSection id="signup-next-steps" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div>
          <p className="font-semibold uppercase tracking-widest text-content-offset">
            {content.nextStepsSection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            {content.nextStepsSection.title}
          </h2>
          <p className="mt-3 leading-7 text-content-offset">
            {content.nextStepsSection.description}
          </p>
        </div>

        <ol className="mt-4 sm:mt-8 grid gap-4 md:grid-cols-3" aria-label="Signup next steps">
          {content.nextStepsSection.items.map((step, index) => (
            <li
              key={step}
              className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Step 0{index + 1}
              </p>
              <p className="mt-4 text-base font-semibold tracking-tight text-content-active">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </PageSection>
    </main>
  );
}