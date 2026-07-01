import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark-green" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-semibold rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none whitespace-nowrap";

  const variants = {
    // Primary: Deep Petrol Solid, White text (Passes contrast)
    primary: "bg-petrol-950 text-white hover:bg-petrol-800 active:bg-petrol-900 dark:bg-white dark:text-petrol-950 dark:hover:bg-neutral-200 dark:active:bg-neutral-300",
    
    // Secondary: SDCI Green Solid, Deep Petrol text (Contrast ratio ~5.4:1, Passes AA)
    secondary: "bg-green-500 text-petrol-950 hover:bg-green-400 active:bg-green-600",
    
    // Dark Green: SDCI Forest Green Solid, White text (WCAG AA Compliant)
    "dark-green": "bg-green-700 text-white hover:bg-green-800 active:bg-green-900 dark:bg-green-600 dark:hover:bg-green-500 dark:active:bg-green-700",
    
    // Outline: Deep Petrol Border & Text
    outline:
      "border border-petrol-950 text-petrol-950 hover:bg-petrol-950 hover:text-white active:bg-petrol-900 dark:border-petrol-200 dark:text-petrol-200 dark:hover:bg-petrol-200 dark:hover:text-petrol-950 dark:active:bg-petrol-800",
    
    // Ghost: Muted background transition
    ghost: "text-petrol-950 hover:bg-petrol-100 active:bg-petrol-200 dark:text-petrol-200 dark:hover:bg-petrol-900 dark:active:bg-petrol-800",
    
    // Accent: Deep Petrol background, Bright Lime accents
    accent: "bg-petrol-950 text-lime-300 border border-lime-300 hover:bg-petrol-900 dark:bg-petrol-900 dark:text-lime-300 dark:border-lime-300 dark:hover:bg-petrol-800",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs tracking-wide",
    md: "h-11 px-5 text-sm",
    lg: "h-13 px-7 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
