'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Fuel, Smartphone, Cpu, Scaling } from 'lucide-react';

const values = [
  { icon: <Zap />, title: "Reliable Electricity", text: "Without outages" },
  { icon: <Fuel />, title: "Zero Fuel Dependency", text: "100% renewable" },
  { icon: <Smartphone />, title: "Accessible Payments", text: "Via mobile money" },
  { icon: <Cpu />, title: "Smart Management", text: "Automated efficiency" },
  { icon: <Scaling />, title: "Scalable Solution", text: "For communities" }
];

export default function ValueProposition() {
  return (
    <section id="value" className="py-24 px-4 bg-white/[0.01] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-white/40 font-bold mb-4 uppercase tracking-widest text-sm"
          >
            <CheckCircle2 size={16} />
            Why Choose Us
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Unmatched Value</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            PowerSync delivers a modern, reliable, and sustainable energy future for Rwanda.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-6 rounded-full glass border border-white/5 text-energy-yellow group-hover:bg-energy-yellow group-hover:text-black transition-all group-hover:shadow-glow duration-500">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className="text-white/40 text-sm">{val.text}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[40px] glass-dark text-center border border-white/5"
        >
          <h3 className="text-3xl md:text-4xl font-black mb-8 italic">
            &quot;Buy electricity once—power is delivered instantly.&quot;
          </h3>
          <p className="text-white/60 max-w-3xl mx-auto mb-10 text-lg">
            Join the energy revolution in Rwanda. Reliable power is no longer a luxury, but a standard.
          </p>
          <button className="bg-white text-black px-10 py-5 rounded-full text-xl font-black hover:bg-energy-yellow transition-all hover:shadow-glow">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
