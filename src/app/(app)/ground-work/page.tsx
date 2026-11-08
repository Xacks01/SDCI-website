import type { Metadata } from "next";
import { GroundWorkSignup } from "@/components/shared/GroundWorkSignup";

export const metadata: Metadata = {
  title: "Ground Work | SDCI",
  description: "Research updates, policy advocacy news, briefs, advisory notes and new publication alerts from SDCI. Subscribe to Ground Work.",
};

const updates = [
  ["Research updates", "Follow the questions we’re investigating and the evidence emerging from our work."],
  ["Policy advocacy news", "Stay informed about SDCI’s efforts to bring evidence into public debate and policy decisions."],
  ["Briefs & advisory notes", "Get focused analysis that puts policy challenges in context and helps inform your next steps."],
  ["New publication alerts", "Know when our latest research is available, with a direct route to read it."],
];

export default function GroundWorkPage() {
  return (
    <div className="bg-white dark:bg-petrol-950 text-petrol-950 dark:text-white">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-800 dark:text-green-400">The SDCI newsletter</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">Ground Work</h1>
          <p className="text-2xl md:text-3xl font-serif leading-snug">Stay close to the evidence.<br />See what comes next.</p>
          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-xl">Good decisions begin with understanding. Ground Work brings SDCI’s research, policy advocacy and practical analysis into your inbox—connecting the questions we ask with the decisions that shape our communities.</p>
          <a href="#subscribe" className="inline-block bg-green-800 hover:bg-green-900 text-white px-6 py-3 text-sm font-bold">Subscribe to Ground Work &darr;</a>
        </div>
        <img src="/assets/gwork-hero.webp" alt="Ground Work logo on a textured black background" width={1400} height={1400} className="w-full h-auto" />
      </section>
      <section className="border-y border-neutral-200 dark:border-petrol-800 bg-neutral-50 dark:bg-petrol-900/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div><p className="text-xs uppercase tracking-widest text-green-800 dark:text-green-400 font-bold mb-4">Inside Ground Work</p><h2 className="text-3xl font-serif font-bold">The work behind<br />the conversation.</h2></div>
          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-10">{updates.map(([title, description], index) => <div key={title} className="border-t border-neutral-300 dark:border-petrol-700 pt-5"><span className="text-xs text-green-800 dark:text-green-400 font-bold">0{index + 1}</span><dt className="font-serif text-xl font-bold mt-3 mb-2">{title}</dt><dd className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{description}</dd></div>)}</dl>
        </div>
      </section>
      <section id="subscribe" className="scroll-mt-24 max-w-3xl mx-auto px-6 py-20 md:py-24 space-y-6">
        <p className="text-xs uppercase tracking-widest font-bold text-green-800 dark:text-green-400">Keep informed</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold">Make room for a more informed perspective.</h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">For researchers, policymakers, practitioners and curious citizens. Subscribe for research updates, advocacy news, briefs and advisory notes, and alerts when new publications are released.</p>
        <GroundWorkSignup />
      </section>
    </div>
  );
}
