'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, Cpu, LayoutGrid, Sun, BarChart3 } from 'lucide-react';

const solutions = [
  {
    icon: <Sun className="text-energy-yellow" />,
    title: "Decentralized Infrastructure",
    description: "Solar-powered microgrids with battery storage. Operates independently of the national grid, ensuring continuous power during outages.",
    className: "md:col-span-2 md:row-span-2 bg-energy-yellow/5 border-energy-yellow/20"
  },
  {
    icon: <Smartphone className="text-energy-blue" />,
    title: "Seamless Digital Access",
    description: "Purchase electricity instantly via mobile money. No manual token entry, automatic power activation.",
    className: "md:col-span-1 md:row-span-1 bg-energy-blue/5 border-energy-blue/20"
  },
  {
    icon: <Cpu className="text-white" />,
    title: "Smart Energy Control",
    description: "IoT-based smart meters track consumption in real time and manage power based on balance.",
    className: "md:col-span-1 md:row-span-2 bg-white/5 border-white/20"
  },
  {
    icon: <LayoutGrid className="text-energy-yellow" />,
    title: "Intelligent Management",
    description: "Centralized control platform balances energy across users and prioritizes critical loads.",
    className: "md:col-span-1 md:row-span-1 bg-energy-yellow/5 border-energy-yellow/20"
  }
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-energy-yellow font-bold mb-4 uppercase tracking-widest text-sm"
          >
            <ShieldCheck size={16} />
            The Solution
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Our Smart Microgrid System</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            PowerSync is an integrated, decentralized energy platform that combines renewable microgrid infrastructure with digital payment and smart control systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between group transition-all hover:brightness-110 ${sol.className}`}
            >
              <div>
                <div className="mb-6 p-3 rounded-2xl bg-white/10 inline-block">
                  {sol.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {sol.description}
                </p>
              </div>
              <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <BarChart3 size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-energy-yellow/20 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
