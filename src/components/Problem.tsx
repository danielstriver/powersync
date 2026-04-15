'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ZapOff, Fuel, Smartphone, TrendingDown } from 'lucide-react';

const problems = [
  {
    icon: <ZapOff className="text-orange-500" />,
    title: "Frequent Outages",
    description: "Power outages disrupt homes and small businesses, especially when electricity is prioritized for critical sectors like hospitals."
  },
  {
    icon: <Fuel className="text-orange-500" />,
    title: "Fuel Dependency",
    description: "Heavy reliance on fuel-based generators makes backup power expensive and vulnerable to price shocks and shortages."
  },
  {
    icon: <Smartphone className="text-orange-500" />,
    title: "Outdated Prepaid Systems",
    description: "Existing prepaid electricity systems are inconvenient, requiring manual token entry and offering limited real-time control."
  },
  {
    icon: <TrendingDown className="text-orange-500" />,
    title: "Inflexible Access",
    description: "Many users, particularly in underserved areas, lack flexible pay-as-you-go energy access that matches their daily income patterns."
  }
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-4 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-orange-500 font-bold mb-4 uppercase tracking-widest text-sm"
          >
            <AlertCircle size={16} />
            The Problem
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Rwanda&apos;s Energy Challenges</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Small businesses lose income, households experience instability, and economic growth is slowed by unreliable and inefficient energy access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/30 transition-all hover:bg-white/[0.04] group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-orange-500/10 inline-block group-hover:bg-orange-500/20 transition-all">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{problem.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
