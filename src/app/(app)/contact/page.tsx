import React from "react";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/shared/ContactForm";

export default function ContactPage() {
  const contactDetails = [
    {
      role: "General Enquiries",
      email: "office@sdcinitiative.com",
      desc: "For general questions, comments, or program inquiries.",
    },
    {
      role: "Media Enquiries",
      email: "media@sdcinitiative.com",
      desc: "For journalists looking for comments, research citations, or podcast guest details.",
    },
    {
      role: "Partnership & Funding",
      email: "partnership@sdcinitiative.com",
      desc: "For foundations, corporate organizations, and agencies looking to commission work or collaborate.",
    },
  ];

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/20 dark:bg-petrol-950/20 min-h-screen">
      {/* Page Header */}
      <section className="bg-petrol-950 text-white py-16 px-6 border-b border-petrol-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 bg-transparent w-fit">
            Reach Out
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Contact Us</h1>
          <p className="text-petrol-100 text-sm md:text-base max-w-xl leading-relaxed">
            Whether you are a journalist on deadline, a partner with a question, or a citizen with something to say &mdash; reach us here.
          </p>
        </div>
      </section>

      {/* Contact Details and Form */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact details & Address */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
              Channels
            </span>
            <h2 className="text-2xl font-bold font-serif mt-2 text-petrol-950 dark:text-white">How to reach us</h2>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
              We respond to inquiries within 24 to 48 hours. Please check the FAQ section on our homepage for immediate answers to common questions.
            </p>
          </div>

          <div className="space-y-6">
            {contactDetails.map((item) => (
              <div key={item.role} className="space-y-1">
                <h3 className="font-bold text-sm text-petrol-950 dark:text-white uppercase tracking-wide">{item.role}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                <a href={`mailto:${item.email}`} className="text-sm font-bold text-green-700 dark:text-green-400 hover:underline">
                  {item.email}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-petrol-800 space-y-2">
            <h3 className="font-bold text-sm text-petrol-950 dark:text-white uppercase tracking-wide">Office Address</h3>
            <p className="text-sm text-neutral-850 dark:text-neutral-300 leading-relaxed font-semibold">
              SDCI Secretariat HQ
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
              [Office Address Location Detail], Bauchi, Bauchi State, Nigeria.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-0 border-0 shadow-none bg-transparent">
            <ContactForm />
          </Card>
        </div>
      </section>
    </div>
  );
}
