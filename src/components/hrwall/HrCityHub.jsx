import React, { useState } from 'react';
import { Building2, Cpu, Waves, Gem, Factory, Landmark, Ship, Shirt } from 'lucide-react';
import { indianCities } from '../../data/hrWallData';

const cityIcons = {
  'building-2': Building2,
  cpu: Cpu,
  waves: Waves,
  gem: Gem,
  factory: Factory,
  landmark: Landmark,
  ship: Ship,
  shirt: Shirt,
};

function CityIcon({ icon, className }) {
  const Icon = cityIcons[icon] || Building2;
  return <Icon className={className} strokeWidth={1.75} />;
}

export default function HrCityHub() {
  const [selectedCity, setSelectedCity] = useState(indianCities[0]);

  return (
    <section className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Regional HR Networks Across India
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            India HR Map & City Networks
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Discover HR professionals, active job openings, and local meetups across India's top economic hubs.
          </p>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {indianCities.map(city => (
            <div
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`p-5 rounded-md cursor-pointer border transition-all ${
                selectedCity.name === city.name
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <CityIcon icon={city.icon} className={`w-6 h-6 mb-2 ${selectedCity.name === city.name ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
              <h3 className="font-extrabold text-lg mb-1">{city.name}</h3>
              <p className={`text-xs ${selectedCity.name === city.name ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {city.members} HR Members
              </p>
              <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                selectedCity.name === city.name ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
              }`}>
                {city.jobs}
              </span>
            </div>
          ))}
        </div>

        {/* Selected City Detail Banner */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CityIcon icon={selectedCity.icon} className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedCity.name} HR Ecosystem</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Key Sectors & Hubs: <strong className="text-slate-800 dark:text-slate-200">{selectedCity.topSector}</strong>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-md">
              View {selectedCity.name} Members
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-md">
              View {selectedCity.name} Jobs
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
