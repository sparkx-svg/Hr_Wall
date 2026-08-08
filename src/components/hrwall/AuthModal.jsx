import React, { useEffect, useRef, useState } from 'react';
import { X, Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LogoMark from './LogoMark';

function GoogleGlyph(props) {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16 4 9.1 8.5 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.7 34.9 27 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9 39.4 15.9 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.6C41.5 36.5 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

export default function AuthModal({ open, initialMode = 'login', onClose }) {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError('');
      setNotice('');
      setPassword('');
    }
  }, [open, initialMode]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isSignup = mode === 'signup';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setNotice('');

    if (isSignup && name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    const result = isSignup
      ? await signup(name.trim(), email.trim(), password)
      : await login(email.trim(), password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  }

  async function handleGoogle() {
    setError('');
    setNotice('');
    setGoogleSubmitting(true);
    const result = await loginWithGoogle();
    setGoogleSubmitting(false);
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      onClose();
    }
  }

  async function handleForgotPassword() {
    setError('');
    setNotice('');
    if (!email.trim()) {
      setError('Enter your email above first, then tap "Forgot password?"');
      return;
    }
    const result = await resetPassword(email.trim());
    if (result.error) setError(result.error);
    else setNotice(`Password reset link sent to ${email.trim()}.`);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-slide-down"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-md bg-paper-50 dark:bg-ink-800 rounded-2xl shadow-2xl border border-ink-100 dark:border-ink-600 overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-7 pt-7 pb-5 border-b border-ink-100 dark:border-ink-700">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full text-ink-400 hover:text-ink-700 dark:hover:text-paper-100 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5 mb-4">
            <LogoMark size={28} />
            <span className="font-display text-sm font-semibold text-ink-900 dark:text-paper-100">The HR Wall</span>
          </div>
          <h2 id="auth-modal-title" className="font-display text-2xl font-semibold text-ink-900 dark:text-paper-50">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-xs text-ink-400 dark:text-ink-300 mt-1">
            {isSignup
              ? 'Join the HR crowd trading pay bands, PF dates and real advice.'
              : 'Sign in to pick up where you left off.'}
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleSubmitting || submitting}
            className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-ink-50 border border-ink-200 text-ink-800 font-semibold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleGlyph />}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <span className="h-px flex-1 bg-ink-100 dark:bg-ink-600" />
            <span className="text-[11px] uppercase tracking-wider text-ink-300 dark:text-ink-400">or use your email</span>
            <span className="h-px flex-1 bg-ink-100 dark:bg-ink-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {isSignup && (
              <div className="relative">
                <User className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-900 text-ink-900 dark:text-paper-100 text-sm placeholder:text-ink-300 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/20 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                autoComplete="email"
                placeholder="Work or personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-900 text-ink-900 dark:text-paper-100 text-sm placeholder:text-ink-300 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/20 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                placeholder={isSignup ? 'Create a password (min. 6 characters)' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-900 text-ink-900 dark:text-paper-100 text-sm placeholder:text-ink-300 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 dark:hover:text-paper-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {!isSignup && (
              <div className="text-right -mt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-brass-600 dark:text-brass-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p className="text-xs font-medium text-clay-600 dark:text-clay-400 bg-clay-600/10 border border-clay-600/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {notice && (
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-600/10 border border-teal-100 dark:border-teal-600/30 rounded-lg px-3 py-2">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || googleSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-700 active:scale-[0.99] dark:bg-brass-500 dark:hover:bg-brass-400 text-paper-50 dark:text-ink-900 font-semibold text-sm py-2.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer — mode toggle */}
        <div className="px-7 py-4 bg-ink-50 dark:bg-ink-900/60 border-t border-ink-100 dark:border-ink-700 text-center">
          <p className="text-xs text-ink-500 dark:text-ink-300">
            {isSignup ? (
              <>
                Already on The HR Wall?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); setNotice(''); }}
                  className="font-semibold text-brass-600 dark:text-brass-400 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to The HR Wall?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); setNotice(''); }}
                  className="font-semibold text-brass-600 dark:text-brass-400 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
