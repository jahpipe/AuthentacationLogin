import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, ListOrdered, Users, Utensils } from "lucide-react";
const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admindashboard" },
    { label: "Orders", icon: ListOrdered, to: "/admindashboard/orders" },
    { label: "Users", icon: Users, to: "/admindashboard/users" },
    { label: "Menu", icon: Utensils, to: "/admindashboard/menu" },
    { label: "Logout", icon: LogOut, to: "/logout" },
];
export function Sidebar() {
    const location = useLocation();
    return (_jsxs("aside", { className: "h-screen w-64 bg-gray-900 text-white p-4 space-y-4 fixed", children: [_jsx("h1", { className: "text-xl font-bold mb-6", children: "BurgerKing Admin" }), menuItems.map(({ label, icon: Icon, to }) => (_jsxs(Link, { to: to, className: `flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${location.pathname === to ? "bg-gray-800" : ""}`, children: [_jsx(Icon, { className: "w-5 h-5" }), _jsx("span", { children: label })] }, label)))] }));
}
