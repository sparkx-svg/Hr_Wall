import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-blue-600 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
      <span>✨ {message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white text-lg ml-2 leading-none">&times;</button>
    </div>
  );
}
