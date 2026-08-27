"use client";

import { useState } from "react";

/**
 * Placeholder signup form component for newsletter subscriptions.
 * This is a temporary UI component without actual submission logic.
 */
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage("Newsletter signup functionality coming soon!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="rounded-4xl border border-trim-offset bg-page-offset p-6 shadow-card backdrop-blur-[18px] sm:p-8">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            Newsletter
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-secondary">
            Get AI Crew Suite updates
          </h3>
          <p className="mt-2 text-sm leading-6 text-content-offset">
            Receive product announcements, workflow tips, and occasional experiments.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full rounded-2xl border border-trim-offset bg-page-base px-4 py-3 text-base text-content-active placeholder:text-content-offset focus:border-content-offset focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-accent px-5 py-3 text-base font-semibold text-primary-inverse transition-colors hover:bg-accent-offset disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to newsletter"}
          </button>
        </form>

        {message && (
          <div className="rounded-2xl border border-success bg-success/10 px-4 py-3">
            <p className="text-sm font-medium text-success">{message}</p>
          </div>
        )}

        <p className="text-xs text-content-offset">
          By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
          We respect your privacy.
        </p>
      </div>
    </div>
  );
}