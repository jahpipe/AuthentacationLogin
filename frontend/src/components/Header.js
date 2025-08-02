import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
const Header = ({ onLoginClick }) => {
    const [dark, setDark] = useState(true);
    const [showSticky, setShowSticky] = useState(false);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);
    useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * 0.3;
            setShowSticky(window.scrollY > threshold);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsx("header", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${showSticky ? "bg-black/60 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"}`, children: _jsxs("div", { className: "mx-auto max-w-7xl px-6 py-4 flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-yellow-400", children: "BurgerBuddy \uD83C\uDF54" }), _jsxs("nav", { className: "hidden md:flex gap-6 text-sm font-medium items-center text-white", children: [_jsx("a", { href: "#menu", className: "hover:text-yellow-300 transition", children: "Menu" }), _jsx("a", { href: "#features", className: "hover:text-yellow-300 transition", children: "Features" }), _jsx("a", { href: "#contact", className: "hover:text-yellow-300 transition", children: "Contact" }), _jsx("button", { onClick: onLoginClick, className: "bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition font-semibold", children: "Login" })] })] }) }));
};
export default Header;
