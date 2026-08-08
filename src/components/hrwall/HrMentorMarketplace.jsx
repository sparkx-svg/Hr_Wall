import React from 'react';
import { Star } from 'lucide-react';
import { hrMentors } from '../../data/hrWallData';

export default function HrMentorMarketplace() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
          1-on-1 Executive Guidance & Mentorship
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          HR Mentor Marketplace
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
          Book 1-on-1 strategy sessions, resume reviews, and HR Leadership guidance with top HR experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hrMentors.map(mentor => (
          <div key={mentor.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-0.5">{mentor.name}</h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">{mentor.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{mentor.specialty}</p>

            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md border dark:border-slate-700 text-xs mb-4 flex justify-between items-center">
              <span className="font-extrabold text-slate-900 dark:text-white">{mentor.price}</span>
              <span className="text-amber-500 font-bold inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5" strokeWidth={1.75} fill="currentColor" /> {mentor.rating}
              </span>
            </div>

            <button
              onClick={() => alert(`Booking 1-on-1 session with ${mentor.name}`)}
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 text-white font-bold py-2.5 rounded-md text-xs transition-all"
            >
              Book 1-on-1 Session
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
