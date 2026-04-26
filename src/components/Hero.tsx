'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4 radial-gradient-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-energy-yellow text-sm font-semibold tracking-wide border border-energy-yellow/20"
        >
          <Zap size={14} className="fill-energy-yellow" aria-hidden="true" />
          The Future of Energy in Rwanda
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
          <span className="hero-gradient-text">PowerSync Smart</span>
          <br className="hidden md:block" />
          <span className="text-energy-yellow">Microgrid System</span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
          Reliable, fuel-free electricity through smart microgrids, allowing users to pay and control energy instantly from their phones.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-energy-yellow text-black px-8 py-4 rounded-2xl text-lg font-black flex items-center gap-2 shadow-glow hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
          >
            Get Reliable Energy <ArrowRight size={20} aria-hidden="true" />
          </motion.a>

          <motion.a
            href="/simulate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass border border-energy-yellow/30 px-8 py-4 rounded-2xl text-lg font-bold text-energy-yellow hover:bg-energy-yellow/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer flex items-center gap-2"
          >
            <Zap size={18} className="fill-energy-yellow" aria-hidden="true" />
            Try the Simulation
          </motion.a>

          <a
            href="#problem"
            className="glass px-8 py-4 rounded-2xl text-lg font-bold text-foreground-dim hover:bg-foreground/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer"
          >
            See Rwanda&apos;s Solution
          </a>
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-energy-yellow/10 rounded-full blur-[120px] blur-orb" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-energy-blue/10 rounded-full blur-[150px] blur-orb" />
      </div>
    </section>
  );
}
