import React, { useState } from 'react';

// 1. PTO Calculator
export function PtoCalculatorCard() {
  const [rate, setRate] = useState(3.33);
  const [periods, setPeriods] = useState(12);
  const [used, setUsed] = useState(16);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const total = rate * periods;
    const avail = Math.max(0, total - used);
    setResult({ avail, total, used });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">🧮</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">PTO Accrual Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Calculate earned PTO balances and carryover hours.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Accrual Rate (hrs/period)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={rate} onChange={e => setRate(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Periods Worked</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={periods} onChange={e => setPeriods(+e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">PTO Hours Used</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={used} onChange={e => setUsed(+e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Calculate PTO Balance
      </button>
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
          <span className="block font-bold text-emerald-800 dark:text-emerald-400 uppercase">Available PTO</span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">{result.avail.toFixed(1)} Hours ({ (result.avail/8).toFixed(1) } Days)</span>
        </div>
      )}
    </div>
  );
}

// 2. Overtime Pay Calculator
export function OvertimeCalculatorCard() {
  const [rate, setRate] = useState(25);
  const [regHrs, setRegHrs] = useState(40);
  const [otHrs, setOtHrs] = useState(8);
  const [dtHrs, setDtHrs] = useState(2);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const reg = regHrs * rate;
    const ot = otHrs * (rate * 1.5);
    const dt = dtHrs * (rate * 2.0);
    setResult({ total: reg + ot + dt, reg, ot, dt });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">⏰</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Overtime & FLSA Pay Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Compute regular pay, 1.5x overtime, and 2.0x double-time rates.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Base Wage ($/hr)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={rate} onChange={e => setRate(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Regular Hours</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={regHrs} onChange={e => setRegHrs(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Overtime (1.5x) Hrs</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={otHrs} onChange={e => setOtHrs(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Double Time (2.0x) Hrs</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={dtHrs} onChange={e => setDtHrs(+e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Calculate Gross Pay
      </button>
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
          <span className="block font-bold text-emerald-800 dark:text-emerald-400 uppercase">Gross Paycheck</span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">${result.total.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

// 3. Severance Pay Estimator
export function SeveranceCalculatorCard() {
  const [weekly, setWeekly] = useState(1500);
  const [years, setYears] = useState(4);
  const [weeksPerYr, setWeeksPerYr] = useState(2);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const weeks = years * weeksPerYr;
    setResult({ total: weeks * weekly, weeks });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">💼</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Severance Pay Estimator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Estimate exit packages based on tenure and weekly salary.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Weekly Salary ($)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={weekly} onChange={e => setWeekly(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Years of Service</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={years} onChange={e => setYears(+e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Severance Weeks per Year</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={weeksPerYr} onChange={e => setWeeksPerYr(+e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Estimate Severance
      </button>
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
          <span className="block font-bold text-emerald-800 dark:text-emerald-400 uppercase">Estimated Severance</span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">${result.total.toFixed(2)} ({result.weeks} Weeks Pay)</span>
        </div>
      )}
    </div>
  );
}

// 4. FLSA Exemption Status Checker
export function FlsaCheckerCard() {
  const [salary, setSalary] = useState(45000);
  const [duties, setDuties] = useState('executive');
  const [result, setResult] = useState(null);

  const checkExemption = () => {
    // FLSA threshold approx $35,568 / $43,888+ annually
    const salaryQualifies = salary >= 35568;
    let status = 'Non-Exempt (Eligible for Overtime)';
    let color = 'amber';

    if (salaryQualifies && (duties === 'executive' || duties === 'administrative' || duties === 'professional' || duties === 'computer')) {
      status = 'Exempt (Salaried - Not Eligible for Overtime)';
      color = 'emerald';
    } else if (!salaryQualifies) {
      status = 'Non-Exempt (Below Salary Threshold - Eligible for OT)';
      color = 'amber';
    }

    setResult({ status, color, salaryQualifies });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">⚖️</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">FLSA Exemption Status Checker</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Determine Exempt vs Non-Exempt status for US FLSA overtime compliance.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Salary ($)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={salary} onChange={e => setSalary(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Job Duty Category</label>
          <select className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={duties} onChange={e => setDuties(e.target.value)}>
            <option value="executive">Executive / Managerial</option>
            <option value="administrative">Administrative / Operations</option>
            <option value="professional">Learned Professional</option>
            <option value="computer">Computer Specialist / Dev</option>
            <option value="manual">Manual Labor / Operational</option>
          </select>
        </div>
      </div>
      <button onClick={checkExemption} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Check Exemption Status
      </button>
      {result && (
        <div className={`mt-4 p-3 bg-${result.color}-50 dark:bg-${result.color}-950/40 border border-${result.color}-200 dark:border-${result.color}-800 rounded-lg text-xs`}>
          <span className="block font-bold text-slate-800 dark:text-slate-200 uppercase">FLSA Classification Result</span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white">{result.status}</span>
        </div>
      )}
    </div>
  );
}

// 5. Cost-Per-Hire Calculator
export function CostPerHireCard() {
  const [ads, setAds] = useState(1200);
  const [agency, setAgency] = useState(3000);
  const [recruiterHrs, setRecruiterHrs] = useState(25);
  const [hrRate, setHrRate] = useState(50);
  const [hires, setHires] = useState(2);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const internalCost = recruiterHrs * hrRate;
    const externalCost = ads + agency;
    const totalCost = internalCost + externalCost;
    const costPerHire = totalCost / (hires || 1);
    setResult({ totalCost, costPerHire });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">🎯</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Cost-Per-Hire Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Calculate recruiting efficiency and total expense per new hire.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Ads & Sourcing ($)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={ads} onChange={e => setAds(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Agency Fees ($)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={agency} onChange={e => setAgency(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Internal HR Hours Spent</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={recruiterHrs} onChange={e => setRecruiterHrs(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Hires Made</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={hires} onChange={e => setHires(+e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Calculate Cost-Per-Hire
      </button>
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
          <span className="block font-bold text-emerald-800 dark:text-emerald-400 uppercase">Average Cost Per Hire</span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">${result.costPerHire.toFixed(2)} (${result.totalCost.toFixed(0)} total)</span>
        </div>
      )}
    </div>
  );
}

// 6. FMLA Leave Checker
export function FmlaCheckerCard() {
  const [months, setMonths] = useState(14);
  const [hours, setHours] = useState(1300);
  const [headcount, setHeadcount] = useState(60);
  const [result, setResult] = useState(null);

  const checkFmla = () => {
    const eligible = months >= 12 && hours >= 1250 && headcount >= 50;
    setResult({ eligible });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">🏥</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">FMLA Leave Eligibility Checker</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Evaluate 12-week unpaid job-protected medical leave criteria.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tenure Months</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={months} onChange={e => setMonths(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hours Worked in Past 12mo</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={hours} onChange={e => setHours(+e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Headcount within 75 Miles</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={headcount} onChange={e => setHeadcount(+e.target.value)} />
        </div>
      </div>
      <button onClick={checkFmla} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Check FMLA Eligibility
      </button>
      {result && (
        <div className={`mt-4 p-3 bg-${result.eligible ? 'emerald' : 'amber'}-50 dark:bg-${result.eligible ? 'emerald' : 'amber'}-950/40 border border-${result.eligible ? 'emerald' : 'amber'}-200 dark:border-${result.eligible ? 'emerald' : 'amber'}-800 rounded-lg text-xs`}>
          <span className="block font-bold uppercase">{result.eligible ? 'Eligible for 12 Weeks FMLA Leave' : 'Not FMLA Eligible'}</span>
          <span className="text-xs">{result.eligible ? 'Employee meets tenure (12mo+), hours (1250h+), and company headcount (50+)' : 'Requires min 12mo tenure, 1250 hours worked, and 50+ employees'}</span>
        </div>
      )}
    </div>
  );
}

// 7. Salary Band Estimator
export function SalaryBandCard() {
  const [midpoint, setMidpoint] = useState(90000);
  const [spread, setSpread] = useState(20);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const min = midpoint * (1 - spread / 100);
    const max = midpoint * (1 + spread / 100);
    setResult({ min, max, midpoint });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">📊</div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Salary Range & Band Estimator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Structure min, midpoint, and max salary ranges for job bands.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Midpoint ($)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={midpoint} onChange={e => setMidpoint(+e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Band Spread (+/- %)</label>
          <input type="number" className="w-full border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded" value={spread} onChange={e => setSpread(+e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-all">
        Calculate Salary Range
      </button>
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
          <span className="block font-bold text-emerald-800 dark:text-emerald-400 uppercase">Calculated Salary Band</span>
          <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Min: ${result.min.toLocaleString()} | Mid: ${result.midpoint.toLocaleString()} | Max: ${result.max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
