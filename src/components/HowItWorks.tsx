import { Smartphone, Zap, BarChart3, type LucideIcon } from 'lucide-react';
import { AnimatedReveal } from './ui/AnimatedReveal';

const steps: { step: string; Icon: LucideIcon; title: string; description: string }[] = [
  {
    step: "01",
    Icon: Smartphone,
    title: "Pay via Mobile Money",
    description: "Purchase energy credit instantly using MTN Mobile Money or Airtel Money — no bank account required, no token codes to enter."
  },
  {
    step: "02",
    Icon: Zap,
    title: "Power Activates Automatically",
    description: "Your smart meter receives the payment signal in seconds. Electricity flows to your home or business without any manual intervention."
  },
  {
    step: "03",
    Icon: BarChart3,
    title: "Monitor Your Usage",
    description: "Track consumption in real time, check your remaining balance, and top up whenever you need — all from your phone."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedReveal className="flex items-center justify-center gap-2 text-energy-blue font-bold mb-4 uppercase tracking-widest text-sm">
            How It Works
          </AnimatedReveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Energy Access in 3 Steps</h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            From first payment to reliable power — the entire process takes under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-energy-yellow/30 via-energy-blue/30 to-energy-yellow/30"
            aria-hidden="true"
          />

          {steps.map(({ step, Icon, title, description }, idx) => (
            <AnimatedReveal
              key={step}
              delay={idx * 0.15}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full bg-energy-yellow/10 border border-energy-yellow/30 flex items-center justify-center">
                  <Icon size={28} className="text-energy-yellow" aria-hidden="true" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-energy-yellow text-black text-xs font-black flex items-center justify-center" aria-hidden="true">
                  {idx + 1}
                </span>
              </div>
              <p className="text-energy-yellow/60 text-xs font-mono font-bold tracking-widest mb-3">{step}</p>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-foreground-muted leading-relaxed">{description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
