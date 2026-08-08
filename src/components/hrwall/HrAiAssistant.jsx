import React, { useState, useRef } from 'react';
import { FileText, Target, HelpCircle, Scale, Zap, Sparkles, ClipboardList } from 'lucide-react';

// Uses the Netlify redirect defined in netlify.toml (/api/aiAssistant ->
// /.netlify/functions/aiAssistant), so no separate URL/env var is needed
// when the frontend and function are deployed together on Netlify.
// You can still override this by setting VITE_AI_API_URL in your
// Netlify environment variables if you ever host the function elsewhere.
const AI_API_URL = import.meta.env.VITE_AI_API_URL || '/api/aiAssistant';

const MODES = [
  { id: 'policy', label: 'Policy Drafter', icon: FileText, placeholderLabel: 'Enter Policy Topic or Focus Area (e.g. Leave Policy, Remote Work, Cyber Security):' },
  { id: 'resume', label: 'Resume & Job Matcher', icon: Target, placeholderLabel: 'Paste Candidate Summary or Target Role to Match:' },
  { id: 'interview', label: 'Interview Questions', icon: HelpCircle, placeholderLabel: 'Enter Target Job Role & Experience Level:' },
  { id: 'laborlaw', label: 'Labour Law Explainer', icon: Scale, placeholderLabel: 'Enter Indian Labour Act or Query (e.g. Gratuity Act, POSH, PF Rules):' },
];

export default function HrAiAssistant() {
  const [mode, setMode] = useState('policy');
  const [promptInput, setPromptInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const activeMode = MODES.find(m => m.id === mode);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!promptInput.trim() || loading) return;

    if (!AI_API_URL) {
      setError('AI Assistant is not configured yet. Set VITE_AI_API_URL to your deployed backend endpoint.');
      return;
    }

    setLoading(true);
    setError('');
    setAiOutput('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, promptInput }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }

      // Stream the response body in as it arrives for a live "typing" effect.
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setAiOutput(prev => prev + chunk);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong generating a response. Please try again.');
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      <div className="text-center mb-10">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
          Built-in HR Intelligence Tool
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          The HR Wall AI Assistant
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
          Draft HR policies, review job descriptions, generate interview questions, and explain Indian labor laws in seconds.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setAiOutput(''); setError(''); }}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              mode === m.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            } disabled:opacity-50`}
          >
            <m.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            {m.label}
          </button>
        ))}
      </div>

      {/* AI Form */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-sm mb-8">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {activeMode.placeholderLabel}
          </label>
          <input
            type="text"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 font-medium"
            placeholder="Type your prompt..."
            value={promptInput}
            onChange={e => setPromptInput(e.target.value)}
            disabled={loading}
            maxLength={2000}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !promptInput.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5"
            >
              {loading ? (<><Zap className="w-3.5 h-3.5" strokeWidth={1.75} /> Generating AI Analysis...</>) : (<><Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Generate with HR AI</>)}
            </button>
            {loading && (
              <button
                type="button"
                onClick={handleStop}
                className="px-4 py-3 rounded-md text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                Stop
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div role="alert" className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium rounded-md p-4 mb-8">
          {error}
        </div>
      )}

      {/* AI Output Result Box */}
      {(aiOutput || loading) && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded-md border border-slate-700 font-mono text-xs">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <span className="text-blue-400 font-bold uppercase text-[10px] tracking-wider">AI Assistant Result</span>
            <button
              type="button"
              onClick={() => { navigator.clipboard.writeText(aiOutput); }}
              disabled={!aiOutput}
              aria-label="Copy AI output to clipboard"
              className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold px-3 py-1 rounded-md border border-slate-700 disabled:opacity-50 inline-flex items-center gap-1"
            >
              <ClipboardList className="w-3 h-3" strokeWidth={1.75} /> Copy Output
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-mono leading-relaxed">
            {aiOutput}
            {loading && <span className="inline-block w-1.5 h-3.5 bg-slate-100 ml-0.5 animate-pulse" aria-hidden="true" />}
          </pre>
        </div>
      )}

    </section>
  );
}
