'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from './ui/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-energy-yellow focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:font-bold cursor-pointer"
      >
        Skip to main content
      </a>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
        aria-label="Main navigation"
      >
        <div
          className={`px-6 py-3 rounded-full flex items-center gap-8 max-w-4xl w-full justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-background-opaque backdrop-blur-xl border border-card-border shadow-lg'
              : 'glass'
          }`}
        >
          {/* Brand — Zap icon on mobile, full logo on sm+ */}
          <a href="#main-content" className="flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded-xl">
            <div className="sm:hidden w-8 h-8 rounded-lg bg-energy-yellow flex items-center justify-center shadow-glow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="black" aria-hidden="true"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/></svg>
            </div>
            <div className="hidden sm:flex items-center bg-white rounded-xl px-2 py-1">
              <Image
                src="/images/powersync-logo.png"
                alt="PowerSync — Smart Solar Microgrid Platform, Rwanda"
                width={150}
                height={50}
                className="h-9 w-auto"
                priority
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground-dim">
            <a href="#problem" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer">Problem</a>
            <a href="#solution" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer">Solution</a>
            <a href="#how-it-works" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer">How It Works</a>
            <a href="#value" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer">Value</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold hover:bg-energy-yellow hover:text-black transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
