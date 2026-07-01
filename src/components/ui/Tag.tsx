import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "petrol" | "green" | "lime" | "gray" | "outline";
}

export const Tag: React.FC<TagProps> = ({
  variant = "gray",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-semibold font-sans tracking-wide uppercase";

  const variants = {
    // Deep Petrol background, white text
    petrol: "bg-petrol-950 text-white dark:bg-petrol-900/60 dark:text-neutral-200",
    
    // SDCI Green background, deep petrol text
    green: "bg-green-500 text-petrol-950 dark:bg-green-600 dark:text-white",
    
    // Bright Lime background, deep petrol text
    lime: "bg-lime-300 text-petrol-950 dark:bg-lime-400 dark:text-petrol-950",
    
    // Neutral Gray background, dark text
    gray: "bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-petrol-900/40 dark:border-petrol-800 dark:text-neutral-300",
    
    // Outline: Transparent bg, petrol border & text
    outline: "border border-petrol-950 text-petrol-950 dark:border-petrol-300 dark:text-petrol-300",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
