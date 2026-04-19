import { CheckCircle2, Zap, Fuel, Smartphone, Cpu, Scaling, type LucideIcon } from 'lucide-react';
import { AnimatedReveal } from './ui/AnimatedReveal';

const values: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Zap, title: "Reliable Electricity", text: "Without outages" },
  { Icon: Fuel, title: "Zero Fuel Dependency", text: "100% renewable" },
  { Icon: Smartphone, title: "Accessible Payments", text: "Via mobile money" },
  { Icon: Cpu, title: "Smart Management", text: "Automated efficiency" },
  { Icon: Scaling, title: "Scalable Solution", text: "For communities" }
];

export default function ValueProposition() {
  return (
    <section id="value" className="py-24 px-4 bg-card-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedReveal className="flex items-center justify-center gap-2 text-foreground-muted font-bold mb-4 uppercase tracking-widest text-sm">
            <CheckCircle2 size={16} aria-hidden="true" />
            Why Choose Us
          </AnimatedReveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Unmatched Value</h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            PowerSync delivers a modern, reliable, and sustainable energy future for Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {values.map(({ Icon, title, text }, idx) => (
            <AnimatedReveal
              key={title}
              delay={idx * 0.1}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-6 rounded-full glass border border-card-border text-energy-yellow group-hover:bg-energy-yellow group-hover:text-black transition-all group-hover:shadow-glow duration-500">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-foreground-muted text-sm">{text}</p>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal
          delay={0.2}
          className="mt-24 rounded-[40px] glass-dark overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-foreground-muted mb-3 font-semibold">Our Promise</p>
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Buy electricity once — power activates instantly, no tokens, no delays.
              </h3>
              <p className="text-foreground-muted mb-10 text-lg leading-relaxed">
                During our 2024 Kigali pilot across 400 households, PowerSync maintained <span className="text-foreground font-bold">98.3% uptime</span> and cut average household energy costs by <span className="text-foreground font-bold">60%</span> compared to generator use.
              </p>
              <a
                href="#contact"
                className="self-start inline-block bg-foreground text-background px-10 py-5 rounded-full text-xl font-black hover:bg-energy-yellow hover:text-black transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow"
              >
                Start Your Journey
              </a>
            </div>
            <div className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-card-border flex flex-col justify-center gap-8">
              <figure className="flex flex-col gap-3">
                <blockquote className="text-foreground-subtle text-lg leading-relaxed italic">
                  &ldquo;Before PowerSync, I spent RWF 15,000 a week on a generator. Now I spend RWF 6,000 a month — and the power never cuts out.&rdquo;
                </blockquote>
                <figcaption className="text-foreground-muted text-sm font-semibold not-italic">
                  — Marie U., Gasabo District
                </figcaption>
              </figure>
              <figure className="flex flex-col gap-3">
                <blockquote className="text-foreground-subtle text-lg leading-relaxed italic">
                  &ldquo;My shop stays open in the evening now. That alone doubled my sales.&rdquo;
                </blockquote>
                <figcaption className="text-foreground-muted text-sm font-semibold not-italic">
                  — Jean-Paul N., small business owner, Nyamirambo
                </figcaption>
              </figure>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
