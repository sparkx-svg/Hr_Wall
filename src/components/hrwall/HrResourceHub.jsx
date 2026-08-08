import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { hrResourcesHub } from '../../data/hrWallData';

export default function HrResourceHub({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Compliance', 'Payroll', 'Recruitment', 'Operations'];

  const filtered = activeCategory === 'All' 
    ? hrResourcesHub 
    : hrResourcesHub.filter(r => r.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Community Uploads & Templates
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            HR Resource Hub
          </h2>
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === c
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col justify-between hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase px-2.5 py-1 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1"><FileText className="w-3.5 h-3.5" strokeWidth={1.75} /> {item.format}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">{item.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">By <strong>{item.author}</strong> ({item.city})</span>
              <button
                onClick={() => alert(`Downloading ${item.title}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-md text-xs transition-all inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.75} /> Download ({item.downloads})
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
