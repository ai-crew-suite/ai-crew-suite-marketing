import Image from "next/image";
import Link from "next/link";

import type { FooterComponentContent } from "@/sanity/queries/footerComponent";

import { PageSection } from "../Section";
import { Button } from "../shared/button";
import logo from "@/assets/images/logo.svg";

interface FooterProps {
  brandTagline: string;
  content: FooterComponentContent;
}

/**
 * Marketing site footer navigation.
 */
export function Footer({ brandTagline, content }: FooterProps) {
  const {
    description,
    primaryAction,
    secondaryAction,
    productLinks,
    legalLinks,
  } = content;

  return (
    <PageSection as="footer" id="marketing-footer" classes="my-6 py-6 sm:py-8 px-6 sm:px-12">
      <div className="grid gap-8 lg:grid-cols-[4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            className="flex items-center gap-4 text-content-active no-underline"
          >
            <Image
              src={logo}
              alt={"Digest Engine logo"}
              className="h-14 w-14 shrink-0"
            />
            <div>
              <p className="m-0 text-lg font-semibold tracking-tight text-content-active">
                Digest Engine
              </p>
              <p className="m-0 text-sm text-content-offset">{brandTagline}</p>
            </div>
          </Link>

          <p className="m-0 max-w-xl text-sm leading-7 text-content-offset sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:contents">
          <nav aria-label="Footer product links" className="flex flex-col gap-4">
            <p className="m-0 text-xs font-semibold uppercase tracking-widest text-content-active">
              Explore
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-offset no-underline transition-colors hover:text-content-active"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer legal links" className="flex flex-col gap-4">
            <p className="m-0 text-xs font-semibold uppercase tracking-widest text-content-active">
              Legal
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-offset no-underline transition-colors hover:text-content-active"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 lg:max-w-56 lg:justify-self-center">
          <Button
            asChild
            className="h-11 w-full rounded-full px-5 font-semibold bg-primary hover:bg-primary-offset transition-colors"
          >
            <Link href={primaryAction.link}>{primaryAction.text}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-full px-5 text-content-inverse hover:text-content-inverse font-semibold bg-secondary hover:bg-secondary/90 transition-colors"
          >
            <Link href={secondaryAction.link}>{secondaryAction.text}</Link>
          </Button>
        </div>
      </div>
    </PageSection>
  );
}
