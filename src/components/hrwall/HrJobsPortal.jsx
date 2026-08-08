import React, { useEffect, useRef, useState } from 'react';
import { Wallet, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import HrJobPostModal from './HrJobPostModal';

export default function HrJobsPortal() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const jobsQuery = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostClick = () => {
    if (!currentUser) {
      alert('Please sign in to post a job.');
      return;
    }
    setEditingJob(null);
    setShowPostModal(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setShowPostModal(true);
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing? This can\'t be undone.')) return;
    await deleteDoc(doc(db, 'jobs', id));
    setOpenMenuId(null);
  };

  const handleApply = async (job) => {
    if (!currentUser) {
      alert('Please sign in to apply.');
      return;
    }
    const applicants = job.applicants || [];
    const hasApplied = applicants.includes(currentUser.uid);
    await updateDoc(doc(db, 'jobs', job.id), {
      applicants: hasApplied ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
    });
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-10 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Exclusive HR Openings & Career Hub
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            HR Jobs Portal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto mb-5">
            Discover verified HRBP, Talent Acquisition, Payroll, and L&D opportunities across India.
          </p>
          <button
            onClick={handlePostClick}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md text-xs"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Post a Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-sm text-slate-400">No jobs posted yet — be the first to share an opening.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map(job => {
              const applicants = job.applicants || [];
              const hasApplied = currentUser && applicants.includes(currentUser.uid);
              const isOwner = currentUser && job.postedBy === currentUser.uid;

              return (
                <div key={job.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col justify-between hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all relative">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block">
                        {job.category} • {job.type}
                      </span>

                      {isOwner && (
                        <div className="relative" ref={openMenuId === job.id ? menuRef : null}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                          >
                            <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                          </button>
                          {openMenuId === job.id && (
                            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-10 overflow-hidden">
                              <button
                                onClick={() => handleEditClick(job)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                              >
                                <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(job.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{job.title}</h3>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">{job.company} — {job.city}, India</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">{job.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1"><Wallet className="w-3.5 h-3.5" strokeWidth={1.75} /> {job.salary || 'Not disclosed'}</span>
                      <span className="text-slate-400 font-normal">{applicants.length} applied</span>
                    </div>
                    <button
                      onClick={() => handleApply(job)}
                      className={`w-full font-bold py-2 rounded-md text-xs transition-all ${
                        hasApplied
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {hasApplied ? 'Applied ✓ (tap to withdraw)' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {showPostModal && (
        <HrJobPostModal job={editingJob} onClose={() => { setShowPostModal(false); setEditingJob(null); }} />
      )}
    </section>
  );
}
