import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { LoginPage } from "./pages/LoginPage"; 

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative font-sans text-gray-800 bg-gradient-to-br from-yellow-100 via-orange-50 to-white dark:from-zinc-900 dark:to-zinc-800 overflow-hidden">
      {/* Background circles or blur effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-300 opacity-30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-yellow-200 opacity-10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main content */}
      <div className="relative z-10">
        <Header onLoginClick={() => setShowLogin(true)} />
        <Hero />
        <Features />
        <Menu />
        <Footer />

        {/* LoginForm as floating modal */}
        <AnimatePresence>
          {showLogin && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)} // click outside to close
            >
              <motion.div
                className="relative w-full max-w-md"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onClick={(e) => e.stopPropagation()} // prevent close on inner click
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition"
                  aria-label="Close Login"
                >
                  <X size={20} />
                </button>

                {/* Real login form used as modal */}
                <LoginPage />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
