import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full font-sans">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-petrol-950 dark:text-petrol-100 mb-1.5">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white dark:bg-petrol-900 border border-neutral-300 dark:border-petrol-800 rounded-none text-petrol-950 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-500 ${
            error ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500 focus:ring-red-500/50" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1 text-xs text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full font-sans">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-petrol-950 dark:text-petrol-100 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white dark:bg-petrol-900 border border-neutral-300 dark:border-petrol-800 rounded-none text-petrol-950 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-500 min-h-[120px] ${
            error ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500 focus:ring-red-500/50" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1 text-xs text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
