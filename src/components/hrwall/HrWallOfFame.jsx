import React from 'react';
import { Star, Trophy, Target } from 'lucide-react';
import { hrLeaderboard } from '../../data/hrWallData';

const badgeIcons = { trophy: Trophy, star: Star, target: Target };

export default function HrWallOfFame() {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" strokeWidth={1.75} fill="currentColor" /> Community Reputation & Recognitions
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            HR Wall of Fame & Leaderboards
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Honoring top contributors, community mentors, and rising HR professionals across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {hrLeaderboard.map(leader => {
            const BadgeIcon = badgeIcons[leader.badgeIcon] || Star;
            return (
            <div key={leader.rank} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 font-black rounded-full flex items-center justify-center text-lg">
                  #{leader.rank}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{leader.name}</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{leader.title}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded">
                    <BadgeIcon className="w-3 h-3" strokeWidth={1.75} fill={leader.badgeIcon === 'star' ? 'currentColor' : 'none'} /> {leader.badge}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{leader.points}</span>
                <span className="text-[10px] text-slate-400 block">{leader.city}</span>
              </div>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
