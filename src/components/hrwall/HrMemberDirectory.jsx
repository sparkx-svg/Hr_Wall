import React, { useState, useMemo, useEffect } from 'react';
import { BadgeCheck, Star, Eye, Pencil } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Reveal from './Reveal';

export default function HrMemberDirectory({ searchQuery, onSelectMember }) {
  const { currentUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [selectedCity, setSelectedCategory] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyForHire, setOnlyForHire] = useState(false);

  // Live subscription to the shared "members" collection — every
  // member's card (and any edits they make to it) shows up for
  // everyone in real time.
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'members'), (snapshot) => {
      setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  const cities = ['All', 'Chennai', 'Bangalore', 'Mumbai', 'Hyderabad', 'Delhi NCR', 'Pune'];

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesCity = selectedCity === 'All' || m.city === selectedCity;
      const matchesVerified = !onlyVerified || m.verified;
      const matchesForHire = !onlyForHire || m.forHire;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        (m.name || '').toLowerCase().includes(q) ||
        (m.company || '').toLowerCase().includes(q) ||
        (m.designation || '').toLowerCase().includes(q) ||
        (m.city || '').toLowerCase().includes(q) ||
        (m.domain || '').toLowerCase().includes(q) ||
        (m.skills || []).some(s => s.toLowerCase().includes(q));

      return matchesCity && matchesVerified && matchesForHire && matchesQuery;
    });
  }, [members, searchQuery, selectedCity, onlyVerified, onlyForHire]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Verified HR Talent & Leaders
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            HR Member Directory
          </h2>
        </div>

        {/* Quick Checkboxes */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={onlyVerified} onChange={e => setOnlyVerified(e.target.checked)} className="accent-blue-600 rounded" />
            Verified Badge Only
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={onlyForHire} onChange={e => setOnlyForHire(e.target.checked)} className="accent-blue-600 rounded" />
            Available for Hire
          </label>
          {currentUser && (
            <button
              onClick={() => onSelectMember({ id: currentUser.uid, ...(members.find(m => m.id === currentUser.uid) || {}), name: currentUser.displayName || 'HR Wall Member' })}
              className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-md text-xs"
            >
              <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} /> Edit My Profile
            </button>
          )}
        </div>
      </div>

      {/* City Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-400 uppercase mr-2">Filter City:</span>
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCategory(city)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border ${
              selectedCity === city
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <Reveal key={member.id} delay={Math.min(index % 6, 5) * 60} duration={550} distance={12}>
          <div
            className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 ease-out"
          >
            <div>
              {/* Member Top Bar */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                    {(member.name || '?').split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                      {member.name || 'HR Wall Member'}
                      {member.verified && (
                        <span className="inline-flex items-center gap-0.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full">
                          <BadgeCheck className="w-2.5 h-2.5" strokeWidth={2.5} /> Verified
                        </span>
                      )}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">{member.city || 'Location not set'}, India</span>
                  </div>
                </div>

                {/* Reputation Badge */}
                <span className="text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[10px] font-black px-2 py-0.5 rounded inline-flex items-center gap-1">
                  <Star className="w-3 h-3" strokeWidth={1.75} fill="currentColor" /> {member.reputationScore || 850}/1000
                </span>
              </div>

              {/* Designation & Company */}
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {member.designation || 'HR Professional'}
              </p>
              {member.company && (
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  @ {member.company}
                </p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                {member.bio || 'This member hasn\u2019t added a bio yet.'}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-4">
                {member.badges?.map(b => (
                  <span key={b} className="text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" strokeWidth={1.75} /> {member.views || 0} views
              </span>
              <button
                onClick={() => onSelectMember(member)}
                className="bg-slate-900 hover:bg-slate-800 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-md text-xs transition-all"
              >
                View Profile
              </button>
            </div>
          </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
