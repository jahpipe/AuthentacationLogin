import { Sidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-6">
        <Outlet />
      </main>
    </div>
  );
}
