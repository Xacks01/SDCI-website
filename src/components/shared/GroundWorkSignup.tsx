"use client";

import { useState } from "react";
import Link from "next/link";
import { newsletterSignupAction } from "@/app/actions";

export function GroundWorkSignup() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setFeedback("");
    try {
      const result = await newsletterSignupAction(data);
      setSuccess(Boolean(result.success));
      setFeedback(result.success ? result.message || "Thank you for subscribing to Ground Work." : result.error || "We couldn’t save your subscription. Please try again.");
      if (result.success) form.reset();
    } catch {
      setSuccess(false);
      setFeedback("We couldn’t connect. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={subscribe} className="space-y-4">
      <label htmlFor="ground-work-email" className="block text-sm font-semibold">Email address</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input id="ground-work-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" disabled={pending} className="min-w-0 flex-1 border border-neutral-300 dark:border-petrol-700 bg-white dark:bg-petrol-950 text-petrol-950 dark:text-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-700 disabled:opacity-60" />
        <button type="submit" disabled={pending} className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 text-sm font-bold cursor-pointer disabled:opacity-60 disabled:cursor-wait">{pending ? "Subscribing…" : "Subscribe to Ground Work"}</button>
      </div>
      <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">By subscribing, you agree to receive SDCI’s Ground Work newsletter by email. Read our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.</p>
      <p role="status" aria-live="polite" className={`text-sm ${success ? "text-green-800 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>{feedback}</p>
    </form>
  );
}
