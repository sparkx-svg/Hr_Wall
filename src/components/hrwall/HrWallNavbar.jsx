import React, { useState } from 'react';
import LogoMark from './LogoMark';

function SunIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4M15.8 15.8l-1.4-1.4M5.6 5.6L4.2 4.2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M17 11.2A7 7 0 018.8 3a7 7 0 108.2 8.2z" strokeLinejoin="round" />
    </svg>
  );
}

export default function HrWallNavbar({ activeTab, setActiveTab, isDark, onToggleDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'directory', label: 'Directory' },
    { id: 'feed', label: 'Community Feed' },
    { id: 'circles', label: 'HR Circles' },
    { id: 'ai-assistant', label: 'AI Assistant' },
    { id: 'compliance', label: 'Compliance Calendar' },
    { id: 'salary-benchmark', label: 'Salary Benchmark' },
    { id: 'cities', label: 'India HR Map' },
    { id: 'resources', label: 'Resource Hub' },
    { id: 'jobs', label: 'HR Jobs' },
    { id: 'mentors', label: 'Mentors' },
    { id: 'walloffame', label: 'Wall of Fame' },
    { id: 'pricing', label: 'Plans' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper-50/95 dark:bg-ink-900/95 backdrop-blur-md border-b border-ink-100 dark:border-ink-600 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" onClick={() => setActiveTab('directory')} className="group flex items-center gap-3 no-underline">
          <div className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg]">
            <LogoMark />
          </div>
          <div>
            <span className="text-lg font-semibold tracking-tight text-ink-900 dark:text-paper-100 block leading-none font-display">
              The HR Wall
            </span>
            <span className="text-[10px] text-brass-600 dark:text-brass-400 font-semibold uppercase tracking-[0.2em] block mt-1">
              PF Dates · Pay Bands · Real Talk
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden 2xl:flex items-center gap-0.5 font-medium text-xs">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-2.5 py-2 transition-colors duration-200 ${
                activeTab === item.id
                  ? 'text-ink-900 dark:text-paper-50'
                  : 'text-ink-400 dark:text-ink-200 hover:text-ink-800 dark:hover:text-paper-100'
              }`}
            >
              {item.label}
              <span
                className={`absolute left-2.5 right-2.5 -bottom-0.5 h-[2px] bg-brass-500 origin-left transition-transform duration-300 ease-out ${
                  activeTab === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="p-2.5 border border-ink-200 dark:border-ink-600 rounded-full hover:bg-ink-50 dark:hover:bg-ink-700 active:scale-90 transition-all text-ink-600 dark:text-paper-200"
            title="Toggle theme"
          >
            {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button onClick={() => setActiveTab('pricing')} className="bg-ink-900 hover:bg-ink-700 active:scale-95 dark:bg-brass-500 dark:hover:bg-brass-400 text-paper-50 dark:text-ink-900 text-xs font-semibold px-4 py-2.5 rounded-full transition-all">
            Join Free Community
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 2xl:hidden">
          <button onClick={onToggleDark} className="p-2 border border-ink-200 dark:border-ink-600 rounded-full text-ink-600 dark:text-paper-200 active:scale-90 transition-transform">
            {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border border-ink-200 dark:border-ink-600 rounded-full text-ink-800 dark:text-paper-100 font-semibold w-9 h-9 flex items-center justify-center active:scale-90 transition-transform">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform duration-300" style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'none' }}>
              <path d="M0 1h16M0 6h16M0 11h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-paper-50 dark:bg-ink-900 border-b border-ink-100 dark:border-ink-600 px-6 py-4 flex flex-col gap-1 font-medium text-xs max-h-[80vh] overflow-y-auto animate-fade-slide-down">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className="text-left py-2 text-ink-600 dark:text-paper-200 hover:text-brass-600 dark:hover:text-brass-400 animate-fade-slide-down"
              style={{ animationDelay: `${Math.min(index, 8) * 25}ms`, animationFillMode: 'both' }}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }} className="bg-ink-900 dark:bg-brass-500 text-paper-50 dark:text-ink-900 text-center py-2.5 rounded-full mt-2 font-semibold active:scale-95 transition-transform">
            Join Free Community
          </button>
        </div>
      )}
    </header>
  );
}
