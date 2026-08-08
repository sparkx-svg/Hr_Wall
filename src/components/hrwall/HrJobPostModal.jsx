import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['HRBP', 'Talent Acquisition', 'Payroll & Compliance', 'L&D', 'HR Operations', 'HR Tech'];
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export default function HrJobPostModal({ job, onClose }) {
  const { currentUser } = useAuth();
  const isEditMode = !!job;

  const [form, setForm] = useState({
    title: job?.title || '',
    company: job?.company || '',
    city: job?.city || '',
    category: job?.category || CATEGORIES[0],
    type: job?.type || TYPES[0],
    salary: job?.salary || '',
    description: job?.description || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !currentUser) return;
    setSaving(true);
    try {
      if (isEditMode) {
        await updateDoc(doc(db, 'jobs', job.id), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'jobs'), {
          ...form,
          postedBy: currentUser.uid,
          postedByName: currentUser.displayName || 'HR Wall Member',
          applicants: [],
          posted: 'Just now',
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            {isEditMode ? 'Edit Job Listing' : 'Post a Job'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Job Title">
            <input className={inputCls} required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Company">
              <input className={inputCls} required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            </Field>
            <Field label="City">
              <input className={inputCls} required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select className={inputCls} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Type">
              <select className={inputCls} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Salary Range">
            <input className={inputCls} placeholder="e.g. \u20b98 - \u20b914 LPA" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
          </Field>

          <Field label="Description">
            <textarea className={`${inputCls} resize-none`} rows="4" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </Field>

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg text-xs"
          >
            <Check className="w-3.5 h-3.5" strokeWidth={2} /> {saving ? 'Saving…' : isEditMode ? 'Save Changes' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500";
