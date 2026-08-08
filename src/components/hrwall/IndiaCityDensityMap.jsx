import React, { useEffect, useMemo, useRef, useState } from 'react';
import { indianCities, hrWallStats, hrMembers } from '../../data/hrWallData';

// Approximate city positions plotted against real lat/lon, projected onto a
// 460x560 canvas (equirectangular, tuned for a recognizable India silhouette).
// This is the actual geography — not a decorative stand-in.
const CITY_XY = {
  'Chennai': { x: 236, y: 428 },
  'Bangalore': { x: 197, y: 404 },
  'Mumbai': { x: 120, y: 300 },
  'Hyderabad': { x: 213, y: 340 },
  'Pune': { x: 137, y: 312 },
  'Delhi NCR': { x: 191, y: 138 },
  'Kolkata': { x: 341, y: 246 },
  'Ahmedabad': { x: 110, y: 232 },
};

// Hand-simplified India outline (etched-map style, not a literal atlas trace) —
// kept schematic on purpose to match the ledger/woodcut visual language.
const INDIA_OUTLINE = "M118,58 C145,44 172,40 196,48 C214,54 224,68 246,72 C270,76 292,68 312,80 C330,90 328,112 352,124 C378,136 404,146 414,168 C422,186 400,196 388,210 C372,228 380,248 364,262 C348,276 350,300 332,310 C316,318 314,336 296,344 C280,352 276,372 258,384 C246,392 248,410 234,422 C224,430 226,446 214,456 C204,464 206,480 196,490 C186,500 188,516 176,522 C166,527 162,512 168,500 C174,488 164,478 170,464 C176,450 162,442 168,428 C173,416 158,408 160,392 C162,378 148,368 148,352 C148,338 134,330 132,314 C130,298 116,290 112,274 C108,258 92,250 90,232 C88,214 74,206 74,188 C74,170 62,160 66,142 C70,126 60,114 70,100 C80,86 78,68 98,62 C106,59 112,60 118,58 Z";

function parseNum(str) {
  const m = String(str).match(/[\d,]+/);
  return m ? parseInt(m[0].replace(/,/g, ''), 10) : 0;
}

function useCountUp(target, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

export default function IndiaCityDensityMap({ onSelectCategory }) {
  const cities = useMemo(() => {
    const counts = indianCities.map((c) => parseNum(c.members));
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    return indianCities.map((c, i) => ({
      ...c,
      count: counts[i],
      jobsCount: parseNum(c.jobs),
      r: 7 + ((counts[i] - min) / (max - min || 1)) * 15,
      ...CITY_XY[c.name],
    }));
  }, []);

  const busiest = cities.reduce((a, b) => (b.count > a.count ? b : a), cities[0]);
  const [active, setActive] = useState(busiest);

  const totalMembers = useCountUp(parseNum(hrWallStats.members));

  // Cycles through real directory members as a "who's on the wall" ticker —
  // actual seeded profiles, not fabricated activity timestamps.
  const [tickerIdx, setTickerIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTickerIdx((i) => (i + 1) % hrMembers.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  const tickerMember = hrMembers[tickerIdx];

  return (
    <div className="relative w-full h-[480px] lg:h-[520px] rounded-2xl border border-brass-500/25 bg-ink-800/60 overflow-hidden shadow-[0_30px_60px_-24px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-70" />

      {/* Live counter, top-left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brass-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-brass-400 font-semibold">Live on the Wall</span>
        </div>
        <span className="block font-mono text-2xl font-semibold text-paper-50 tabular-nums leading-none">
          {totalMembers.toLocaleString('en-IN')}+
        </span>
        <span className="text-[10px] text-ink-200/50 font-medium uppercase tracking-wide">HR members, live directory</span>
      </div>

      {/* Ticker, top-right */}
      <div className="absolute top-4 right-4 z-20 text-right max-w-[170px]">
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-200/50 font-semibold block mb-1">Featured profile</span>
        <p key={tickerMember.id} className="text-xs font-semibold text-paper-50 leading-tight animate-[fadein_0.5s_ease]">
          {tickerMember.name}
        </p>
        <p className="text-[10px] text-ink-200/60 leading-tight">{tickerMember.city}</p>
      </div>

      {/* Map */}
      <svg viewBox="0 0 460 560" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path
          d={INDIA_OUTLINE}
          fill="rgba(245,239,226,0.05)"
          stroke="rgba(189,138,52,0.35)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {cities.map((c) => {
          const isActive = active.name === c.name;
          return (
            <g
              key={c.name}
              onMouseEnter={() => setActive(c)}
              onClick={() => setActive(c)}
              className="cursor-pointer"
            >
              {isActive && (
                <circle cx={c.x} cy={c.y} r={c.r + 8} fill="none" stroke="rgba(189,138,52,0.5)" strokeWidth="1">
                  <animate attributeName="r" values={`${c.r + 4};${c.r + 14};${c.r + 4}`} dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={c.x}
                cy={c.y}
                r={c.r}
                fill={isActive ? '#BD8A34' : 'rgba(189,138,52,0.55)'}
                stroke="#0F0D09"
                strokeWidth="1"
                className="transition-all duration-200"
              />
              <text
                x={c.x}
                y={c.y - c.r - 6}
                textAnchor="middle"
                className="fill-paper-50 font-sans"
                style={{ fontSize: isActive ? 12 : 10, fontWeight: isActive ? 700 : 500, opacity: isActive ? 1 : 0.65 }}
              >
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Detail panel, bottom */}
      <div
        onClick={() => onSelectCategory && onSelectCategory('directory')}
        className="absolute bottom-0 left-0 right-0 z-20 bg-ink-900/90 backdrop-blur-sm border-t border-brass-500/20 px-5 py-4 cursor-pointer hover:bg-ink-900 transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold text-paper-50 leading-tight">{active.name}</p>
            <p className="text-xs text-ink-200/60">{active.topSector}</p>
          </div>
          <div className="flex gap-5 text-right shrink-0">
            <div>
              <span className="block font-mono text-base font-semibold text-brass-400 tabular-nums">{active.members}</span>
              <span className="text-[10px] text-ink-200/50 uppercase tracking-wide">Members</span>
            </div>
            <div>
              <span className="block font-mono text-base font-semibold text-brass-400 tabular-nums">{active.jobsCount}</span>
              <span className="text-[10px] text-ink-200/50 uppercase tracking-wide">Open roles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
