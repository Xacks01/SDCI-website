"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { newsletterSignupAction } from "@/app/actions";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
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
      setMessage(res.message || "Subscribed!");
      setEmail("");
    } else {
      setIsSuccess(false);
      setMessage(res.error || "Failed.");
    }
  };

  const footerCols = [
    {
      title: "About",
      links: [
        { label: "Mission & Vision", url: "/about#mission" },
        { label: "The Three Roles", url: "/about#three-roles" },
        { label: "Leadership Team", url: "/about#leadership" },
        { label: "Independence & Funding", url: "/about#independence" },
        { label: "Annual Reports", url: "/about#annual-reports" },
        { label: "Contact Us", url: "/contact" },
      ],
    },
    {
      title: "Insights",
      links: [
        { label: "Policy Briefs", url: "/research?format=brief" },
        { label: "Thematic Reports", url: "/research?format=report" },
        { label: "Working Papers", url: "/research?format=working-paper" },
        { label: "White Papers", url: "/research?format=white-paper" },
        { label: "InFocus Infographics", url: "/research#infocus" },
        { label: "The Sustainable Digest", url: "/research#digest" },
      ],
    },
    {
      title: "Media",
      links: [
        { label: "The Next Question", url: "/media?tab=podcast" },
        { label: "Documentaries", url: "/media?tab=docs" },
        { label: "Recorded Conversations", url: "/media?tab=conversations" },
      ],
    },
    {
      title: "Engage",
      links: [
        { label: "Events", url: "/events" },
        { label: "Membership Options", url: "/get-involved#membership" },
        { label: "Partner with Us", url: "/get-involved#partner" },
        { label: "Donate", url: "/get-involved#donate" },
      ],
    },
  ];

  return (
    <footer id="footer" className="bg-petrol-950 text-white pt-16 pb-10 px-6 border-t border-petrol-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="pb-8 border-b border-petrol-900/60">
          <Link href="/" className="inline-block">
            <img src="/assets/SDCI-wht.png" alt="SDCI Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Columns */}
          {footerCols.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-sm font-bold text-lime-300 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url}
                      className="text-sm text-petrol-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Form */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="text-sm font-bold text-lime-300 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-petrol-100 leading-relaxed">
              Get our briefings and new episodes in your inbox. No spam, unsubscribe anytime.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-petrol-900 border border-petrol-800 text-white placeholder-petrol-400 text-xs focus:outline-none focus:ring-1 focus:ring-green-800"
              />
              <Button type="submit" variant="secondary" size="sm" className="text-xs w-full" loading={loading}>
                Subscribe
              </Button>
            </form>
            {message && (
              <p className={`text-sm font-semibold ${isSuccess ? "text-lime-300" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-petrol-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-petrol-200">
          <div className="text-center md:text-left space-y-2">
            <p className="leading-relaxed text-sm text-petrol-200">
              &copy; {new Date().getFullYear()} Sustainable Development Conversations Initiative (SDCI). RC: 9557019. Bauchi, Nigeria.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 text-xs text-petrol-300">
              <Link href="/terms" className="hover:text-lime-300 transition-colors">Terms & Conditions</Link>
              <span>&middot;</span>
              <Link href="/privacy" className="hover:text-lime-300 transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex space-x-5 items-center">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.002 3.002 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C9.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-petrol-300 hover:text-lime-300 transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.88-.52-4.09-1.32-.23-.15-.45-.32-.67-.51v7.22c.04 3.15-1.76 6.22-4.78 7.23-3.13 1.11-6.84-.27-8.29-3.23-1.57-3.11-.27-7.27 2.87-8.67 1.71-.78 3.73-.78 5.48-.03V.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
