import { jsx as _jsx } from "react/jsx-runtime";
import {} from "react";
import { cn } from "../../lib/utils";
export function Card({ children, className }) {
    return (_jsx("div", { className: cn("w-full max-w-md p-6 rounded-2xl shadow-lg border border-white/10 bg-white/10 dark:bg-zinc-900/60", "backdrop-blur-xl ring-1 ring-white/10", className), children: children }));
}
