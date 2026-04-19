import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-energy-yellow flex items-center justify-center shadow-glow" aria-hidden="true">
            <Zap size={18} className="text-black fill-black" aria-hidden="true" />
          </div>
          <span className="font-bold text-xl tracking-tight">PowerSync</span>
        </div>

        <div className="text-foreground-muted text-sm">
          &copy; {new Date().getFullYear()} PowerSync Smart Microgrid System. All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-foreground-muted text-sm">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded"
            aria-label="PowerSync on Twitter"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded"
            aria-label="PowerSync on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
