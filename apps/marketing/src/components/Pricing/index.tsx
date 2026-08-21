"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/shared/button";
import type { PricingComponentContent } from "@/sanity/queries/pricingComponent";
import { cn } from "@/lib/utils";

import { PageSection } from "../Section";

interface PricingComponentProps {
  content: PricingComponentContent;
}

export default function Pricing({ content }: PricingComponentProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { title, description, plans, annualDiscount } = content;

  return (
    <PageSection id="pricing" classes="px-6 py-8 sm:px-8 sm:py-10">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1 space-y-3">
          <h2 className="font-semibold tracking-tight text-4xl text-secondary sm:text-5xl">
            {title}
          </h2>
          <p className="text-base leading-7 text-primary">
            {description}
          </p>
        </div>

        <div
          className={cn(
            "relative flex w-full items-center justify-center gap-3 rounded-full border border-trim-offset bg-page-base px-2 py-2 shadow-soft backdrop-blur-[18px] sm:w-auto sm:justify-start",
          )}
        >
          <button
            type="button"
            className={cn(
              "relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              isYearly ? "text-secondary-inverse" : "text-content-offset",
            )}
            onClick={() => setIsYearly(true)}
          >
            {isYearly && (
              <span className="absolute inset-0 -z-10 rounded-full border border-trim-offset bg-secondary shadow-soft backdrop-blur-[18px]" />
            )}
            Yearly
            <span className={isYearly ? "text-secondary-inverse" : "text-primary"}>
              Save {annualDiscount}%
            </span>
          </button>
          <button
            type="button"
            className={cn(
              "relative flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              !isYearly ? "text-secondary-inverse" : "text-content-offset",
            )}
            onClick={() => setIsYearly(false)}
          >
            {!isYearly && (
              <span className="absolute inset-0 -z-10 rounded-full border border-trim-offset bg-secondary shadow-soft backdrop-blur-[18px]" />
            )}
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {plans.map((plan) => {
          const buttonClass = plan.isPopular
            ? "text-primary-inverse bg-primary hover:bg-primary"
            : "border-trim-offset text-secondary-inverse backdrop-blur-[18px] bg-secondary hover:bg-page-base text-secondary-inverse";

          return (
            <div
              key={plan.name}
              className={cn(
                "flex h-full flex-col gap-8 rounded-4xl border p-7 transition-transform duration-200 hover:-translate-y-1 sm:p-8",
                plan.isPopular
                  ? "border-accent-offset bg-page-base shadow-soft"
                  : "border-trim-offset bg-page-base",
              )}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-widest text-content-offset">
                      {plan.name}
                    </p>
                    {plan.isPopular && (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-inverse">
                        Popular
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold tracking-tight text-secondary">
                      $
                      {isYearly
                        ? Math.round(
                            plan.monthlyPrice * (1 - annualDiscount / 100),
                          )
                        : plan.monthlyPrice}
                      <span className="text-base font-medium text-secondary">
                        /mo
                      </span>
                    </h3>
                  </div>
                </div>

                <p className="leading-7 text-content-offset">
                  {plan.description}
                </p>

                <div>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature) => {
                      const [value, ...rest] = feature.split(" ");
                      return (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="mt-1 h-4 w-4 shrink-0 text-primary"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.75 11.586l6.543-6.543a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-content-offset">
                            <span className="font-semibold text-content-active">
                              {value}
                            </span>{" "}
                            {rest.join(" ")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <Button
                asChild
                variant={plan.buttonVariant}
                className={cn(
                  "mt-auto h-12 w-full rounded-full border-transparent text-base font-semibold transition-colors",
                  buttonClass,
                )}
              >
                <Link href={plan.link}>{plan.buttonLabel}</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
