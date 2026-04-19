import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center">
          <div className="bg-white rounded-xl px-3 py-2">
            <Image
              src="/images/powersync-logo.png"
              alt="PowerSync — Smart Solar Microgrid Platform, Rwanda"
              width={160}
              height={54}
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="text-foreground-muted text-sm">
          &copy; {new Date().getFullYear()} PowerSync Smart Microgrid System. All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-foreground-muted text-sm">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer"
            aria-label="PowerSync on Twitter"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer"
            aria-label="PowerSync on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow rounded cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
