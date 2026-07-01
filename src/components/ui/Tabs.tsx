import React from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = "",
}) => {
  return (
    <div className={`border-b border-neutral-200 overflow-x-auto ${className}`}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-sans font-medium text-sm transition-all focus:outline-none cursor-pointer ${
                isActive
                  ? "border-green-800 text-green-800 font-semibold"
                  : "border-transparent text-neutral-500 hover:text-petrol-900 hover:border-neutral-300"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
