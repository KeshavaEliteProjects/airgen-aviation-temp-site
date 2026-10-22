import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SvgIcon from './SvgIcon';

const ROADMAP_STEPS = [
  {
    title: 'Career discovery',
    icon: 'M5 14c0-4.5 3-8 7-8s7 3.5 7 8|M4 14h16l1 3.5H3z|M12 9.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 11.3l2-.3z'
  },
  {
    title: 'Eligibility',
    icon: 'M9 4h6v3H9z|M7 5.5H6a1 1 0 00-1 1V20a1 1 0 001 1h12a1 1 0 001-1V6.5a1 1 0 00-1-1h-1|M8.5 13l2.2 2.2 4.8-4.7'
  },
  {
    title: 'Medical guidance',
    icon: 'M4 3v5a5 5 0 0010 0V3|M9 13v2a4 4 0 008 0v-1.5|M17 9.5a2 2 0 110 4 2 2 0 010-4z'
  },
  {
    title: 'Licence pathway',
    icon: 'M3 5h18v14H3z|M8.2 10a1.8 1.8 0 103.6 0 1.8 1.8 0 10-3.6 0|M6 16c.5-2 2-3 4-3s3.5 1 4 3|M15 10h3|M15 13h3'
  },
  {
    title: 'Financial planning',
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18z|M8.5 8h7|M8.5 11h7|M9.5 8c3.8 0 5 1.4 5 3s-1.2 3-5 3L14.5 17'
  },
  {
    title: 'Personalised roadmap',
    icon: 'M16 3v10|M16 3l5.5 2.2-5.5 2.4|M4 20.5c4.5 0 4-4.5 8-4.5s3-3 4-3|M4 20.5h.01'
  }
];

export default function RoadmapSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.road h2',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(
        '.road .wrap > p',
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="road" ref={sectionRef}>
      <div className="wrap">
        <h2>Should I become a pilot? Start with a roadmap.</h2>
        <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
          Stage 1 · Thinking. Before any training begins, Airgen helps you decide, one step at a time.
        </p>

        <ol>
          {ROADMAP_STEPS.map((step, idx) => (
            <li key={idx}>
              <span className="dot">
                <SvgIcon pathString={step.icon} />
              </span>
              <b>{step.title}</b>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
