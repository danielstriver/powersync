import { ShieldCheck, Smartphone, Cpu, LayoutGrid, Sun, type LucideIcon } from 'lucide-react';
import { AnimatedReveal } from './ui/AnimatedReveal';

const solutions: {
  Icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
  className: string;
}[] = [
  {
    Icon: Sun,
    iconClassName: "text-energy-yellow",
    title: "Decentralized Infrastructure",
    description: "Solar-powered microgrids with battery storage. Operates independently of the national grid, ensuring continuous power during outages.",
    className: "md:col-span-2 min-h-[220px] bg-energy-yellow/5 border-energy-yellow/20"
  },
  {
    Icon: Smartphone,
    iconClassName: "text-energy-blue",
    title: "Seamless Digital Access",
    description: "Purchase electricity instantly via mobile money. No manual token entry, automatic power activation.",
    className: "md:col-span-1 min-h-[240px] bg-energy-blue/5 border-energy-blue/20"
  },
  {
    Icon: Cpu,
    iconClassName: "text-foreground",
    title: "Smart Energy Control",
    description: "IoT-based smart meters track consumption in real time and manage power based on balance.",
    className: "md:col-span-1 min-h-[240px] bg-card-bg border-card-border"
  },
  {
    Icon: LayoutGrid,
    iconClassName: "text-energy-yellow",
    title: "Intelligent Management",
    description: "Centralized control platform balances energy across users and prioritizes critical loads.",
    className: "md:col-span-2 min-h-[220px] bg-energy-yellow/5 border-energy-yellow/20"
  }
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 px-4 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedReveal className="flex items-center justify-center gap-2 text-energy-yellow font-bold mb-4 uppercase tracking-widest text-sm">
            <ShieldCheck size={16} aria-hidden="true" />
            The Solution
          </AnimatedReveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Our Smart Microgrid System</h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            PowerSync is an integrated, decentralized energy platform that combines renewable microgrid infrastructure with digital payment and smart control systems.
          </p>
        </div>

        {/*
          2-column grid: featured cards span both columns (full-width rows),
          Seamless Digital Access and Smart Energy Control sit side-by-side in row 2.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map(({ Icon, iconClassName, title, description, className }, idx) => (
            <AnimatedReveal
              key={title}
              delay={idx * 0.1}
              variant="scale"
              className={`p-8 rounded-3xl border flex flex-col justify-between group transition-all hover:brightness-110 ${className}`}
            >
              <div>
                <div className="mb-6 p-3 rounded-2xl bg-foreground/10 inline-block">
                  <Icon size={24} className={iconClassName} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-foreground-muted leading-relaxed">{description}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-energy-yellow/20 rounded-full blur-[120px] will-change-transform" />
      </div>
    </section>
  );
}
