import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { getPayload } from "payload";
import config from "@/payload.config";
import { LumaInit } from "@/components/shared/LumaInit";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SDCI - Sustainable Development Conversations Initiative",
  description: "Evidence, in conversation. An independent think tank shaping better decisions on sustainable development in Nigeria and across Africa.",
  icons: {
    icon: [
      { url: "/sdci-favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/sdci-favicon.svg",
    apple: "/sdci-favicon.svg",
  },
};

import { getSafePayload } from "@/lib/payload";

// Check and seed the database on initial start (skip during production build phase)
if (process.env.NEXT_PHASE !== "phase-production-build" && typeof window === "undefined") {
  getSafePayload()
    .then(async (payload) => {
      if (!payload) return;
      const result = await payload.find({
        collection: "membership-tiers",
        limit: 1,
      }).catch(() => null);
      if (result && result.totalDocs === 0) {
        payload.logger?.info("Empty database detected. Triggering auto-seed...");
        const { seed } = await import("@/payload/seed");
        await seed(payload);
      }
    })
    .catch((err) => {
      console.error("Failed database auto-seed connection check:", err);
    });
}

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gkl4jfh.css" />
        <link rel="icon" type="image/svg+xml" href="/sdci-favicon.svg" />
        <link rel="apple-touch-icon" href="/sdci-favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-petrol-50 dark:bg-petrol-950 text-petrol-950 dark:text-neutral-100 font-sans">
        {children}
        <LumaInit />
      </body>
    </html>
  );
}
