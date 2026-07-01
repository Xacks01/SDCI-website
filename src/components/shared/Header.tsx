"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SearchModal } from "./SearchModal";
import { useTheme } from "@/components/shared/ThemeProvider";

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about" },
    { label: "Research & Insights", url: "/research" },
    { label: "Media", url: "/media" },
    { label: "Events", url: "/events" },
    { label: "Programmes", url: "/programmes" },
    { label: "Careers", url: "/careers" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-neutral-100 dark:border-petrol-900 shadow-sm font-sans transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 animate-fade-in">
            <img src="/assets/logo.png" alt="SDCI Logo" className="h-10 w-auto dark:brightness-110" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  key={link.label}
                  href={link.url}
                  className="text-sm font-medium h-16 flex items-center px-1"
                >
                  <span className={`pb-1 border-b-2 transition-all ${
                    isActive
                      ? "text-petrol-950 dark:text-white border-green-700 font-semibold"
                      : "text-neutral-500 dark:text-neutral-400 border-transparent hover:text-petrol-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-petrol-700"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-500 hover:text-petrol-950 dark:text-neutral-400 dark:hover:text-white p-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-700/50 cursor-pointer transition-colors"
              aria-label="Open search"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-neutral-500 hover:text-petrol-950 dark:text-neutral-400 dark:hover:text-white p-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-700/50 cursor-pointer transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>

            {/* Member and Donate Actions */}
            <Link href="/get-involved#membership">
              <Button variant="outline" className="text-xs py-1.5 px-4 font-semibold border-neutral-300 dark:border-petrol-800 text-petrol-950 dark:text-white">
                Become a Member
              </Button>
            </Link>

            <Link href="/get-involved#donate">
              <Button variant="dark-green" className="text-xs py-1.5 px-4 font-semibold">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-500 hover:text-petrol-950 dark:text-neutral-400 dark:hover:text-white p-1"
              aria-label="Search"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-neutral-500 hover:text-petrol-950 dark:text-neutral-400 dark:hover:text-white p-1 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-500 hover:text-petrol-950 dark:text-neutral-400 dark:hover:text-white p-1"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 dark:border-petrol-900 bg-white dark:bg-black px-6 py-6 space-y-6 transition-colors duration-300">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <Link
                    key={link.label}
                    href={link.url}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-semibold transition-colors ${
                      isActive ? "text-green-700 dark:text-green-400 font-bold" : "text-neutral-600 dark:text-neutral-400 hover:text-petrol-950 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-100 dark:border-petrol-900">
              <Link href="/get-involved#membership" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-neutral-300 dark:border-petrol-800 text-petrol-950 dark:text-white">
                  Become a Member
                </Button>
              </Link>
              <Link href="/get-involved#donate" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="dark-green" className="w-full">
                  Donate
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

