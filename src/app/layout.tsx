import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { getPayload } from "payload";
import config from "@/payload.config";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SDCI - Sustainable Development Conversations Initiative",
  description: "Evidence, in conversation. An independent think tank shaping better decisions on sustainable development in Nigeria and across Africa.",
};

// Check and seed the database on initial start (skip during production build phase)
if (process.env.NEXT_PHASE !== "phase-production-build") {
  getPayload({ config })
    .then(async (payload) => {
      const result = await payload.find({
        collection: "membership-tiers",
        limit: 1,
      });
      if (result.totalDocs === 0) {
        payload.logger.info("Empty database detected. Triggering auto-seed...");
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
      className={`${ibmPlexSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gkl4jfh.css" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-petrol-50 dark:bg-petrol-950 text-petrol-950 dark:text-neutral-100 font-sans">
        {children}
      </body>
    </html>
  );
}
