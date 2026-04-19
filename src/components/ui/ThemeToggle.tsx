'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const resolved = stored ?? preferred;
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 flex items-center justify-center rounded-full glass border border-card-border text-foreground-dim hover:text-energy-yellow hover:border-energy-yellow/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow"
    >
      {theme === 'dark'
        ? <Sun size={16} aria-hidden="true" />
        : <Moon size={16} aria-hidden="true" />
      }
    </button>
  );
}
