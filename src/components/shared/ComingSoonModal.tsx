"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  title = "Coming Soon",
  description = "We are currently setting up this initiative. Please check back soon or sign up for our newsletter to get notified of updates.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-petrol-950 border border-neutral-200 dark:border-petrol-900 max-w-md w-full relative shadow-2xl rounded-none text-petrol-950 dark:text-neutral-250 p-8 space-y-6 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-350 transition-colors z-10 cursor-pointer focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center space-y-4 pt-4">
          <div className="w-16 h-16 mx-auto rounded-none bg-green-50 dark:bg-petrol-900/50 flex items-center justify-center text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold font-serif text-petrol-950 dark:text-white leading-tight">{title}</h3>
          <p className="text-neutral-600 dark:text-neutral-450 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <Button variant="dark-green" className="w-full text-xs uppercase tracking-wider py-3" onClick={onClose}>
            Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
};
