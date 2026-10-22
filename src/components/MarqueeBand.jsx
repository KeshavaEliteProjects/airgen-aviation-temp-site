import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MarqueeBand() {
  const bandRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bandRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: bandRef.current,
            start: 'top 95%',
            end: 'top 55%',
            scrub: 0.8
          }
        }
      );
    }, bandRef);

    return () => ctx.revert();
  }, []);

  const items = [
    'DGCA', 'FAA', 'EASA', 'Ground school', 'CBT', 'Mentorship', 'Command',
    'DGCA', 'FAA', 'EASA', 'Ground school', 'CBT', 'Mentorship', 'Command'
  ];

  return (
    <div className="band" ref={bandRef} aria-hidden="true">
      <div>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {item}
            <span>✈</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
