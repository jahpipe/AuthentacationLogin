import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, value, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value !== "" && value !== undefined;

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              "absolute left-3 top-2 text-sm text-black transition-all pointer-events-none bg-white",
              (focused || hasValue) && "-top-2.5 text-xs px-1 rounded bg-white"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          value={value}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full rounded-md border border-gray-300 bg-white",
            "px-3 pt-5 pb-2 text-sm text-black placeholder-black",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
