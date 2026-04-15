import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-energy-yellow flex items-center justify-center shadow-glow">
            <Zap size={18} className="text-black fill-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">PowerSync</span>
        </div>
        
        <div className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} PowerSync Smart Microgrid System. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 text-white/40 text-sm">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
