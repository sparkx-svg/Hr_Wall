import React, { useEffect, useState } from 'react';
import { Check, X, RotateCcw, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

// This flag only gates the UI for this browser tab's session — it is
// never written to Firestore or localStorage, and it grants no real
// permissions on its own. Actual write access to a member's `status`
// field is enforced server-side in firestore.rules via a hardcoded
// admin UID allow-list, so someone still needs to be signed in with
// an approved admin Firebase account for Approve/Reject/Revoke to
// actually take effect.
const SESSION_KEY = 'hrwall_admin_unlocked';

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  function handleUnlock(e) {
    e.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!expected) {
      setAuthError('Admin panel is not configured — set VITE_ADMIN_PASSWORD in your .env.');
      return;
    }
    if (passwordInput === expected) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
    setPasswordInput('');
  }

  function handleLock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  }

  if (!unlocked) {
    return (
      <section className="max-w-md mx-auto px-6 py-24">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 dark:bg-blue-600 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-1">Admin Access</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            This screen is a UI gate only. Even after unlocking, writes are
            only accepted if you're signed in with a Firebase account on
            the admin allow-list in <code>firestore.rules</code>.
          </p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              autoFocus
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Admin password"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500"
            />
            {authError && <p className="text-xs text-red-600 font-semibold text-left">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              Unlock
            </button>
          </form>
        </div>
      </section>
    );
  }

  return <AdminPanelContent onLock={handleLock} />;
}

function AdminPanelContent({ onLock }) {
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [approved, setApproved] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const unsubs = [
      onSnapshot(query(collection(db, 'members'), where('status', '==', 'pending')), snap =>
        setPending(snap.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(query(collection(db, 'members'), where('status', '==', 'rejected')), snap =>
        setRejected(snap.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(query(collection(db, 'members'), where('status', '==', 'approved')), snap =>
        setApproved(snap.docs.map(d => ({ id: d.id, ...d.data() })))),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  async function setStatus(id, status) {
    setBusyId(id);
    setActionError('');
    try {
      await updateDoc(doc(db, 'members', id), { status });
    } catch (err) {
      setActionError(
        "Couldn't update that profile. This UI unlock doesn't grant write access by " +
        "itself — you also need to be signed in with a Firebase account listed as an " +
        'admin in firestore.rules.'
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Directory Admin</h1>
        </div>
        <button
          onClick={onLock}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={2} /> Lock panel
        </button>
      </div>

      {actionError && (
        <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3.5 py-2.5">
          {actionError}
        </p>
      )}

      <div>
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3">
          Pending Approval <span className="text-slate-400 font-medium">({pending.length})</span>
        </h2>
        {pending.length === 0 ? (
          <p className="text-xs text-slate-400">Nothing waiting on review.</p>
        ) : (
          <div className="space-y-3">
            {pending.map(m => (
              <MemberRow key={m.id} member={m}>
                <button
                  onClick={() => setStatus(m.id, 'approved')}
                  disabled={busyId === m.id}
                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2} /> Approve
                </button>
                <button
                  onClick={() => setStatus(m.id, 'rejected')}
                  disabled={busyId === m.id}
                  className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} /> Reject
                </button>
              </MemberRow>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3">
          Rejected <span className="text-slate-400 font-medium">({rejected.length})</span>
        </h2>
        {rejected.length === 0 ? (
          <p className="text-xs text-slate-400">No rejected profiles.</p>
        ) : (
          <div className="space-y-3">
            {rejected.map(m => (
              <MemberRow key={m.id} member={m}>
                <button
                  onClick={() => setStatus(m.id, 'pending')}
                  disabled={busyId === m.id}
                  className="inline-flex items-center gap-1 bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} /> Move to Pending
                </button>
              </MemberRow>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3">
          Approved Members <span className="text-slate-400 font-medium">({approved.length})</span>
        </h2>
        {approved.length === 0 ? (
          <p className="text-xs text-slate-400">No approved profiles yet.</p>
        ) : (
          <div className="space-y-3">
            {approved.map(m => (
              <MemberRow key={m.id} member={m}>
                <button
                  onClick={() => setStatus(m.id, 'rejected')}
                  disabled={busyId === m.id}
                  className="inline-flex items-center gap-1 bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} /> Revoke
                </button>
              </MemberRow>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MemberRow({ member, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{member.name || 'HR Wall Member'}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {member.designation || 'HR Professional'}{member.city ? ` · ${member.city}` : ''}
        </p>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{member.bio || 'No bio yet.'}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );
}
