import { AlertCircle, ZapOff, Fuel, Smartphone, TrendingDown, ExternalLink, type LucideIcon } from 'lucide-react';
import { AnimatedReveal } from './ui/AnimatedReveal';

const problems: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: ZapOff,
    title: "Frequent Outages",
    description: "Power outages disrupt homes and small businesses, especially when electricity is prioritized for critical sectors like hospitals."
  },
  {
    Icon: Fuel,
    title: "Fuel Dependency",
    description: "Heavy reliance on fuel-based generators makes backup power expensive and vulnerable to price shocks and shortages."
  },
  {
    Icon: Smartphone,
    title: "Outdated Prepaid Systems",
    description: "Existing prepaid electricity systems are inconvenient, requiring manual token entry and offering limited real-time control."
  },
  {
    Icon: TrendingDown,
    title: "Inflexible Access",
    description: "Many users, particularly in underserved areas, lack flexible pay-as-you-go energy access that matches their daily income patterns."
  }
];

const stats: { value: string; label: string; source: string }[] = [
  { value: "37×", label: "average annual power interruptions per consumer", source: "RURA, 2020" },
  { value: "17.2 hrs", label: "of unplanned downtime per consumer per year", source: "RURA, 2020" },
  { value: "25%", label: "of Rwandan households still without electricity", source: "World Bank, 2024" },
  { value: "1–6%", label: "of GDP lost annually to outages across Sub-Saharan Africa", source: "World Bank" },
];

const sources: { label: string; href: string }[] = [
  {
    label: "World Bank — Rwanda Electricity Access Report",
    href: "https://www.worldbank.org/en/news/feature/2024/04/10/ingredients-for-accelerating-universal-electricity-access-lessons-from-afe-rwanda-inspirational-approach"
  },
  {
    label: "RURA — Rwanda Electricity Statistics",
    href: "https://www.rura.rw/index.php?id=71"
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-4 bg-background relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedReveal className="flex items-center justify-center gap-2 text-orange-500 font-bold mb-4 uppercase tracking-widest text-sm">
            <AlertCircle size={16} aria-hidden="true" />
            The Problem
          </AnimatedReveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Rwanda&apos;s Energy Challenges</h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Small businesses lose income, households experience instability, and economic growth is slowed by unreliable and inefficient energy access.
          </p>
        </div>

        {/* Data strip — real statistics from RURA & World Bank */}
        <AnimatedReveal delay={0.1} className="mb-12">
          <div className="rounded-3xl bg-orange-500/5 border border-orange-500/15 p-6 md:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map(({ value, label, source }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-black text-orange-500 leading-none">{value}</span>
                  <span className="text-foreground text-sm font-semibold leading-snug mt-1">{label}</span>
                  <span className="text-foreground-muted text-xs">{source}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-orange-500/10 pt-5">
              <span className="text-foreground-muted text-xs font-semibold uppercase tracking-wider">Sources:</span>
              {sources.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-orange-500/80 hover:text-orange-500 underline underline-offset-2 transition-colors"
                >
                  {label}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map(({ Icon, title, description }, idx) => (
            <AnimatedReveal
              key={title}
              delay={idx * 0.1}
              className="p-8 rounded-3xl bg-card-bg border border-card-border hover:border-orange-500/30 transition-all hover:bg-orange-500/[0.03] group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-orange-500/10 inline-block group-hover:bg-orange-500/20 transition-all">
                <Icon size={24} className="text-orange-500" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-foreground-muted leading-relaxed">{description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
