import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DataToolsPage() {
  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/20 dark:bg-petrol-950/20 min-h-screen flex flex-col justify-center">
      <section className="max-w-xl mx-auto px-6 py-20 text-center space-y-6">
        <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mx-auto">
          Repository Extension
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-petrol-950 dark:text-white">
          Data & Tools
        </h1>
        <div className="w-12 h-1 bg-green-800 dark:bg-green-600 mx-auto" />
        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          We are building interactive database tools, budget visualizers, and state MDA mapping directories to make public data accessible for researchers and journalists.
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-400">
          Expected launch: Late 2026.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="#footer">
            <Button variant="primary">Notify Me on Launch</Button>
          </Link>
          <Link href="/research">
            <Button variant="outline">Browse Research Briefs</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
