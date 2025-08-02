import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "Ignite Your Hunger",
  "Grilled to Perfection",
  "Unleash the Flavor",
];

const images = Array.from({ length: 8 }, (_, i) => `/${i + 1}.jpg`);

const Hero = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // Typewriter
  useEffect(() => {
    const current = phrases[phraseIndex];
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setText("");
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, phraseIndex]);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-center min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-10 px-6 overflow-hidden">
      {/* 🔥 Fire background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#300000] to-[#ff2e00] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 via-transparent to-black opacity-40 z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/fire-texture.webp')] bg-cover bg-center opacity-10 mix-blend-screen z-0" />

      {/* 📝 Typewriter */}
      <div className="relative z-10 text-white max-w-xl text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(255,80,80,0.4)]">
          {text}
          <span className="animate-pulse text-red-500">|</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Crafted over flame, built for bold taste. Discover fire-grilled perfection — only at BurgerBuddy.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-neutral-200 transition"
        >
          Order Now
        </motion.button>
      </div>

      {/* 🍔 Slideshow with gloss and smooth transition */}
      <div className="relative w-[280px] md:w-[350px] h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-2xl z-10 backdrop-blur-lg bg-white/10 border border-white/10">
        {/* Glass reflection */}
        <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-gradient-to-t from-white/10 via-white/5 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.img
            key={images[imageIndex]}
            src={images[imageIndex]}
            alt={`Burger ${imageIndex + 1}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
