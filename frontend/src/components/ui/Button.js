import { jsx as _jsx } from "react/jsx-runtime";
import {} from "react";
import { cn } from "../../lib/utils";
export function Button({ className, ...props }) {
    return (_jsx("button", { className: cn("w-full blue text-black font-semibold py-2 px-4 rounded-xl shadow-sm transition-colors", "hover:bg-gray-100 active:bg-gray-200", "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1", className), ...props }));
}
