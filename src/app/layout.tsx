import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://powersync.rw"),
  icons: {
    icon: "/images/powersync-logo.png",
    apple: "/images/powersync-logo.png",
  },
  title: "PowerSync | Smart Microgrid System for Rwanda",
  description: "Reliable, fuel-free electricity through smart microgrids with seamless digital energy access and intelligent management.",
  openGraph: {
    title: "PowerSync | Smart Microgrid System for Rwanda",
    description: "Reliable, fuel-free electricity through smart microgrids. Pay via mobile money, control energy from your phone.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerSync | Smart Microgrid System",
    description: "Reliable, fuel-free electricity through smart microgrids.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Development notice — remove before production launch */}
        <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full border border-energy-yellow/25 bg-background-opaque backdrop-blur-sm text-energy-yellow text-xs font-semibold pointer-events-none select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-energy-yellow animate-pulse" aria-hidden="true" />
          Prototype · Under Development
        </div>
      </body>
    </html>
  );
}
