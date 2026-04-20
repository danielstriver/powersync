'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from './ui/ThemeToggle';

const NAV_LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#value', label: 'Value' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const pillClass = `px-6 py-3 rounded-full flex items-center gap-8 max-w-4xl w-full justify-between transition-all duration-300 ${
    scrolled || menuOpen
      ? 'bg-background-opaque backdrop-blur-xl border border-card-border shadow-lg'
      : 'glass'
  }`;

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
        {/* Wrapper keeps pill + dropdown together */}
        <div className="max-w-4xl w-full flex flex-col">
          {/* Top bar */}
          <div className={pillClass}>
            {/* Brand */}
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

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground-dim">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer">{label}</a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full border border-card-border bg-card-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? 'opacity-0' : 'translate-y-0.5'}`} />
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </button>
              <a
                href="#contact"
                onClick={closeMenu}
                className="hidden md:inline-flex bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold hover:bg-energy-yellow hover:text-black transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="md:hidden mt-2 rounded-2xl bg-background-opaque backdrop-blur-xl border border-card-border shadow-lg px-6 py-4 flex flex-col gap-4"
              >
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="text-base font-medium text-foreground-dim hover:text-energy-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-1 bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold text-center hover:bg-energy-yellow hover:text-black transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow cursor-pointer"
                >
                  Contact Us
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
