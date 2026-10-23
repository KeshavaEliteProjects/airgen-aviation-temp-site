import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DialGauge, SvgIcon, SI } from '../utils/icons';

gsap.registerPlugin(ScrollTrigger);

const DIALS = [
  {
    caption: 'Situational awareness',
    tip: 'Situational awareness: knowing what is happening around you and what is likely to happen next. In ASK it is built through weather interpretation and scenario work.'
  },
  {
    caption: 'Decision making',
    tip: 'Decision making: choosing a safe course of action under time pressure. In ASK it is built through scenario-based questions and judgement exercises.'
  },
  {
    caption: 'Workload management',
    tip: 'Workload management: prioritising tasks so nothing is missed when things get busy. Airgen trains it through cross-country planning and Threat and Error Management.'
  }
];

const STUDENT_OFFERINGS = [
  { title: 'Live classes and recorded modules', desc: 'Aviation theory for DGCA aspirants.' },
  { title: 'CBT learning and test series', desc: 'Exam preparation with assessments and performance analytics.' },
  { title: 'Study materials', desc: 'Digital resources in one learning platform with mobile learning.' },
  { title: 'Mentorship', desc: 'Personalised guidance and progress reviews.' },
  { title: 'Class 1 medical guidance', desc: 'Support through the medical step of the pilot pathway.' },
  { title: 'Computer number assistance', desc: 'Help with the paperwork that starts DGCA training.' },
  { title: 'Aviation career planning', desc: 'From the first roadmap to airline selection.' }
];

export default function InstrumentsSection({ onOpenPage }) {
  const sectionRef = useRef(null);
  const [selectedDial, setSelectedDial] = useState(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      // Needles rotation scrub
      const gauges = gsap.utils.toArray('.gauge2');
      const targetRotations = [40, 110, -30];
      gauges.forEach((g, i) => {
        const nd = g.querySelector('.nd');
        if (nd) {
          gsap.fromTo(
            nd,
            { rotation: -120, svgOrigin: '100 100' },
            {
              rotation: targetRotations[i],
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
        }
      });

      // Heading clipPath
      gsap.fromTo(
        '.svc h2',
        { clipPath: 'inset(0 0 100% 0)', y: 36, opacity: 0 },
        {
          clipPath: 'inset(0 0 -10% 0)',
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.svc h2', start: 'top 88%', refreshPriority: -1 }
        }
      );

      // Dl items staggered reveal
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

  const handleDialClick = idx => {
    setSelectedDial(idx);
  };

  return (
    <section ref={sectionRef} className="svc">
      <div className="wrap">
        <h2>Think like a professional pilot.</h2>
        <p style={{ color: '#B9CADB', margin: '1rem 0 44px' }}>
          Sound judgement, communication and risk management, practised until they become instinct.
        </p>

        <div className="deck">
          {DIALS.map((dial, idx) => (
            <figure
              key={idx}
              role="button"
              tabIndex={0}
              aria-pressed={selectedDial === idx}
              className={selectedDial === idx ? 'sel' : ''}
              onClick={() => handleDialClick(idx)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDialClick(idx);
                }
              }}
            >
              <DialGauge />
              <figcaption>{dial.caption}</figcaption>
            </figure>
          ))}
        </div>

        <p className="dtip" id="dtip" aria-live="polite">
          {selectedDial !== null
            ? DIALS[selectedDial].tip
            : 'Tap a dial to see how Airgen trains it.'}
        </p>

        <h2 style={{ marginTop: '90px' }}>What you get as a student</h2>

        <figure className="photo">
          <img
            src="/assets/photo-classroom.jpg"
            alt="Instructor teaching flight theory to student pilots in a classroom"
            loading="lazy"
          />
          <figcaption>Live and recorded classes for DGCA aspirants &middot; illustrative image</figcaption>
        </figure>

        <dl>
          {STUDENT_OFFERINGS.map((item, idx) => (
            <React.Fragment key={idx}>
              <dt>
                <SvgIcon d={SI[idx]} />
                {item.title}
              </dt>
              <dd>{item.desc}</dd>
            </React.Fragment>
          ))}
        </dl>

        <p style={{ marginTop: '36px' }}>
          <button
            className="lnk"
            style={{ color: '#fff' }}
            data-page="platform"
            onClick={() => onOpenPage('platform')}
          >
            Explore the learning platform &rarr;
          </button>
        </p>
      </div>
    </section>
  );
}
