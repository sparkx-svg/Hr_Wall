import React from 'react';
import { hrWallStats } from '../../data/hrWallData';
import IndiaCityDensityMap from './IndiaCityDensityMap';
import Reveal from './Reveal';
import StatCounter from './StatCounter';

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M17 17l-4-4" strokeLinecap="round" />
    </svg>
  );
}

export default function HrWallHero({ searchQuery, setSearchQuery, onSelectCategory }) {
  return (
    <section className="relative bg-ink-900 text-paper-50 overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(189,138,52,0.10),_transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

        {/* Left: message */}
        <div>
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 text-brass-400 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 border-b border-brass-500/40 pb-1">
              Built by HRBPs, recruiters &amp; payroll teams — not marketers
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight mb-6 leading-[1.08]">
              The Wall where India's<br className="hidden sm:block" /> HR profession <span className="text-brass-400">shows up.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-base text-ink-100/70 max-w-xl mb-10 leading-relaxed">
              PF and ESI due dates that don't sneak up on you. Salary bands for Chennai vs.
              Bangalore vs. Mumbai. HRBPs who'll actually tell you what their notice-period
              policy really looks like — not the version in the handbook.
            </p>
          </Reveal>

          {/* Search */}
          <Reveal delay={270}>
            <div className="max-w-xl bg-paper-50 rounded-xl p-2 flex items-center gap-3 border border-paper-200 mb-10 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)]">
              <SearchIcon className="w-4 h-4 text-ink-400 ml-3" />
              <input
                type="text"
                className="flex-1 bg-transparent text-ink-900 px-1 py-2.5 outline-none text-sm placeholder:text-ink-400 font-medium"
                placeholder="Search HR professionals, cities, resources, or open jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-ink-900 hover:bg-ink-700 active:scale-95 text-paper-50 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all">
                Search
              </button>
            </div>
          </Reveal>

          {/* Ledger stat row */}
          <Reveal delay={360}>
            <div className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-paper-50/10 max-w-xl">
              {[
                ['members', 'HR members'],
                ['cities', 'Indian cities'],
                ['resources', 'Templates & SOPs'],
                ['jobs', 'Open roles'],
              ].map(([key, label]) => (
                <div key={key}>
                  <span className="block font-mono text-2xl font-semibold text-paper-50 tabular-nums">
                    <StatCounter value={hrWallStats[key]} />
                  </span>
                  <span className="text-[11px] text-ink-200/60 font-medium uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: live India density map */}
        <Reveal delay={220} className="hidden lg:block" distance={0}>
          <IndiaCityDensityMap onSelectCategory={onSelectCategory} />
        </Reveal>
      </div>
    </section>
  );
}
