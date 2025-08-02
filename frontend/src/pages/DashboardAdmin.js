import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AdminLayout } from "@/components/AdminLayout";
const DashboardAdmin = () => {
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-3xl font-bold text-zinc-900 dark:text-white mb-4", children: "\uD83D\uDC51 Admin Dashboard" }), _jsx("p", { className: "text-zinc-600 dark:text-zinc-400", children: "Welcome to BurgerBuddy Admin Panel! Use the sidebar to manage your system." })] }) }));
};
export default DashboardAdmin;
