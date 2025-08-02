import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showSticky ? "bg-black/60 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400">BurgerBuddy 🍔</h1>

        <nav className="hidden md:flex gap-6 text-sm font-medium items-center text-white">
          <a href="#menu" className="hover:text-yellow-300 transition">Menu</a>
          <a href="#features" className="hover:text-yellow-300 transition">Features</a>
          <a href="#contact" className="hover:text-yellow-300 transition">Contact</a>

          <button
            onClick={onLoginClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition font-semibold"
          >
            Login
          </button>

          
        </nav>
      </div>
    </header>
  );
};

export default Header;
