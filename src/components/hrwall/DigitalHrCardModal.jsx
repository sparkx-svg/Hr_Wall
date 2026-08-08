import React from 'react';
import { X, BadgeCheck, Link2 } from 'lucide-react';

export default function DigitalHrCardModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative animate-in zoom-in duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Badge Header */}
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-lg text-white mb-6 shadow-md text-left">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Digital HR ID</span>
            <span className="text-[10px] font-bold">The HR Wall</span>
          </div>
          <h3 className="font-extrabold text-base leading-snug">{member.name}</h3>
          <p className="text-[11px] text-blue-100">{member.designation}</p>
        </div>

        {/* Member Avatar */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center text-white font-black text-2xl shadow-lg mb-3">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>

        <h3 className="font-black text-slate-900 dark:text-white text-lg flex items-center justify-center gap-1.5">
          {member.name}
          {member.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" strokeWidth={1.75} />}
        </h3>
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">@ {member.company}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{member.city}, India</p>

        {/* QR Code */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm mb-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://thehrwall.in/member/${member.id}`}
            alt="Digital HR QR Code"
            className="w-28 h-28"
          />
          <span className="text-[9px] font-bold text-slate-400 block mt-1">Scan to View Digital Profile</span>
        </div>

        <div className="w-full space-y-2">
          <button
            onClick={() => { navigator.clipboard.writeText(`https://thehrwall.in/member/${member.id}`); alert("Digital HR Profile Link copied!"); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-xs transition-all inline-flex items-center justify-center gap-1.5"
          >
            <Link2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Copy Shareable Profile Link
          </button>
        </div>

      </div>
    </div>
  );
}
