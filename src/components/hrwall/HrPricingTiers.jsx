import React from 'react';
import { Check } from 'lucide-react';
import { hrMembershipTiers } from '../../data/hrWallData';

export default function HrPricingTiers() {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Flexible Community Membership Plans
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Join The HR Wall Community
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Choose a plan to build your personal HR brand, connect with recruiters, and access premium tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {hrMembershipTiers.map(tier => (
            <div
              key={tier.name}
              className={`bg-white dark:bg-slate-800 border rounded-2xl p-8 flex flex-col justify-between relative transition-all ${
                tier.popular
                  ? 'border-blue-600 shadow-2xl scale-[1.03]'
                  : 'border-slate-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  Most Popular for HR Professionals
                </span>
              )}

              <div>
                <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded border mb-4 ${tier.badgeColor}`}>
                  {tier.name} Tier
                </span>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-xs text-slate-500 font-bold">{tier.period}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{tier.tagline}</p>

                <ul className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300 mb-8 border-t border-slate-100 dark:border-slate-700 pt-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => alert(`Selected ${tier.name} Plan via Razorpay Payment Gateway`)}
                className={`w-full font-bold py-3 rounded-xl text-xs transition-all ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
