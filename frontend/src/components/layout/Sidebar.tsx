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

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 space-y-4 fixed">
      <h1 className="text-xl font-bold mb-6">BurgerKing Admin</h1>
      {menuItems.map(({ label, icon: Icon, to }) => (
        <Link
          key={label}
          to={to}
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${
            location.pathname === to ? "bg-gray-800" : ""
          }`}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
