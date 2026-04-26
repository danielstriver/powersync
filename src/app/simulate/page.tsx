'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sun, Battery, Zap, TrendingUp, Play, Pause, RotateCcw } from 'lucide-react';

// ─── Simulation engine ────────────────────────────────────────────────────────

const PANEL_KW = 50;
const BATTERY_KWH = 100;
const GRID_COST_RWF = 800;   // RWF/kWh — diesel backup
const MICRO_COST_RWF = 150;  // RWF/kWh — PowerSync microgrid

type Snapshot = {
  hour: number;
  solar: number;
  load: number;
  battery: number;
  gridKw: number;
  savings: number;
};

function solarGen(h: number): number {
  if (h < 6 || h > 18) return 0;
  return PANEL_KW * Math.exp(-((h - 12) ** 2) / 12.5);
}

function loadDemand(h: number): number {
  return 20 + 8 * Math.exp(-((h - 7) ** 2) / 2) + 12 * Math.exp(-((h - 19) ** 2) / 2);
}

function simulate(): Snapshot[] {
  const out: Snapshot[] = [];
  let bat = 40; // start at 40 kWh (40% charged)
  for (let h = 0; h < 24; h++) {
    const s = solarGen(h);
    const l = loadDemand(h);
    const net = s - l;
    let gridKw = 0;
    if (net >= 0) {
      bat = Math.min(bat + net, BATTERY_KWH);
    } else {
      const deficit = -net;
      const discharge = Math.min(deficit, bat);
      bat -= discharge;
      gridKw = Math.max(0, deficit - discharge);
    }
    const served = l - gridKw;
    out.push({
      hour: h,
      solar: s,
      load: l,
      battery: bat,
      gridKw,
      savings: served * (GRID_COST_RWF - MICRO_COST_RWF),
    });
  }
  return out;
}

const DATA = simulate();
const DAILY_SAVINGS = DATA.reduce((s, d) => s + d.savings, 0);
const DAILY_SOLAR = DATA.reduce((s, d) => s + d.solar, 0);
const TOTAL_GRID = DATA.reduce((s, d) => s + d.gridKw, 0);
const TOTAL_LOAD = DATA.reduce((s, d) => s + d.load, 0);
const GRID_AVOIDED_PCT = Math.round((1 - TOTAL_GRID / TOTAL_LOAD) * 100);

// ─── SVG Chart ────────────────────────────────────────────────────────────────

const VB_W = 700;
const VB_H = 180;
const PAD = { t: 20, r: 20, b: 30, l: 42 };
const PLOT_W = VB_W - PAD.l - PAD.r;
const PLOT_H = VB_H - PAD.t - PAD.b;
const MAX_KW = 55;

function cx(h: number) { return PAD.l + (h / 23) * PLOT_W; }
function cy(kw: number) { return PAD.t + PLOT_H - (Math.max(0, kw) / MAX_KW) * PLOT_H; }

function polyPoints(values: number[]) {
  const pts = values.map((v, i) => `${cx(i)},${cy(v)}`);
  return `${cx(0)},${cy(0)} ${pts.join(' ')} ${cx(23)},${cy(0)}`;
}

function linePath(values: number[]) {
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${cx(i)} ${cy(v)}`).join(' ');
}

function EnergyChart({ currentHour }: { currentHour: number }) {
  const solarValues = DATA.map(d => d.solar);
  const loadValues = DATA.map(d => d.load);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="24-hour energy profile chart"
    >
      <defs>
        <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Horizontal gridlines */}
      {[0, 10, 20, 30, 40, 50].map(kw => (
        <g key={kw}>
          <line
            x1={PAD.l} y1={cy(kw)}
            x2={VB_W - PAD.r} y2={cy(kw)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <text x={PAD.l - 6} y={cy(kw) + 3.5} fontSize="9" fill="rgba(255,255,255,0.35)" textAnchor="end">
            {kw}
          </text>
        </g>
      ))}

      {/* Solar generation — filled area */}
      <polygon points={polyPoints(solarValues)} fill="url(#solarGrad)" />
      <path d={linePath(solarValues)} fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Load demand — dashed line */}
      <path d={linePath(loadValues)} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,3" strokeLinecap="round" />

      {/* Time cursor */}
      <line
        x1={cx(currentHour)} y1={PAD.t}
        x2={cx(currentHour)} y2={VB_H - PAD.b}
        stroke="#facc15"
        strokeWidth="1.5"
        strokeDasharray="4,3"
        opacity="0.85"
      />
      <circle cx={cx(currentHour)} cy={cy(DATA[currentHour].solar)} r="4.5" fill="#facc15" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <circle cx={cx(currentHour)} cy={cy(DATA[currentHour].load)} r="4.5" fill="#60a5fa" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      {/* X-axis time labels */}
      {[0, 4, 8, 12, 16, 20, 23].map(h => (
        <text key={h} x={cx(h)} y={VB_H - 8} fontSize="9" fill="rgba(255,255,255,0.4)" textAnchor="middle">
          {`${String(h).padStart(2, '0')}:00`}
        </text>
      ))}

      {/* Legend */}
      <rect x={PAD.l} y={PAD.t - 14} width="10" height="3" fill="#facc15" rx="1.5" />
      <text x={PAD.l + 14} y={PAD.t - 10} fontSize="9" fill="rgba(255,255,255,0.55)">Solar generation (kW)</text>
      <line x1={PAD.l + 130} y1={PAD.t - 11.5} x2={PAD.l + 142} y2={PAD.t - 11.5} stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,2" />
      <text x={PAD.l + 146} y={PAD.t - 10} fontSize="9" fill="rgba(255,255,255,0.55)">Load demand (kW)</text>
    </svg>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

type BadgeColor = 'yellow' | 'green' | 'blue' | 'red';

const BADGE_COLORS: Record<BadgeColor, { dot: string; bg: string; text: string }> = {
  yellow: { dot: 'bg-energy-yellow', bg: 'bg-energy-yellow/10 border-energy-yellow/20', text: 'text-energy-yellow' },
  green:  { dot: 'bg-green-400',     bg: 'bg-green-400/10 border-green-400/20',         text: 'text-green-400' },
  blue:   { dot: 'bg-blue-400',      bg: 'bg-blue-400/10 border-blue-400/20',           text: 'text-blue-400' },
  red:    { dot: 'bg-red-400',       bg: 'bg-red-400/10 border-red-400/20',             text: 'text-red-400' },
};

function StatusBadge({ active, label, value, color }: { active: boolean; label: string; value: string; color: BadgeColor }) {
  const c = BADGE_COLORS[color];
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${active ? c.bg : 'bg-card-bg border-card-border'} transition-all`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${active ? `${c.dot} animate-pulse` : 'bg-foreground-muted'}`} />
      <div>
        <div className="text-xs text-foreground-muted font-medium leading-none mb-0.5">{label}</div>
        <div className={`text-sm font-bold leading-none ${active ? c.text : 'text-foreground-muted'}`}>{value}</div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SimulatePage() {
  const [hour, setHour] = useState(9);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setHour(h => {
          if (h >= 23) { setPlaying(false); return 23; }
          return h + 1;
        });
      }, 600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const snap = DATA[hour];
  const batteryPct = Math.round((snap.battery / BATTERY_KWH) * 100);
  const cumulativeSavings = DATA.slice(0, hour + 1).reduce((s, d) => s + d.savings, 0);
  const timeLabel = `${String(hour).padStart(2, '0')}:00`;

  const batteryBarColor =
    batteryPct > 50 ? 'from-green-500 to-green-400' :
    batteryPct > 20 ? 'from-amber-500 to-amber-400' :
    'from-red-500 to-red-400';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-card-border bg-background-opaque backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft size={15} />
          PowerSync
        </Link>
        <span className="text-card-border">|</span>
        <span className="text-foreground-dim text-sm font-semibold">Energy Simulator</span>
        <div className="ml-auto">
          <span className="text-xs bg-energy-yellow/10 border border-energy-yellow/25 text-energy-yellow px-2.5 py-1 rounded-full font-bold">
            Interactive Demo
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 pb-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            PowerSync{' '}
            <span className="text-energy-yellow">Microgrid Simulator</span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Watch how our smart microgrid generates, stores, and distributes solar energy across{' '}
            <span className="text-foreground font-bold">400 households</span> throughout a full day in Kigali, Rwanda.
          </p>
        </motion.div>

        {/* Time Control */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-6 glass rounded-2xl p-4 md:p-5"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => { setHour(0); setPlaying(false); }}
                className="p-2 rounded-full border border-card-border hover:border-energy-yellow/40 text-foreground-muted hover:text-energy-yellow transition-all"
                aria-label="Reset to midnight"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => { if (hour >= 23) setHour(0); setPlaying(p => !p); }}
                className="flex items-center gap-2 bg-energy-yellow text-black px-4 py-2 rounded-full font-bold text-sm shadow-glow hover:brightness-110 transition-all"
              >
                {playing ? <Pause size={13} /> : <Play size={13} />}
                {playing ? 'Pause' : 'Play Day'}
              </button>
              <span className="text-energy-yellow font-mono font-black text-xl w-14 tabular-nums">{timeLabel}</span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={23}
              value={hour}
              onChange={e => { setPlaying(false); setHour(Number(e.target.value)); }}
              className="flex-1 w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: 'var(--energy-yellow)' }}
              aria-label="Hour of day"
            />

            <div className="hidden sm:flex gap-3 text-xs text-foreground-muted shrink-0">
              <span>🌙 00:00</span>
              <span>☀️ 12:00</span>
              <span>🌙 23:00</span>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            {
              Icon: Sun,
              label: 'Solar Generation',
              value: `${snap.solar.toFixed(1)} kW`,
              sub: snap.solar > 0.5 ? 'Active — generating now' : 'No sunlight',
              color: 'text-energy-yellow',
              bg: 'bg-energy-yellow/5 border-energy-yellow/20',
            },
            {
              Icon: Battery,
              label: 'Battery Storage',
              value: `${batteryPct}%`,
              sub: `${snap.battery.toFixed(0)} / ${BATTERY_KWH} kWh`,
              color: batteryPct > 20 ? 'text-green-400' : 'text-red-400',
              bg: 'bg-card-bg border-card-border',
            },
            {
              Icon: Zap,
              label: 'Load Demand',
              value: `${snap.load.toFixed(1)} kW`,
              sub: snap.gridKw > 0 ? `Grid: ${snap.gridKw.toFixed(1)} kW` : '100% clean energy',
              color: snap.gridKw > 0 ? 'text-red-400' : 'text-blue-400',
              bg: 'bg-card-bg border-card-border',
            },
            {
              Icon: TrendingUp,
              label: 'Savings So Far',
              value: `RWF ${(cumulativeSavings / 1000).toFixed(0)}K`,
              sub: 'vs. diesel generators',
              color: 'text-green-400',
              bg: 'bg-green-500/5 border-green-500/20',
            },
          ].map(({ Icon, label, value, sub, color, bg }) => (
            <div key={label} className={`p-4 rounded-2xl border ${bg} flex flex-col gap-1.5`}>
              <div className="flex items-center gap-1.5 text-foreground-muted text-xs font-semibold uppercase tracking-wide">
                <Icon size={13} className={color} aria-hidden="true" />
                {label}
              </div>
              <motion.div
                key={value}
                initial={{ opacity: 0.4, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xl md:text-2xl font-black tabular-nums ${color}`}
              >
                {value}
              </motion.div>
              <div className="text-foreground-muted text-xs leading-snug">{sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-5 glass-dark rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-foreground-muted uppercase tracking-widest">24-Hour Energy Profile — Kigali Pilot Site</h2>
            <span className="text-xs text-foreground-muted">kW</span>
          </div>
          <EnergyChart currentHour={hour} />
        </div>

        {/* Battery Bar */}
        <div className="mb-5 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">Battery Storage Level</span>
            <span className={`text-sm font-bold ${batteryPct > 20 ? 'text-green-400' : 'text-red-400'}`}>
              {batteryPct}% &mdash; {snap.battery.toFixed(0)} kWh stored
            </span>
          </div>
          <div className="h-3.5 rounded-full bg-card-border overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${batteryBarColor}`}
              animate={{ width: `${batteryPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-foreground-muted">Empty</span>
            <span className="text-xs text-foreground-muted">Full — {BATTERY_KWH} kWh</span>
          </div>
        </div>

        {/* Energy Flow Status */}
        <div className="mb-8 glass rounded-2xl p-5">
          <h2 className="text-xs font-bold text-foreground-muted uppercase tracking-widest mb-4">Live Energy Flow</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <StatusBadge
              active={snap.solar > 0.5}
              label="Solar Panels"
              value={snap.solar > 0.5 ? `${snap.solar.toFixed(1)} kW generating` : 'Offline (night)'}
              color="yellow"
            />
            <StatusBadge
              active={snap.solar > snap.load}
              label="Charging Battery"
              value={snap.solar > snap.load ? `+${(snap.solar - snap.load).toFixed(1)} kW surplus` : 'Not charging'}
              color="green"
            />
            <StatusBadge
              active={snap.battery > 1 && snap.solar < snap.load}
              label="Battery Discharge"
              value={snap.solar < snap.load && snap.battery > 1
                ? `${Math.min(snap.load - snap.solar, snap.battery).toFixed(1)} kW output`
                : 'Standby'}
              color="blue"
            />
            <StatusBadge
              active={snap.gridKw > 0.1}
              label="Grid Backup"
              value={snap.gridKw > 0.1 ? `${snap.gridKw.toFixed(1)} kW from grid` : 'Not needed ✓'}
              color={snap.gridKw > 0.1 ? 'red' : 'green'}
            />
          </div>
        </div>

        {/* Daily Totals */}
        <div className="rounded-3xl glass-dark p-6 md:p-8 mb-8">
          <p className="text-xs font-bold text-foreground-muted uppercase tracking-widest text-center mb-6">Full-Day Summary — 400 Households</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Daily Solar Yield',            value: `${DAILY_SOLAR.toFixed(0)} kWh` },
              { label: 'Grid Dependency Avoided',       value: `${GRID_AVOIDED_PCT}%` },
              { label: 'Daily Cost Savings',            value: `RWF ${(DAILY_SAVINGS / 1000).toFixed(0)}K` },
              { label: 'Est. Monthly Savings (comm.)',  value: `RWF ${((DAILY_SAVINGS * 30) / 1_000_000).toFixed(1)}M` },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-black text-energy-yellow tabular-nums">{value}</span>
                <span className="text-foreground-muted text-xs font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How the simulation models the real system */}
        <div className="mb-8 rounded-2xl border border-card-border bg-card-bg p-5 text-sm text-foreground-muted">
          <p className="font-semibold text-foreground-subtle mb-2">About this simulation</p>
          <p>
            The model runs a deterministic 24-hour energy balance for a{' '}
            <strong className="text-foreground">{PANEL_KW} kW solar array</strong> with a{' '}
            <strong className="text-foreground">{BATTERY_KWH} kWh lithium battery bank</strong>, serving an aggregate load
            profile calibrated to our 2024 Kigali pilot data. Solar irradiance follows a Gaussian curve peaking at noon.
            Cost comparison uses RWF {GRID_COST_RWF}/kWh for diesel backup vs. RWF {MICRO_COST_RWF}/kWh for the PowerSync
            microgrid tariff.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-foreground-muted mb-5 text-lg">Ready to bring PowerSync to your community?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-energy-yellow text-black px-8 py-4 rounded-full font-black text-lg hover:brightness-110 transition-all shadow-glow"
          >
            Get In Touch
          </Link>
        </div>
      </main>
    </div>
  );
}
