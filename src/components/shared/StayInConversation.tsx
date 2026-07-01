"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { newsletterSignupAction } from "@/app/actions";

export const StayInConversation: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("email", email);

    const res = await newsletterSignupAction(formData);
    setLoading(false);
    if (res.success) {
      setIsSuccess(true);
      setMessage(res.message || "Thank you for subscribing!");
      setEmail("");
    } else {
      setIsSuccess(false);
      setMessage(res.error || "Subscription failed. Please try again.");
    }
  };

  return (
    <section className="bg-green-700 dark:bg-petrol-900 text-white py-16 px-6 font-sans border-t border-green-700 dark:border-petrol-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">
            Stay in the <span className="text-lime-300">conversation.</span>
          </h2>
          <p className="text-petrol-950 dark:text-neutral-300 font-medium max-w-xl leading-relaxed text-sm md:text-base">
            Get our briefings in your inbox, join as a member, or help keep our research independent.
          </p>
        </div>
        
        <div className="flex-1 w-full max-w-md space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2.5 rounded-none bg-green-950/60 dark:bg-petrol-950 border border-white/20 dark:border-petrol-800 text-white dark:text-white placeholder-green-300/50 dark:placeholder-petrol-400 focus:outline-none focus:ring-2 focus:ring-lime-300/50 dark:focus:ring-green-500/50 focus:border-lime-300 dark:focus:border-green-500 text-sm"
            />
            <button type="submit" className="bg-petrol-950 hover:bg-petrol-900 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-petrol-950 font-bold text-xs px-5 py-2.5 rounded-none shrink-0 cursor-pointer transition-colors">
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`text-sm font-semibold ${isSuccess ? "text-lime-300" : "text-red-400"}`}>
              {message}
            </p>
          )}
 
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link href="/get-involved#membership">
              <button className="border border-white dark:border-petrol-700 text-white dark:text-petrol-200 hover:bg-white hover:text-green-700 dark:hover:bg-petrol-800 dark:hover:text-white text-xs font-bold py-2.5 px-4 rounded-none transition-colors bg-transparent cursor-pointer">
                Become a member
              </button>
            </Link>
            <Link href="/get-involved#donate">
              <button className="bg-white dark:bg-petrol-800 text-green-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-petrol-750 text-xs font-bold py-2.5 px-4 rounded-none transition-colors cursor-pointer">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
