import React, { useState, useMemo } from 'react';

export default function TemplateModal({ template, onClose, showToast }) {
  if (!template) return null;

  const [fields, setFields] = useState({
    candidateName: "Jane Doe",
    companyName: "Acme Corporation",
    jobTitle: "Senior Product Manager",
    salary: "125,000",
    startDate: "September 1, 2026",
    managerName: "Alex Smith",
    effectiveDate: "August 15, 2026",
    state: "California, USA"
  });

  const handleChange = (key, value) => {
    setFields(prev => ({ ...fields, [key]: value }));
  };

  const customizedContent = useMemo(() => {
    let text = template.content;
    text = text.replace(/\[Candidate Full Name\]|\[Candidate First Name\]|\[Candidate Name\]|\[Employee Name\]|\[Employee First Name\]/g, fields.candidateName);
    text = text.replace(/\[Company Name\]/g, fields.companyName);
    text = text.replace(/\[Job Title\]|\[Title\]/g, fields.jobTitle);
    text = text.replace(/\[Amount\]|\[Base Salary\]|\[$[Amount]\]/g, `$${fields.salary}`);
    text = text.replace(/\[Start Date\]|\[Effective Date\]|\[Date\]/g, fields.startDate);
    text = text.replace(/\[Manager Name\]|\[Hiring Manager \/ HR Representative Name\]|\[Manager Name\/Title\]/g, fields.managerName);
    text = text.replace(/\[State\/Country\]/g, fields.state);
    return text;
  }, [template, fields]);

  const handleCopy = () => {
    navigator.clipboard.writeText(customizedContent);
    showToast("Customized document copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([customizedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}_customized.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${template.id}_customized.txt`);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${template.title} - ${fields.companyName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #111; }
            h1 { font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 24px; }
            pre { font-family: inherit; white-space: pre-wrap; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>${template.title}</h1>
          <pre>${customizedContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{template.category}</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{template.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Live Customizer Inputs */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-700 pb-2">
              ✏️ Live Fillable Inputs
            </h4>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Candidate / Employee Name</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.candidateName} onChange={e => handleChange('candidateName', e.target.value)} />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.companyName} onChange={e => handleChange('companyName', e.target.value)} />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.jobTitle} onChange={e => handleChange('jobTitle', e.target.value)} />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Base Salary ($)</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.salary} onChange={e => handleChange('salary', e.target.value)} />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Start / Effective Date</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.startDate} onChange={e => handleChange('startDate', e.target.value)} />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Manager / Representative Name</label>
              <input type="text" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded" value={fields.managerName} onChange={e => handleChange('managerName', e.target.value)} />
            </div>
          </div>

          {/* Right Column: Dynamic Preview */}
          <div className="md:col-span-2 flex flex-col">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2 text-xs">Real-Time Document Preview:</label>
            <textarea
              readOnly
              className="w-full h-80 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200 outline-none resize-y flex-1"
              value={customizedContent}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button onClick={handlePrint} className="border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-4 py-2 rounded-lg text-xs transition-all">
            🖨️ Print / PDF
          </button>
          <button onClick={handleCopy} className="border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-4 py-2 rounded-lg text-xs transition-all">
            📋 Copy
          </button>
          <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all">
            ⬇️ Download .TXT
          </button>
        </div>

      </div>
    </div>
  );
}
