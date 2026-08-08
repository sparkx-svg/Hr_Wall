import React from 'react';
import { X, Star } from 'lucide-react';

export default function HrReputationScoreModal({ member, onClose }) {
  if (!member) return null;

  const score = member.reputationScore || 850;
  const breakdown = member.scoreBreakdown || {
    completeness: "95/100",
    verifiedCredentials: "180/200",
    resourcesShared: "220/250",
    answersAccepted: "160/200",
    mentoringHours: "110/150",
    peerEndorsements: "85/100"
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in duration-200">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Score Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-800 pb-1">
            Signature Feature: HR Reputation Score
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">{member.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{member.designation} @ {member.company}</p>
        </div>

        {/* Radial / Large Score Badge */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 rounded-2xl text-white text-center shadow-xl mb-6">
          <span className="text-xs uppercase font-bold text-blue-100 tracking-wider block">Total HR Reputation Score</span>
          <span className="text-5xl font-black tracking-tight my-1 block">{score} <span className="text-xl text-blue-200 font-normal">/ 1000</span></span>
          <span className="inline-flex items-center gap-1 border border-white/30 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded">
            <Star className="w-3 h-3" strokeWidth={1.75} fill="currentColor" /> {score >= 900 ? 'Tier 1 Top HR Leader' : 'Verified HR Specialist'}
          </span>
        </div>

        {/* Multi-Factor Score Breakdown */}
        <div className="space-y-3 text-xs mb-6">
          <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800 pb-2">
            Multi-Factor Expertise Breakdown
          </h4>
          <div className="flex justify-between p-2 rounded-sm bg-slate-50 dark:bg-slate-800">
            <span className="font-medium text-slate-600 dark:text-slate-300">1. Profile Completeness</span>
            <strong className="text-slate-900 dark:text-white">{breakdown.completeness}</strong>
          </div>
          <div className="flex justify-between p-2 rounded-sm bg-slate-50 dark:bg-slate-800">
            <span className="font-medium text-slate-600 dark:text-slate-300">2. Verified Credentials & Badges</span>
            <strong className="text-slate-900 dark:text-white">{breakdown.verifiedCredentials}</strong>
          </div>
          <div className="flex justify-between p-2 rounded-sm bg-slate-50 dark:bg-slate-800">
            <span className="font-medium text-slate-600 dark:text-slate-300">3. HR Templates & SOPs Shared</span>
            <strong className="text-slate-900 dark:text-white">{breakdown.resourcesShared}</strong>
          </div>
          <div className="flex justify-between p-2 rounded-sm bg-slate-50 dark:bg-slate-800">
            <span className="font-medium text-slate-600 dark:text-slate-300">4. Community Answers Accepted</span>
            <strong className="text-slate-900 dark:text-white">{breakdown.answersAccepted}</strong>
          </div>
          <div className="flex justify-between p-2 rounded-sm bg-slate-50 dark:bg-slate-800">
            <span className="font-medium text-slate-600 dark:text-slate-300">5. 1-on-1 Mentoring Hours</span>
            <strong className="text-slate-900 dark:text-white">{breakdown.mentoringHours}</strong>
          </div>
        </div>

        <button onClick={onClose} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-2.5 rounded-md text-xs">
          Close Score Details
        </button>

      </div>
    </div>
  );
}
