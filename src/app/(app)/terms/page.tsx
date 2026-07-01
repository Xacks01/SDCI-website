import React from "react";

export const metadata = {
  title: "Terms & Conditions | SDCI",
  description: "Terms and conditions governing the use of the Sustainable Development Conversations Initiative (SDCI) website and services.",
};

export default function TermsPage() {
  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/20 dark:bg-petrol-950/20 min-h-screen py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12 bg-white dark:bg-petrol-900/30 border border-neutral-200 dark:border-petrol-900 p-8 md:p-12 shadow-xs">
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-200 dark:border-petrol-900 pb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-petrol-950 dark:text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Last Updated: July 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none space-y-8 text-neutral-800 dark:text-neutral-350 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the website of the Sustainable Development Conversations Initiative (SDCI), you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise stated, SDCI owns the intellectual property rights for all material on this website, including policy briefings, research papers, articles, logos, graphics, and recordings. All intellectual property rights are reserved. You may access this material for your personal, non-commercial use, subject to restrictions set in these terms.
            </p>
            <p>
              You must not republish, sell, rent, sub-license, reproduce, duplicate, or copy material from SDCI without explicit written consent. Proper academic citation and reference to SDCI must be maintained when referencing our research.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              3. User Conduct
            </h2>
            <p>
              You agree to use our website only for lawful purposes. You are prohibited from using the site in a way that infringes the rights of others, restricts or inhibits anyone else's use and enjoyment of the website, or exposes SDCI to any legal liability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              4. Disclaimer of Liability
            </h2>
            <p>
              The information, research findings, and opinions expressed on this website are for informational and educational purposes. While we strive to ensure the accuracy and reliability of our analysis, SDCI does not warrant the completeness, accuracy, or availability of the information provided. Use of any materials obtained from this website is at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              5. Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the courts of Nigeria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              6. Changes to Terms
            </h2>
            <p>
              SDCI reserves the right to revise these Terms & Conditions at any time. By continuing to use the website after changes are posted, you agree to be bound by the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
