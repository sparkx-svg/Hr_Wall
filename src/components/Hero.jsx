import React from 'react';

export default function Hero({ searchQuery, setSearchQuery, totalTemplates }) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block bg-white/10 text-sky-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/15 mb-6">
          ⚡ 100% Free & Open-Source HR Framework
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Modern HR Templates, Legal Policies & Workforce Calculators
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
          Streamline human operations with battle-tested legal documents, PIP templates, overtime tools, and severance estimators built with React & Tailwind CSS.
        </p>

        {/* Global Search */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-2 shadow-2xl flex items-center gap-2 mb-10">
          <svg className="w-5 h-5 text-slate-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            className="flex-1 text-slate-900 px-2 py-2 outline-none text-base"
            placeholder="Search templates, policies, job descriptions, calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all">
            Search
          </button>
        </div>

        <div className="flex justify-center gap-8 text-sm text-slate-400 pt-6 border-t border-white/10">
          <div><strong className="text-white text-base">{totalTemplates}+</strong> Document Templates</div>
          <div><strong className="text-white text-base">6</strong> Interactive Tools</div>
          <div><strong className="text-white text-base">React 18</strong> Powered</div>
        </div>
      </div>
    </section>
  );
}
