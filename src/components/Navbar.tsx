'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
    >
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 max-w-4xl w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-energy-yellow flex items-center justify-center shadow-glow">
            <Zap size={18} className="text-black fill-black" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">PowerSync</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-white/70">
          <a href="#problem" className="hover:text-energy-yellow transition-colors">Problem</a>
          <a href="#solution" className="hover:text-energy-yellow transition-colors">Solution</a>
          <a href="#value" className="hover:text-energy-yellow transition-colors">Value</a>
        </div>
        
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-energy-yellow transition-all hover:shadow-glow">
          Contact Us
        </button>
      </div>
    </motion.nav>
  );
}
