import type { ReactNode } from "react";
import { AdminSidebar } from "./Sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 font-inter">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-6 text-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
