import Image from "next/image";

import type { ISolutionProps } from "@/lib/types";

import { PageSection } from "../Section";

/**
 * Marketing homepage solution overview section.
 */
const Solution = ({ title, description, steps }: ISolutionProps) => {
  return (
    <PageSection classes="px-8 sm:px-12 py-8 sm:py-10">
      <div className="grid gap-6 sm:gap-8 text-content-active">
        <header className="max-w-4xl space-y-2 sm:space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-4xl text-lg leading-8 text-primary sm:text-xl">
            {description}
          </p>
        </header>

        <ol
          aria-label="How Digest Engine works"
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
        >
          {steps.map((step) => (
            <li
              key={step.title}
              className="rounded-3xl border border-trim-offset bg-page-base p-6"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={step.image}
                  alt="Workflow step illustration"
                  width={90}
                  height={90}
                  className="h-22.5 w-22.5 rounded-2xl  border border-trim-offset object-cover"
                />
                <h3 className="sm:m-6 text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="m-4 sm:m-2 text-base leading-7 text-content-offset">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </PageSection>
  );
};

export default Solution;
