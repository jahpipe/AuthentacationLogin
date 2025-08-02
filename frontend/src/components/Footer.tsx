import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950/80 backdrop-blur-md text-zinc-400 px-6 py-16 mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">BurgerBuddy 🍔</h2>
          <p className="text-sm leading-relaxed">
            Serving up sizzling flavor with every bite. Taste the passion, enjoy the vibe.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4 items-center text-white">
            <a href="#" className="hover:text-yellow-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} BurgerBuddy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
