import React, { useState } from 'react';
import HrWallNavbar from './components/hrwall/HrWallNavbar';
import HrWallHero from './components/hrwall/HrWallHero';
import HrMemberDirectory from './components/hrwall/HrMemberDirectory';
import HrWallFeed from './components/hrwall/HrWallFeed';
import HrCircles from './components/hrwall/HrCircles';
import HrAiAssistant from './components/hrwall/HrAiAssistant';
import HrComplianceCalendar from './components/hrwall/HrComplianceCalendar';
import HrSalaryBenchmark from './components/hrwall/HrSalaryBenchmark';
import HrCityHub from './components/hrwall/HrCityHub';
import HrResourceHub from './components/hrwall/HrResourceHub';
import HrJobsPortal from './components/hrwall/HrJobsPortal';
import HrMentorMarketplace from './components/hrwall/HrMentorMarketplace';
import HrWallOfFame from './components/hrwall/HrWallOfFame';
import HrPricingTiers from './components/hrwall/HrPricingTiers';
import MemberProfileModal from './components/hrwall/MemberProfileModal';
import LogoMark from './components/hrwall/LogoMark';
import Reveal from './components/hrwall/Reveal';
import StatCounter from './components/hrwall/StatCounter';
import { hrWallStats } from './data/hrWallData';

export default function App() {
  const [activeTab, setActiveTab] = useState('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-100 font-sans antialiased transition-colors">
        
        {/* Navigation Bar */}
        <HrWallNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
        />

        {/* Hero Section */}
        <HrWallHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectCategory={(cat) => setActiveTab(cat)}
        />

        {/* Tabbed Content View */}
        <main>
          {activeTab === 'directory' && (
            <HrMemberDirectory
              searchQuery={searchQuery}
              onSelectMember={setSelectedMember}
            />
          )}

          {activeTab === 'feed' && (
            <HrWallFeed />
          )}

          {activeTab === 'circles' && (
            <HrCircles />
          )}

          {activeTab === 'ai-assistant' && (
            <HrAiAssistant />
          )}

          {activeTab === 'compliance' && (
            <HrComplianceCalendar />
          )}

          {activeTab === 'salary-benchmark' && (
            <HrSalaryBenchmark />
          )}

          {activeTab === 'cities' && (
            <HrCityHub />
          )}

          {activeTab === 'resources' && (
            <HrResourceHub />
          )}

          {activeTab === 'jobs' && (
            <HrJobsPortal />
          )}

          {activeTab === 'mentors' && (
            <HrMentorMarketplace />
          )}

          {activeTab === 'walloffame' && (
            <HrWallOfFame />
          )}

          {activeTab === 'pricing' && (
            <HrPricingTiers />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-ink-900 text-ink-200 border-t border-ink-700">

          {/* Live stats strip — what the community adds up to, not a slogan */}
          <div className="border-b border-ink-700">
            <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              {[
                { label: 'HR Professionals', value: hrWallStats.members },
                { label: 'Cities Covered', value: hrWallStats.cities },
                { label: 'Live Job Openings', value: hrWallStats.jobs },
                { label: 'Shared Resources', value: hrWallStats.resources },
              ].map((stat, index) => (
                <Reveal key={stat.label} delay={index * 90} duration={550} distance={10}>
                  <div>
                    <p className="font-display text-xl text-paper-50">
                      <StatCounter value={stat.value} />
                    </p>
                    <p className="text-[11px] text-ink-300 uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10 text-xs">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 text-paper-50 font-semibold text-lg mb-3">
                <LogoMark size={30} />
                <span className="font-display">The HR Wall</span>
              </div>
              <p className="text-ink-200/70 leading-relaxed max-w-xs">
                Built for HRBPs, recruiters and payroll teams who are tired of Googling "PF due date this month" alone — this is where India's HR crowd compares notes, salary bands and the occasional bad manager story.
              </p>
              <button
                onClick={() => setActiveTab('pricing')}
                className="mt-5 inline-flex items-center gap-1.5 bg-brass-500 hover:bg-brass-400 text-ink-900 text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
              >
                Join Free Community
              </button>
            </div>

            {/* Grouped by what a member actually does on the platform */}
            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Grow Your Career</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('directory')} className="hover:text-brass-400 transition-colors">Build Your HR Profile</button></li>
                <li><button onClick={() => setActiveTab('salary-benchmark')} className="hover:text-brass-400 transition-colors">Benchmark Your Salary</button></li>
                <li><button onClick={() => setActiveTab('mentors')} className="hover:text-brass-400 transition-colors">Find a Mentor</button></li>
                <li><button onClick={() => setActiveTab('walloffame')} className="hover:text-brass-400 transition-colors">Wall of Fame</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Connect &amp; Get Hired</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('feed')} className="hover:text-brass-400 transition-colors">Community Feed</button></li>
                <li><button onClick={() => setActiveTab('circles')} className="hover:text-brass-400 transition-colors">Join an HR Circle</button></li>
                <li><button onClick={() => setActiveTab('jobs')} className="hover:text-brass-400 transition-colors">Browse HR Jobs</button></li>
                <li><button onClick={() => setActiveTab('cities')} className="hover:text-brass-400 transition-colors">Your City's HR Network</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Work Smarter</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('ai-assistant')} className="hover:text-brass-400 transition-colors">Ask the AI HR Assistant</button></li>
                <li><button onClick={() => setActiveTab('compliance')} className="hover:text-brass-400 transition-colors">Compliance Calendar</button></li>
                <li><button onClick={() => setActiveTab('resources')} className="hover:text-brass-400 transition-colors">Templates &amp; Resources</button></li>
                <li><button onClick={() => setActiveTab('pricing')} className="hover:text-brass-400 transition-colors">Plans for Teams</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-ink-700">
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-ink-300">
              <p>&copy; 2026 The HR Wall Platform. All rights reserved across India.</p>
              <p className="font-display text-paper-100/80">&ldquo;PF dates, pay bands, and people who actually get it.&rdquo;</p>
            </div>
          </div>
        </footer>

        {/* Member Profile Modal */}
        <MemberProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />

      </div>
    </div>
  );
}
