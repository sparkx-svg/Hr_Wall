import React from 'react';
import { hrSalaryInsights } from '../../data/hrWallData';

export default function HrSalaryBenchmark() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
          Market Compensation Intelligence
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          HR Salary Benchmarking by Indian City
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
          Aggregated, anonymized salary bands for Talent Acquisition, HRBP, and Payroll roles across Chennai, Bangalore, and Mumbai.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm overflow-hidden max-w-5xl mx-auto text-xs">
        <div className="grid grid-cols-5 bg-slate-100 dark:bg-slate-900 p-4 font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
          <div className="col-span-2">HR Role & Level</div>
          <div>Chennai</div>
          <div>Bangalore</div>
          <div>Mumbai</div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {hrSalaryInsights.map(item => (
            <div key={item.role} className="grid grid-cols-5 p-4 items-center text-slate-700 dark:text-slate-200 font-medium">
              <div className="col-span-2 font-bold text-slate-900 dark:text-white">
                {item.role}
                <span className="text-slate-400 font-normal block text-[10px]">{item.exp} Tenure</span>
              </div>
              <div className="font-bold text-blue-600 dark:text-blue-400">{item.chennai}</div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400">{item.bangalore}</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">{item.mumbai}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
