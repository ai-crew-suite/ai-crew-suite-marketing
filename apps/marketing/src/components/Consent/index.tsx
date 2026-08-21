"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import type { ConsentComponentContent } from "@/sanity/queries/consentComponent";
import {
  CONSENT_STORAGE_KEY,
  readConsentPreferences,
  writeConsentPreferences,
} from "@/lib/marketingConsent";

export { CONSENT_STORAGE_KEY };

function getInitialIsOpen() {
  if (typeof window === "undefined") {
    return false;
  }

  return readConsentPreferences() === null;
}

interface ConsentProps {
  content: ConsentComponentContent;
}

/**
 * Presents a site-wide cookie consent banner and stores preferences in local storage.
 */
export function Consent({ content }: ConsentProps) {
  const [isOpen, setIsOpen] = useState(getInitialIsOpen);

  const {
    badge,
    title,
    description,
    policyLink,
    essentialOnlyButtonText,
    acceptAllButtonText,
  } = content;

  const handleEssentialOnly = () => {
    writeConsentPreferences(false);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    writeConsentPreferences(true);
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        className="pointer-events-auto relative mx-auto w-full rounded-4xl border border-trim-offset bg-page-inverse px-5 py-5 text-content-inverse shadow-card-strong sm:px-6 sm:py-6"
      >
        <button
          type="button"
          aria-label="Dismiss cookie preferences"
          onClick={handleDismiss}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-page-base text-content-active transition-colors hover:bg-page-offset sm:right-6 sm:top-6"
        >
          <X className="size-5" />
        </button>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-center sm:gap-18">
          <div className="min-w-0 flex-1 max-w-2xl space-y-4 text-left">
            <div className="flex items-start justify-start gap-4">
              <span className="w-fit rounded-full border border-trim-offset bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-content-inverse">
                {badge}
              </span>
            </div>

            <div className="space-y-3">
              <h2
                id="cookie-consent-title"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {title}
              </h2>
              <p
                id="cookie-consent-description"
                className="max-w-3xl text-sm leading-6 text-content-inverse-active sm:text-base sm:leading-7"
              >
                {description}
              </p>
            </div>
          </div>

          <div className="self-center w-fit shrink-0 rounded-3xl border border-trim-offset bg-page-base p-4 text-content-active shadow-card sm:self-auto sm:p-5">
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex min-h-11 w-52 items-center justify-center rounded-full bg-secondary px-5 py-3 text-base font-semibold text-content-inverse transition-colors hover:bg-secondary-offset"
              >
                {acceptAllButtonText}
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="inline-flex min-h-11 w-52 items-center justify-center rounded-full border border-trim-offset px-5 py-3 text-base font-semibold text-content-active transition-colors hover:bg-page-offset"
              >
                {essentialOnlyButtonText}
              </button>
              <Link
                href={policyLink.href}
                className="inline-flex justify-start text-sm font-semibold no-underline transition-colors hover:text-content-offset"
              >
                {policyLink.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
