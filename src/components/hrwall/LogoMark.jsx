import React from 'react';

/**
 * The HR Wall logomark.
 *
 * Two coursed brick pillars joined by a brass crossbeam — reads as a
 * built "wall" (the brick coursing) and an "H" (HR) at once, with the
 * crossbeam standing in for the connective, community side of the
 * platform. Capped with a small brass keystone as the apex.
 */
export default function LogoMark({ size = 38, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="The HR Wall"
    >
      {/* Left pillar */}
      <rect x="8.5" y="8" width="7.5" height="25" rx="1.4" className="fill-ink-900 dark:fill-paper-100" />
      {/* Right pillar */}
      <rect x="24" y="8" width="7.5" height="25" rx="1.4" className="fill-ink-900 dark:fill-paper-100" />

      {/* Brick coursing joints, top segments */}
      <rect x="8.5" y="11.6" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />
      <rect x="24" y="11.6" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />

      {/* Brick coursing joints, bottom segments */}
      <rect x="8.5" y="25.8" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />
      <rect x="24" y="25.8" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />
      <rect x="8.5" y="29.7" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />
      <rect x="24" y="29.7" width="7.5" height="1.1" className="fill-paper-50 dark:fill-ink-900" opacity="0.85" />

      {/* Crossbeam joining the pillars */}
      <rect x="8.5" y="16.5" width="23" height="5.6" rx="1" className="fill-brass-400" />

      {/* Keystone accent at the apex */}
      <path d="M20 2.6L23 7H17L20 2.6Z" className="fill-brass-500" />
    </svg>
  );
}
