import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STUDENT_BENEFITS } from '../data/valuesData';

const DIAL_TIPS = [
  'Situational awareness: knowing what is happening around you and what is likely to happen next. In ASK it is built through weather interpretation and scenario work.',
  'Decision making: choosing a safe course of action under time pressure. In ASK it is built through scenario-based questions and judgement exercises.',
  'Workload management: prioritising tasks so nothing is missed when things get busy. Airgen trains it through cross-country planning and Threat and Error Management.'
];

const DIAL_LABELS = ['Situational awareness', 'Decision making', 'Workload management'];

export default function PlatformOverviewSection({ onOpenPage }) {
  const [selectedDial, setSelectedDial] = useState(null);
  const sectionRef = useRef(null);
  const dialsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      dialsRef.current.forEach((g, i) => {
        if (!g) return;
        const needle = g.querySelector('.nd');
        if (!needle) return;

        gsap.fromTo(
          needle,
          { rotation: -120, svgOrigin: '100 100' },
          {
            rotation: [40, 110, -30][i],
            svgOrigin: '100 100',
            ease: 'none',
            scrollTrigger: {
              trigger: g,
              start: 'top 90%',
              end: 'bottom 30%',
              scrub: true
            }
          }
        );
      });

      gsap.from('.svc dl > *', {
        opacity: 0,
        y: 24,
        stagger: 0.06,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.svc dl',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDialClick = (idx) => {
    setSelectedDial(idx);
  };

  return (
    <section className="svc" ref={sectionRef}>
      <div className="wrap">
        <h2>Think like a professional pilot.</h2>
        <p style={{ color: '#B9CADB', margin: '1rem 0 44px' }}>
          Sound judgement, communication and risk management, practised until they become instinct.
        </p>

        <div className="deck">
          {DIAL_LABELS.map((label, idx) => (
            <figure
              key={idx}
              role="button"
              tabIndex={0}
              aria-pressed={selectedDial === idx}
              className={selectedDial === idx ? 'sel' : ''}
              onClick={() => handleDialClick(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDialClick(idx);
                }
              }}
            >
              <svg
                ref={(el) => (dialsRef.current[idx] = el)}
                className="gauge2"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="92" fill="#0A1626" stroke="#8FA4BA" strokeWidth="3" />
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#3A5573"
                  strokeWidth="10"
                  strokeDasharray="3 12.3"
                />
                <line
                  className="nd"
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="34"
                  stroke="#F2A33A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="5" fill="#F2A33A" />
              </svg>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>

        <p className="dtip" id="dtip" aria-live="polite">
          {selectedDial !== null ? DIAL_TIPS[selectedDial] : 'Tap a dial to see how Airgen trains it.'}
        </p>

        <h2 style={{ marginTop: '90px' }}>What you get as a student</h2>

        <figure className="photo">
          <img
            src="/assets/photo-classroom.jpg"
            alt="Instructor teaching flight theory to student pilots in a classroom"
            loading="lazy"
          />
          <figcaption>
            Live and recorded classes for DGCA, FAA and EASA aspirants · illustrative image
          </figcaption>
        </figure>

        <dl>
          {STUDENT_BENEFITS.map((item, idx) => (
            <React.Fragment key={idx}>
              <dt>{item.title}</dt>
              <dd>{item.desc}</dd>
            </React.Fragment>
          ))}
        </dl>

        <p style={{ marginTop: '36px' }}>
          <button
            className="lnk"
            style={{ color: '#fff' }}
            onClick={() => onOpenPage('platform')}
          >
            Explore the learning platform →
          </button>
        </p>
      </div>
    </section>
  );
}
