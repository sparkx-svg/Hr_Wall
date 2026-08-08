import React from 'react';

export default function TemplateCard({ template, onOpenModal, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            {template.category}
          </span>
          <button
            onClick={() => onToggleFavorite(template.id)}
            className={`text-lg p-1 transition-colors ${
              isFavorite ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
            }`}
            title={isFavorite ? "Remove from favorites" : "Save to favorites"}
          >
            ★
          </button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {template.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">
          {template.description}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>📄 {template.format}</span>
        <button
          onClick={() => onOpenModal(template)}
          className="border border-slate-200 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-3 py-1.5 rounded-lg transition-all"
        >
          Customize & Copy
        </button>
      </div>
    </div>
  );
}
