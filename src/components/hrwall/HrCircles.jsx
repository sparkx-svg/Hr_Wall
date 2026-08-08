import React from 'react';
import { Building2, Target, Wallet, Bot, Briefcase } from 'lucide-react';
import { hrCirclesData } from '../../data/hrWallData';

const circleIcons = { 'building-2': Building2, target: Target, wallet: Wallet, bot: Bot, briefcase: Briefcase };

export default function HrCircles() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
          Private Domain & City Communities
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          HR Circles
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
          Private, specialized groups for HRBP, Payroll, Talent Acquisition, Industrial Relations, and regional city chapters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hrCirclesData.map(circle => {
          const Icon = circleIcons[circle.icon] || Building2;
          return (
          <div key={circle.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col justify-between hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <div>
              <Icon className="w-8 h-8 mb-3 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-1">{circle.name}</h3>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-3">{circle.members}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{circle.topic}</p>
            </div>
            <button
              onClick={() => alert(`Joined ${circle.name}`)}
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 text-white font-bold py-2.5 rounded-md text-xs transition-all"
            >
              Join HR Circle
            </button>
          </div>
          );
        })}
      </div>

    </section>
  );
}
