import {
  LogOut,
  Settings,
  ShoppingCart,
  User,
  LayoutDashboard,
  Package,
  Heart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Users", path: "/admin/users", icon: <User size={18} /> },
  { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
  { name: "Favorites", path: "/admin/favorites", icon: <Heart size={18} /> },
  { name: "Profile", path: "/admin/profile", icon: <User size={18} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
];

export function AdminSidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 z-50 p-6 flex flex-col text-white 
      border-r border-white/10 bg-zinc-900/30 backdrop-blur-lg shadow-2xl 
      rounded-tr-2xl rounded-br-2xl space-y-8 font-inter">

      <h1 className="text-2xl font-extrabold tracking-wide text-orange-400">
        🍔 BurgerBuddy
        <span className="block text-sm font-normal text-zinc-400">Admin Panel</span>
      </h1>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition duration-200
              ${
                isActive
                  ? "bg-orange-500/20 text-orange-300"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <button
          onClick={() => console.log("Logout")}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-white/5 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
