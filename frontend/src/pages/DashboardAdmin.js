import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
export default function DashboardAdmin() {
    return (_jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsx("main", { className: "ml-64 w-full p-6", children: _jsx(Outlet, {}) })] }));
}
