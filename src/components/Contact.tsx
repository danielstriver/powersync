'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;
    const subject = encodeURIComponent(`PowerSync Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:danielhustler.hacker@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 px-4 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-energy-yellow font-bold mb-4 uppercase tracking-widest text-sm"
          >
            Get In Touch
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Bring PowerSync to Your Community</h2>
          <p className="text-foreground-muted text-lg">
            Whether you represent a community, a business, or an organization — we want to hear from you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-[32px] p-8 md:p-12"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <CheckCircle2 size={48} className="text-energy-yellow" aria-hidden="true" />
              <h3 className="text-2xl font-bold">Message sent!</h3>
              <p className="text-foreground-muted">We&apos;ll be in touch within 2 business days.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-foreground-muted hover:text-foreground underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-semibold text-foreground-dim">
                    Your Name <span className="text-energy-yellow" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Marie Uwimana"
                    className="bg-input-bg border border-input-border rounded-xl px-4 py-3 text-foreground placeholder:text-input-placeholder focus:outline-none focus:border-energy-yellow/60 focus:ring-1 focus:ring-energy-yellow/60 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-semibold text-foreground-dim">
                    Email Address <span className="text-energy-yellow" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="marie@example.rw"
                    className="bg-input-bg border border-input-border rounded-xl px-4 py-3 text-foreground placeholder:text-input-placeholder focus:outline-none focus:border-energy-yellow/60 focus:ring-1 focus:ring-energy-yellow/60 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-semibold text-foreground-dim">
                  Message <span className="text-energy-yellow" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your community, your energy needs, or how you'd like to partner with us..."
                  className="bg-input-bg border border-input-border rounded-xl px-4 py-3 text-foreground placeholder:text-input-placeholder focus:outline-none focus:border-energy-yellow/60 focus:ring-1 focus:ring-energy-yellow/60 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-end flex items-center gap-2 bg-energy-yellow text-black px-8 py-4 rounded-full font-black hover:brightness-110 transition-all shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
              >
                Send Message <Send size={18} aria-hidden="true" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
