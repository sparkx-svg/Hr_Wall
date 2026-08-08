import React from 'react';
import { Wallet } from 'lucide-react';
import { hrJobs } from '../../data/hrWallData';

export default function HrJobsPortal() {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-10 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Exclusive HR Openings & Career Hub
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            HR Jobs Portal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Discover verified HRBP, Talent Acquisition, Payroll, and L&D opportunities across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hrJobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col justify-between hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all">
              <div>
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block mb-3">
                  {job.category} • {job.type}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{job.title}</h3>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">{job.company} — {job.city}, India</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">{job.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1"><Wallet className="w-3.5 h-3.5" strokeWidth={1.75} /> {job.salary}</span>
                  <span className="text-slate-400 font-normal">{job.posted}</span>
                </div>
                <button
                  onClick={() => alert(`Applied to ${job.title} at ${job.company}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md text-xs transition-all"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
