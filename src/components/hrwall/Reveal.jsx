import React, { useEffect, useRef, useState } from 'react';

/**
 * Fades and rises children into place the first time they enter the
 * viewport (or immediately, for content already in view on load —
 * which is what gives the hero its page-load sequencing).
 *
 * Usage: <Reveal delay={120}><Card /></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  distance = 16,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0'
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
      }}
    >
      {children}
    </Tag>
  );
}
