import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

import type { IFeatureItem, IFeaturesProps } from "@/lib/types";

import { PageSection } from "../Section";

const FeatureCard: FC<IFeatureItem> = ({ title, image, description, link }) => {
  return (
    <Link href={link} className="block h-full">
      <article className="group relative flex h-full flex-col gap-5 rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card transition-transform duration-200 hover:-translate-y-1">
        <div className="flex items-start justify-between gap-6">
          <Image
            src={image}
            alt="Feature illustration"
            width={90}
            height={90}
            className="h-22.5 w-22.5 rounded-2xl border border-trim-offset object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Feature
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-secondary sm:text-2xl">
              {title}
            </h3>
          </div>
        </div>

        <p className="m-0 text-base leading-7 text-content-offset">
          {description}
        </p>

        <div className="mt-auto text-sm font-semibold text-primary">
          Explore capability
        </div>
      </article>
    </Link>
  );
};

const Features: FC<IFeaturesProps> = ({ title, description, items }) => {
  return (
    <PageSection id="features" classes="px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold tracking-tight text-4xl sm:text-5xl text-secondary">
          {title}
        </h2>
        <p className="text-base leading-7 text-primary">
          {description}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((props, idx) => {
          return (
            <div key={idx} className="h-full">
              <FeatureCard {...props} />
            </div>
          );
        })}
      </div>
    </PageSection>
  );
};

export default Features;
