import React, { useState } from 'react';

export default function Navbar({ isDark, onToggleDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white no-underline">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            HR
          </div>
          <span>HRHub <span className="text-[10px] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-bold ml-1 tracking-wide">POLISHED PRO</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates & Policies</a>
          <a href="#calculators" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Calculators & Tools</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200"
            title="Toggle Dark / Light Mode"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <a href="#templates" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all inline-block">
            Get Started Free
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleDark}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200 animate-in slide-in-from-top">
          <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates & Policies</a>
          <a href="#calculators" onClick={() => setMobileMenuOpen(false)}>Calculators & Tools</a>
          <a href="#templates" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white text-center py-2 rounded-lg mt-2">Get Started Free</a>
        </div>
      )}
    </header>
  );
}
