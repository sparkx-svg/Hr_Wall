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
        <footer className="bg-ink-900 text-ink-200 py-16 px-6 border-t border-ink-700">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            <div>
              <div className="flex items-center gap-2.5 text-paper-50 font-semibold text-lg mb-3">
                <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
                  <circle cx="19" cy="19" r="18" className="fill-paper-100" />
                  <circle cx="19" cy="19" r="18" strokeDasharray="1.5 3" className="stroke-brass-400" strokeWidth="1" fill="none" />
                  <text x="19" y="24" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="16" fontWeight="600" className="fill-ink-900">W</text>
                </svg>
                <span className="font-display">The HR Wall</span>
              </div>
              <p className="text-ink-200/70 leading-relaxed">
                India's largest community-driven HR professional network and solution platform. Built exclusively for HR professionals, recruiters, HRBPs, and organizations across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Platform Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('directory')} className="hover:text-brass-400 transition-colors">HR Directory &amp; Reputation Scores</button></li>
                <li><button onClick={() => setActiveTab('feed')} className="hover:text-brass-400 transition-colors">Community Feed</button></li>
                <li><button onClick={() => setActiveTab('circles')} className="hover:text-brass-400 transition-colors">HR Circles</button></li>
                <li><button onClick={() => setActiveTab('ai-assistant')} className="hover:text-brass-400 transition-colors">AI HR Assistant</button></li>
                <li><button onClick={() => setActiveTab('compliance')} className="hover:text-brass-400 transition-colors">Compliance Calendar</button></li>
                <li><button onClick={() => setActiveTab('salary-benchmark')} className="hover:text-brass-400 transition-colors">Salary Benchmarking</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Top Indian Hubs</h4>
              <ul className="space-y-2 text-ink-200/70">
                <li>Chennai HR Chapter</li>
                <li>Bangalore HR Ecosystem</li>
                <li>Mumbai &amp; Pune Network</li>
                <li>Delhi NCR &amp; Hyderabad Hubs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-paper-50 uppercase tracking-wider mb-3">Tagline</h4>
              <p className="font-display text-paper-100 text-sm mb-2">&ldquo;Connect. Learn. Hire. Grow.&rdquo;</p>
              <p className="text-ink-300">&copy; 2026 The HR Wall Platform. All rights reserved across India.</p>
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
