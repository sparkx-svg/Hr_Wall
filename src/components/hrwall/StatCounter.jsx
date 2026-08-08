import React, { useEffect, useRef, useState } from 'react';

// Splits "12,500+" into a numeric target (12500) and trailing label ("+"),
// or "150K+" into (150, "K+") — anything it can't parse it just renders as-is.
function parseValue(raw) {
  const match = String(raw).match(/^([\d,]+)(.*)$/);
  if (!match) return { target: null, suffix: raw };
  return { target: parseInt(match[1].replace(/,/g, ''), 10), suffix: match[2] };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a formatted stat ("12,500+") counting up from 0 the first
 * time it scrolls into view. Falls back to a static render for values
 * it can't parse as a number.
 */
export default function StatCounter({ value, duration = 1200, className = '' }) {
  const { target, suffix } = parseValue(value);
  const [display, setDisplay] = useState(target === null ? value : '0');
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.round(target * easeOutCubic(progress));
            setDisplay(current.toLocaleString('en-IN'));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}{suffix}
    </span>
  );
}
