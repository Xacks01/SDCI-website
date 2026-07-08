import React from "react";

export const metadata = {
  title: "Privacy Policy | SDCI",
  description: "Privacy policy detailing how SDCI collects, uses, and safeguards personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/20 dark:bg-petrol-950/20 min-h-screen py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12 bg-white dark:bg-petrol-900/30 border border-neutral-200 dark:border-petrol-900 p-8 md:p-12 shadow-xs">
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-200 dark:border-petrol-900 pb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-petrol-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Last Updated: July 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none space-y-8 text-neutral-800 dark:text-neutral-350 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us when you subscribe to our newsletter, submit a contact form, request a consultation, or interact with our services. This information may include your name, email address, phone number, organization, and message contents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To send you our policy briefings, newsletters, and program updates.</li>
              <li>To respond to your inquiries, consultation requests, and contact messages.</li>
              <li>To improve our website functionality, content relevance, and user experience.</li>
              <li>To monitor traffic patterns and analyze website usage demographics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              3. Information Sharing and Disclosure
            </h2>
            <p>
              SDCI does not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers (such as email delivery systems or analytics platforms) who assist us in operating our website and conducting our activities, under strict confidentiality agreements.
            </p>
            <p>
              We may also disclose information if required to do so by law, or to protect the rights, property, or safety of SDCI, our users, or others.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              5. Your Rights and Choices
            </h2>
            <p>
              You have the right to opt-out of receiving our newsletter or marketing communications at any time by clicking the "unsubscribe" link in our emails. You may also request to access, update, or delete your personal information by contacting us at office@sdcinitiative.com.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
              6. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us via our contact page or email us directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
