import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { GetInvolvedClient } from "@/components/shared/GetInvolvedClient";

export const revalidate = 60;

export default async function GetInvolvedPage() {
  const payload = await getPayload({ config });

  // Fetch membership tiers
  const tiersResult = await payload.find({
    collection: "membership-tiers",
    limit: 20,
  }).catch(() => ({ docs: [] }));

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/10 dark:bg-petrol-950/20 min-h-screen">
      {/* Page Header */}
      <section className="bg-petrol-950 text-white py-16 px-6 border-b border-petrol-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 bg-transparent w-fit">
            Join the Community
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Get Involved</h1>
          <p className="text-petrol-100 text-sm md:text-base max-w-xl leading-relaxed">
            SDCI runs on a community of people who believe better decisions come from better evidence, openly discussed.
          </p>
        </div>
      </section>

      {/* Render the Paystack/interactive client page */}
      <GetInvolvedClient
        tiers={tiersResult.docs}
      />
    </div>
  );
}
