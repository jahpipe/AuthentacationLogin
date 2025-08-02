import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-md p-6 rounded-2xl shadow-lg border border-white/10 bg-white/10 dark:bg-zinc-900/60",
        "backdrop-blur-xl ring-1 ring-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
