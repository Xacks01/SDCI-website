import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "petrol" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "rounded-none overflow-hidden transition-all duration-300";

  const variants = {
    default: "bg-white dark:bg-petrol-950/60 dark:border-petrol-900 shadow-sm border border-neutral-200 text-petrol-950 dark:text-neutral-200",
    bordered: "bg-transparent border-2 border-petrol-900/10 dark:border-petrol-500/10 text-petrol-950 dark:text-neutral-200",
    petrol: "bg-petrol-950 dark:bg-petrol-950/90 text-white border border-petrol-800 dark:border-petrol-900",
    interactive:
      "bg-white dark:bg-petrol-950/60 dark:border-petrol-900 shadow-sm border border-neutral-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/25 hover:-translate-y-1 hover:border-green-500/50 dark:hover:border-green-500/50 cursor-pointer text-petrol-950 dark:text-neutral-200",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
