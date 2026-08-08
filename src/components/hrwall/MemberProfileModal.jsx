import React, { useState } from 'react';
import { Star, CreditCard, BadgeCheck, UserPlus, MessageCircle, X } from 'lucide-react';
import DigitalHrCardModal from './DigitalHrCardModal';
import HrReputationScoreModal from './HrReputationScoreModal';

export default function MemberProfileModal({ member, onClose }) {
  const [showIdCard, setShowIdCard] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  if (!member) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          
          {/* Cover Banner */}
          <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          {/* Profile Header */}
          <div className="px-8 pt-0 pb-6 relative flex-1 overflow-y-auto">
            <div className="flex justify-between items-end -mt-12 mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl border-4 border-white dark:border-slate-800 flex items-center justify-center text-white font-black text-3xl shadow-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowScoreModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5" strokeWidth={1.75} fill="currentColor" /> Reputation: {member.reputationScore || 850}/1000
                </button>
                <button
                  onClick={() => setShowIdCard(true)}
                  className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" strokeWidth={1.75} /> Digital HR ID
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              {member.name}
              {member.verified && <BadgeCheck className="w-4 h-4 text-blue-500" strokeWidth={1.75} aria-label="Verified member" />}
            </h2>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{member.designation}</p>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">@ {member.company} • {member.city}, India</p>

            <div className="my-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">About & Bio</h4>
              <p className="leading-relaxed">{member.bio}</p>
            </div>

            {/* Badges */}
            <div className="mb-6">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">Verified Badges & Recognitions</h4>
              <div className="flex flex-wrap gap-2">
                {member.badges?.map(b => (
                  <span key={b} className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" strokeWidth={2} /> {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">Core HR Expertise & Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map(s => (
                  <span key={s} className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-lg">
                    #{s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4 text-xs font-medium text-slate-500">
              <div>Experience: <strong className="text-slate-800 dark:text-slate-200">{member.experience}</strong></div>
              <div>Profile Views: <strong className="text-slate-800 dark:text-slate-200">{member.views}</strong></div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
            <button onClick={() => alert(`Connect request sent to ${member.name}`)} className="border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-4 py-2 rounded-lg text-xs inline-flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" strokeWidth={1.75} /> Connect
            </button>
            <button onClick={() => alert(`Message sent to ${member.name}`)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-xs inline-flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} /> Send Message
            </button>
          </div>

        </div>
      </div>

      {showIdCard && (
        <DigitalHrCardModal member={member} onClose={() => setShowIdCard(false)} />
      )}

      {showScoreModal && (
        <HrReputationScoreModal member={member} onClose={() => setShowScoreModal(false)} />
      )}
    </>
  );
}
