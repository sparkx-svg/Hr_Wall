import React from 'react';
import { Calendar } from 'lucide-react';
import { complianceCalendar2026 } from '../../data/hrWallData';

export default function HrComplianceCalendar() {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Statutory Regulations & Filing Dates
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Indian Labour Law Compliance Calendar
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Stay aligned with statutory deadlines for EPF, ESI, Professional Tax (PT), POSH audits, and labor returns across Indian states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {complianceCalendar2026.map(item => (
            <div key={item.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm p-6 flex items-start justify-between">
              <div>
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block mb-2">
                  {item.category} • {item.region}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                <p className="text-xs font-extrabold text-amber-500 inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" strokeWidth={1.75} /> Due Date: {item.date}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {item.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
