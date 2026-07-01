import React, { useId } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, placeholder, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full font-sans">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-petrol-950 dark:text-petrol-100 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`w-full px-4 py-2.5 bg-white dark:bg-petrol-900 border rounded-none text-petrol-950 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors appearance-none cursor-pointer ${
              error ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500 focus:ring-red-500/50" : "border-neutral-300 dark:border-petrol-800"
            } ${className}`}
            {...props}
          >
            {placeholder && <option value="" className="dark:bg-petrol-900">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-petrol-900">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-petrol-950 dark:text-petrol-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
