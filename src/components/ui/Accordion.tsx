"use client";

import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-4 font-sans ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="border border-neutral-200 dark:border-petrol-900 rounded-none bg-white dark:bg-petrol-950/60 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-petrol-950 dark:text-neutral-200 hover:bg-petrol-50/50 dark:hover:bg-petrol-900/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="ml-6 flex-shrink-0 text-neutral-400 dark:text-neutral-400">
                <svg
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-[1000px] border-t border-neutral-100 dark:border-petrol-900" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="px-6 py-4 text-neutral-800 dark:text-neutral-300 leading-relaxed text-base">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
