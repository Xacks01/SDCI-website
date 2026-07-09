"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Slide {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Independent policy think tank · Bauchi, Nigeria",
    headline: "Evidence, in conversation.",
    body: "We turn rigorous, independent research into open dialogue that shapes better decisions on sustainable development.",
    primaryCtaText: "Explore our research →",
    primaryCtaUrl: "/research",
    secondaryCtaText: "Listen to the podcast",
    secondaryCtaUrl: "/media?tab=podcast",
    bgImage: "/assets/hero-bg-sdci-1.jpeg",
  },
  {
    eyebrow: "Our role · Dialogue Partner",
    headline: "A neutral table for the hard conversations.",
    body: "We bring the private sector and civil society together to debate reforms, weigh the evidence, and build solutions that actually hold.",
    primaryCtaText: "See what's next →",
    primaryCtaUrl: "/events",
    secondaryCtaText: "How we work",
    secondaryCtaUrl: "/about#three-roles",
    bgImage: "/assets/hero-image-2.jpeg",
  },
  {
    eyebrow: "Our role · Watchdog",
    headline: "Accountability, backed by evidence.",
    body: "We track how institutions perform, show where they fall short, and make the case for transparency with data that stands up to scrutiny.",
    primaryCtaText: "Read our findings →",
    primaryCtaUrl: "/research",
    secondaryCtaText: "Our independence",
    secondaryCtaUrl: "/about#independence",
    bgImage: "/assets/hero-bg-sdci-3.jpeg",
  },
  {
    eyebrow: "Our role · Connector",
    headline: "Closing the gap between policy and people.",
    body: "We link policymakers with businesses, communities, and international partners — so reforms are designed with the people they affect, not at them.",
    primaryCtaText: "Partner with us →",
    primaryCtaUrl: "/get-involved#partner",
    secondaryCtaText: "Meet the team",
    secondaryCtaUrl: "/about#leadership",
    bgImage: "/assets/hero-bg-sdci-4.jpeg",
  },
];

export const HeroSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000); // Transition every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-black min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background Images Layer (Crossfading) */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out z-0`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
            opacity: index === currentIdx ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-20 px-6 py-20 flex flex-col justify-center min-h-[420px]">
        {slides.map((slide, index) => {
          const isActive = index === currentIdx;
          return (
            <div
              key={index}
              className={`max-w-3xl space-y-6 text-left transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 relative block"
                  : "opacity-0 -translate-x-4 absolute pointer-events-none hidden"
              }`}
            >
              <p className="text-lime-300 font-semibold text-base sm:text-lg tracking-wide">
                {slide.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
                {slide.headline}
              </h1>
              <p className="text-base sm:text-lg text-neutral-200 max-w-2xl leading-relaxed">
                {slide.body}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={slide.primaryCtaUrl}>
                  <Button variant="secondary" size="lg" className="px-6 font-semibold">
                    {slide.primaryCtaText}
                  </Button>
                </Link>
                <Link href={slide.secondaryCtaUrl}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-petrol-950 font-semibold px-6"
                    size="lg"
                  >
                    {slide.secondaryCtaText}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Dots Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIdx(index)}
            className={`transition-all duration-300 h-2.5 rounded-full cursor-pointer focus:outline-none ${
              index === currentIdx ? "w-6 bg-green-800" : "w-2.5 bg-neutral-400 opacity-60 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
