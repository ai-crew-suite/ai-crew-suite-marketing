"use client";

import { type FormEvent, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import githubLogo from "@/assets/images/social/github-signin.svg";
import googleLogo from "@/assets/images/social/google-signin.svg";
import microsoftLogo from "@/assets/images/social/microsoft-signin.svg";

type LoginMethod = "email" | "github" | "google" | "microsoft";

const missingAccountRedirect = "/signup?login=missing-account";

function delay(durationMs: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

const providerButtons: Array<{
  id: Exclude<LoginMethod, "email">;
  label: string;
  logo: StaticImageData;
}> = [
  { id: "google", label: "Sign in with Google", logo: googleLogo },
  { id: "github", label: "Sign in with GitHub", logo: githubLogo },
  { id: "microsoft", label: "Sign in with Microsoft", logo: microsoftLogo },
];

/**
 * Renders the marketing login route used as a temporary handoff into signup.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingMethod, setPendingMethod] = useState<LoginMethod | null>(null);

  const isPending = pendingMethod !== null;

  const beginLogin = async (method: LoginMethod) => {
    setPendingMethod(method);
    await delay(1000);
    router.push(missingAccountRedirect);
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    await beginLogin("email");
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="login-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8">
          <div className="grid gap-6">
            <div className="space-y-4 text-center sm:text-left">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Login
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-content-active">
                Access your workspace with a connected provider or your work email.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href="/signup">Go straight to signup</Link>
              </Button>

              <Button
                asChild
                variant="default"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-4xl border border-trim-offset bg-page-offset p-6 shadow-panel backdrop-blur-[18px] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
              <section className="grid content-start gap-5 lg:border-r lg:border-trim-offset lg:pr-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-content-active">
                    Choose a provider
                  </h2>
                  <p className="text-sm leading-7 text-content-offset">
                    Use the login method already connected to your Digest Engine account.
                  </p>
                </div>

                <div className="inline-grid justify-self-center gap-3">
                  {providerButtons.map((provider) => (
                    <Button
                      key={provider.id}
                      type="button"
                      variant="outline"
                      className="h-13 justify-start rounded-2xl border-neutral-200 bg-white px-5 text-base font-semibold text-slate-950 shadow-soft hover:bg-white hover:text-slate-950"
                      onClick={() => void beginLogin(provider.id)}
                      disabled={isPending}
                    >
                      <span className="flex size-5 items-center justify-center" aria-hidden="true">
                        <Image
                          src={provider.logo}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5 object-contain"
                        />
                      </span>
                      {provider.label}
                    </Button>
                  ))}
                </div>
              </section>

              <section className="grid content-start gap-5">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-content-active">
                    Use your email
                  </h2>
                  <p className="text-sm leading-7 text-content-offset">
                    Enter the work email and password tied to your account.
                  </p>
                </div>

                <form className="grid gap-5" onSubmit={(event) => void handleEmailSubmit(event)} noValidate>
                  <label className="grid gap-2 text-sm font-medium text-content-active">
                    Email
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 rounded-2xl border border-trim-offset bg-page-base px-4 text-base text-content-active"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-content-active">
                    Password
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-12 rounded-2xl border border-trim-offset bg-page-base px-4 text-base text-content-active"
                    />
                  </label>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      className="h-12 rounded-full bg-accent px-7 text-base font-semibold text-primary-inverse transition-colors hover:bg-accent-offset"
                      disabled={isPending}
                    >
                      {isPending ? "Checking account..." : "Sign in with email"}
                    </Button>
                  </div>

                  <p role="status" className="text-sm text-content-offset" aria-live="polite">
                    {isPending ? "Checking for an existing account..." : ""}
                  </p>
                </form>
              </section>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}