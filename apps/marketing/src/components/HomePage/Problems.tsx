import Image from "next/image";

import problemImage from "@/assets/images/problem.png";
import type { IProblemsProps } from "@/lib/types";

import { PageSection } from "../Section";

/**
 * Marketing homepage problem framing section.
 */
const Problems = ({
  eyebrow,
  title,
  description,
  toolsHeading,
  toolsDescription,
  toolFailures,
}: IProblemsProps) => {
  return (
    <PageSection classes="px-8 sm:px-12 pt-8 sm:pt-12 pb-4 sm:pb-10">
      <div className="grid gap-6 sm:gap-10 text-content-active">
        <header className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
          <p className="text-center text-base font-semibold uppercase tracking-wider text-primary md:hidden">
            {eyebrow}
          </p>
          <div className="mx-auto shrink-0 overflow-hidden rounded-3xl md:mx-0">
            <Image
              src={problemImage}
              alt="Editorial workflow comparison illustration"
              width={300}
              height={300}
              className="block h-auto w-full max-w-[300px]"
              priority
            />
          </div>
          <div className="space-y-3">
            <p className="hidden text-base font-semibold uppercase tracking-wider text-secondary md:block">
              {eyebrow}
            </p>
            <h2 className="max-w-3xl font-semibold tracking-tight text-secondary text-3xl sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-primary sm:text-xl">
              {description}
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-trim-offset bg-page-base p-6 sm:p-8">
          <div className="grid gap-4 sm:gap-8">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {toolsHeading}
              </h3>
              <p className="text-base leading-7 text-content-offset sm:text-lg">
                {toolsDescription}
              </p>
            </div>

            <ul
              aria-label="Curation tool gaps"
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {toolFailures.map((item, index) => (
                <li
                  key={`gap-${index}`}
                  className="h-full rounded-2xl border border-trim-offset bg-page-offset p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                    Gap 0{index + 1}
                  </p>
                  <h4 className="mt-4 text-2xl font-semibold tracking-tight text-secondary">
                    {item.title}
                  </h4>
                  <p className="mt-3 leading-7 text-primary">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageSection>
  );
};

export default Problems;
