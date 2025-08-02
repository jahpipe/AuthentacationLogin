import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AdminSidebar } from "./Sidebar";
export function AdminLayout({ children }) {
    return (_jsxs("div", { className: "flex min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 font-inter", children: [_jsx(AdminSidebar, {}), _jsx("main", { className: "flex-1 ml-64 p-6 text-white overflow-y-auto", children: children })] }));
}
