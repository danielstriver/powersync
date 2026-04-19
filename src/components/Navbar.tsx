'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

export default function Navbar() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-energy-yellow focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:font-bold"
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
        <div className="glass px-6 py-3 rounded-full flex items-center gap-8 max-w-4xl w-full justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-energy-yellow flex items-center justify-center shadow-glow" aria-hidden="true">
              <Zap size={18} className="text-black fill-black" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">PowerSync</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground-dim">
            <a href="#problem" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded">Problem</a>
            <a href="#solution" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded">Solution</a>
            <a href="#how-it-works" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded">How It Works</a>
            <a href="#value" className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded">Value</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold hover:bg-energy-yellow hover:text-black transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
