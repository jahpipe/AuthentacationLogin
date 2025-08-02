import { AdminLayout } from "@/components/AdminLayout";

const DashboardAdmin = () => {
  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">👑 Admin Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Welcome to BurgerBuddy Admin Panel! Use the sidebar to manage your system.
        </p>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
