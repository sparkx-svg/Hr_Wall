import React, { useState, useEffect } from 'react';
import {
  Star, CreditCard, BadgeCheck, UserPlus, MessageCircle, X,
  Pencil, Plus, Trash2, Check, Briefcase, AlertTriangle,
} from 'lucide-react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import DigitalHrCardModal from './DigitalHrCardModal';
import HrReputationScoreModal from './HrReputationScoreModal';

export default function MemberProfileModal({ member, onClose, onAccountDeleted }) {
  const { currentUser, deleteAccount } = useAuth();
  const [showIdCard, setShowIdCard] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // "Delete my account" confirmation flow
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Local display copy — lets the modal reflect a save immediately
  // without waiting on the parent's own subscription to re-render it.
  const [displayMember, setDisplayMember] = useState(member);

  // Edit form state, seeded from the member when edit mode opens.
  const [form, setForm] = useState(null);
  const [skillInput, setSkillInput] = useState('');

  // This modal is mounted once for the whole app lifetime, so its
  // internal state has to be re-synced whenever the parent hands it
  // a different `member` (or clears it back to null on close) — a
  // plain useState(member) only reads that value on first mount.
  useEffect(() => {
    setDisplayMember(member);
    setIsEditing(false);
    setForm(null);
    setSkillInput('');
    setShowDeleteConfirm(false);
    setDeletePassword('');
    setDeleteError('');
    setSaveError('');
  }, [member]);

  if (!displayMember) return null;

  const isOwner = currentUser && displayMember.id === currentUser.uid;

  const startEditing = () => {
    setSaveError('');
    setForm({
      name: displayMember.name || '',
      designation: displayMember.designation || '',
      company: displayMember.company || '',
      city: displayMember.city || '',
      domain: displayMember.domain || '',
      experienceYears: displayMember.experienceYears || '',
      bio: displayMember.bio || '',
      forHire: !!displayMember.forHire,
      skills: displayMember.skills || [],
      experienceList: displayMember.experienceList || [],
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setForm(null);
    setSkillInput('');
    setSaveError('');
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || form.skills.includes(s)) return;
    setForm({ ...form, skills: [...form.skills, s] });
    setSkillInput('');
  };

  const removeSkill = (s) => {
    setForm({ ...form, skills: form.skills.filter(x => x !== s) });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experienceList: [...form.experienceList, { title: '', company: '', duration: '' }],
    });
  };

  const updateExperience = (index, field, value) => {
    const next = [...form.experienceList];
    next[index] = { ...next[index], [field]: value };
    setForm({ ...form, experienceList: next });
  };

  const removeExperience = (index) => {
    setForm({ ...form, experienceList: form.experienceList.filter((_, i) => i !== index) });
  };

  const saveProfile = async () => {
    setSaveError('');
    if (!form.name.trim()) {
      setSaveError('Full Name can\u2019t be empty.');
      return;
    }
    setSaving(true);
    const cleanExperience = form.experienceList.filter(e => e.title.trim() || e.company.trim());
    // Note: `status` is deliberately left out of this payload. Only an
    // admin UID is allowed to write `status` (enforced in
    // firestore.rules) — an owner edit alone doesn't resubmit a
    // rejected profile. Admins can move it back to "pending" for
    // re-review from the Admin Panel once they see the update.
    const payload = { ...form, experienceList: cleanExperience, updatedAt: serverTimestamp() };
    try {
      await updateDoc(doc(db, 'members', displayMember.id), payload);
      setDisplayMember({ ...displayMember, ...payload });
      setIsEditing(false);
      setForm(null);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setSaveError(
        err?.code === 'permission-denied'
          ? 'You don\u2019t have permission to save this change. Try refreshing and signing in again.'
          : 'Couldn\u2019t save your profile. Check your connection and try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const isGoogleUser = currentUser?.providerData?.[0]?.providerId === 'google.com';

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError('');
    const result = await deleteAccount({ password: deletePassword });
    setDeleting(false);
    if (result?.error) {
      setDeleteError(result.error);
      return;
    }
    setShowDeleteConfirm(false);
    onClose();
    onAccountDeleted?.();
  };

  const member_ = displayMember;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

          {/* Cover Banner */}
          <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative shrink-0">
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
                {(member_.name || '?').split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex gap-2">
                {isOwner && !isEditing && (
                  <button
                    onClick={startEditing}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md inline-flex items-center gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} /> Edit Profile
                  </button>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setShowScoreModal(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5" strokeWidth={1.75} fill="currentColor" /> Reputation: {member_.reputationScore || 750}/1000
                  </button>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setShowIdCard(true)}
                    className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" strokeWidth={1.75} /> Digital HR ID
                  </button>
                )}
              </div>
            </div>

            {!isEditing ? (
              <>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {member_.name || 'HR Wall Member'}
                  {member_.verified && (
                    <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full">
                      <BadgeCheck className="w-3 h-3" strokeWidth={2.5} /> Verified
                    </span>
                  )}
                  {member_.forHire && (
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full">
                      Open to Work
                    </span>
                  )}
                </h2>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{member_.designation || 'HR Professional'}</p>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {member_.company && `@ ${member_.company}`}{member_.company && member_.city && ' • '}{member_.city ? `${member_.city}, India` : ''}
                </p>

                <div className="my-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">About</h4>
                  <p className="leading-relaxed">{member_.bio || 'This member hasn\u2019t added a bio yet.'}</p>
                </div>

                {/* Experience — LinkedIn-style timeline */}
                {member_.experienceList?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">Experience</h4>
                    <div className="space-y-3">
                      {member_.experienceList.map((exp, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-9 h-9 shrink-0 rounded-md bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                            <Briefcase className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{exp.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{exp.company}{exp.duration && ` • ${exp.duration}`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badges */}
                {member_.badges?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">Verified Badges & Recognitions</h4>
                    <div className="flex flex-wrap gap-2">
                      {member_.badges.map(b => (
                        <span key={b} className="text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">Core HR Expertise & Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(member_.skills || []).length > 0 ? member_.skills.map(s => (
                      <span key={s} className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-lg">
                        #{s}
                      </span>
                    )) : (
                      <span className="text-xs text-slate-400">No skills added yet.</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4 text-xs font-medium text-slate-500">
                  <div>Experience: <strong className="text-slate-800 dark:text-slate-200">{member_.experienceYears || 'Not set'}</strong></div>
                  <div>Profile Views: <strong className="text-slate-800 dark:text-slate-200">{member_.views || 0}</strong></div>
                </div>

                {isOwner && (
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => { setShowDeleteConfirm(true); setDeleteError(''); }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Delete My Account
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* ---------------- Edit form ---------------- */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Full Name">
                    <input className={inputCls} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </Field>
                  <Field label="Headline / Designation">
                    <input className={inputCls} placeholder="e.g. HR Business Partner" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
                  </Field>
                  <Field label="Company">
                    <input className={inputCls} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  </Field>
                  <Field label="City">
                    <input className={inputCls} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  </Field>
                  <Field label="HR Domain">
                    <input className={inputCls} placeholder="e.g. Talent Acquisition" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} />
                  </Field>
                  <Field label="Years of Experience">
                    <input className={inputCls} placeholder="e.g. 6 Years" value={form.experienceYears} onChange={e => setForm({ ...form, experienceYears: e.target.value })} />
                  </Field>
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" className="accent-blue-600 rounded" checked={form.forHire} onChange={e => setForm({ ...form, forHire: e.target.checked })} />
                  Open to Work
                </label>

                <Field label="About / Bio">
                  <textarea className={`${inputCls} resize-none`} rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                </Field>

                {/* Skills editor */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Skills</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.skills.map(s => (
                      <span key={s} className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold pl-3 pr-1.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                        #{s}
                        <button onClick={() => removeSkill(s)} className="text-slate-400 hover:text-red-600"><X className="w-3 h-3" strokeWidth={2} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className={inputCls}
                      placeholder="Add a skill and press Enter"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    />
                    <button onClick={addSkill} className="shrink-0 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold px-3 rounded-lg text-xs">Add</button>
                  </div>
                </div>

                {/* Experience editor */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</label>
                    <button onClick={addExperience} className="text-blue-600 dark:text-blue-400 text-xs font-bold inline-flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.experienceList.map((exp, i) => (
                      <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between gap-2">
                          <input className={inputCls} placeholder="Title (e.g. HR Manager)" value={exp.title} onChange={e => updateExperience(i, 'title', e.target.value)} />
                          <button onClick={() => removeExperience(i)} className="shrink-0 text-slate-400 hover:text-red-600 p-2">
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input className={inputCls} placeholder="Company" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                          <input className={inputCls} placeholder="Duration (e.g. 2022 \u2013 Present)" value={exp.duration} onChange={e => updateExperience(i, 'duration', e.target.value)} />
                        </div>
                      </div>
                    ))}
                    {form.experienceList.length === 0 && (
                      <p className="text-xs text-slate-400">No entries yet — click Add to list a role.</p>
                    )}
                  </div>
                </div>

                {saveError && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} /> {saveError}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-4 py-2 rounded-lg text-xs"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={2} /> {saving ? 'Saving…' : 'Save Profile'}
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-2 rounded-lg text-xs"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {!isEditing && !isOwner && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 shrink-0">
              <button onClick={() => alert(`Connect request sent to ${member_.name}`)} className="border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-4 py-2 rounded-lg text-xs inline-flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" strokeWidth={1.75} /> Connect
              </button>
              <button onClick={() => alert(`Message sent to ${member_.name}`)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-xs inline-flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} /> Send Message
              </button>
            </div>
          )}

        </div>
      </div>

      {showIdCard && (
        <DigitalHrCardModal member={member_} onClose={() => setShowIdCard(false)} />
      )}

      {showScoreModal && (
        <HrReputationScoreModal member={member_} onClose={() => setShowScoreModal(false)} />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="w-11 h-11 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">Delete your account?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                This is permanent. Your HR Wall profile will be deleted, and any
                posts and job listings you've created will be deleted along with
                it. This can't be undone.
              </p>

              {isGoogleUser ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5">
                  You'll be asked to confirm via a Google sign-in popup before deletion.
                </p>
              ) : (
                <div className="mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Confirm your password
                  </label>
                  <input
                    type="password"
                    className={inputCls}
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    placeholder="Current password"
                    autoFocus
                  />
                </div>
              )}

              {deleteError && (
                <p className="text-xs text-red-600 font-semibold mb-4">{deleteError}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting || (!isGoogleUser && !deletePassword)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-lg text-xs"
                >
                  {deleting ? 'Deleting…' : 'Delete Permanently'}
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeletePassword(''); setDeleteError(''); }}
                  disabled={deleting}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-2.5 rounded-lg text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
