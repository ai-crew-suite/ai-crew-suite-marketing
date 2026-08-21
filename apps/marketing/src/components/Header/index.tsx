"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import type { HeaderComponentContent } from "@/sanity/queries/headerComponent";

import { PageSection } from "../Section";
import logo from "@/assets/images/logo.svg";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  content: HeaderComponentContent;
}

/**
 * Marketing site header navigation.
 */
export function Header({ content }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuLabel = isMobileMenuOpen
    ? "Close navigation menu"
    : "Open navigation menu";

  return (
    <div className="fixed inset-x-4 top-4 z-50">
      <PageSection
        as="header"
        id="marketing-nav"
        shadowClass="shadow-card-strong"
        classes="flex flex-col gap-4"
      >
        <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 text-content-active no-underline sm:gap-3"
          >
            <Image
              src={logo}
              alt="Digest Engine logo"
              className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
              priority
            />
            <span className="min-w-0 truncate text-lg font-semibold tracking-tight text-secondary hover:text-secondary-offset sm:ml-2 sm:text-3xl">
              Digest Engine
            </span>
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
            <nav className="hidden items-center gap-6 sm:gap-8 md:flex">
              {content.navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base sm:text-lg font-medium tracking-tight transition-colors text-secondary hover:text-secondary-offset"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            {isMobileMenuOpen ? (
              <button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded="true"
                aria-label={mobileMenuLabel}
                title={mobileMenuLabel}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-page-offset text-secondary transition-colors hover:text-secondary-offset md:hidden"
              >
                <X aria-hidden="true" className="size-6" strokeWidth={1.9} />
                <span className="sr-only">{mobileMenuLabel}</span>
              </button>
            ) : (
              <button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded="false"
                aria-label={mobileMenuLabel}
                title={mobileMenuLabel}
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-page-offset text-secondary transition-colors hover:text-secondary-offset md:hidden"
              >
                <Menu aria-hidden="true" className="size-6" strokeWidth={1.9} />
                <span className="sr-only">{mobileMenuLabel}</span>
              </button>
            )}

            <Link
              href="/login"
              className="hidden rounded-full bg-accent px-4 py-2 text-base font-semibold text-primary-inverse no-underline transition-colors hover:bg-accent-offset sm:text-lg md:inline-flex"
            >
              {content.loginButtonText}
            </Link>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div
            id="mobile-navigation"
            className="flex flex-col gap-4 border-t border-trim-offset pt-4 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {content.navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium tracking-tight text-secondary transition-colors hover:text-secondary-offset"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2 text-base font-semibold text-primary-inverse no-underline transition-colors hover:bg-accent-offset"
            >
              {content.loginButtonText}
            </Link>
          </div>
        ) : null}
      </PageSection>
    </div>
  );
}
