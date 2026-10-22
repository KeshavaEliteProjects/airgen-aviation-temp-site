import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREER_STEPS } from '../data/careerSteps';
import SvgIcon from './SvgIcon';

const PANEL_ICONS = [
  'M9 3h6v3H9z|M7 5H5v16h14V5h-2|M9 13l2 2 4-4',
  'M4 5h16v11H9l-5 4z|M8 9h8|M8 12h5',
  'M4 4h7v7H4z|M13 4h7v7h-7z|M4 13h7v7H4z|M17 13l3 7h-6z',
  'M3 5h18v11H3z|M8 20h8|M12 16v4',
  'M3 6h18|M3 11h18|M3 16h18',
  'M3 4h18|M3 9h18|M3 14h18|M3 19h18'
];

export default function CareerTrack() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const barRef = useRef(null);
  const hsRef = useRef(null);
  const hprogRef = useRef(null);
  const panelsRef = useRef([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tr = trackRef.current;
    const hz = sectionRef.current;
    const pin = pinRef.current;
    const bar = barRef.current;
    const hs = hsRef.current;
    const hprog = hprogRef.current;
    const ps = panelsRef.current.filter(Boolean);

    if (!tr || !hz || !pin || !bar) return;

    let walkingTimeout = null;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 801px)', () => {
      hz.classList.add('live');
      if (ps[0]) ps[0].classList.add('act');

      gsap.fromTo(
        '.hz .head',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: hz,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.8
          }
        }
      );

      gsap.to(tr, {
        x: () => -(tr.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => '+=' + (tr.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const i = Math.min(5, Math.round(s.progress * 5));
            setCurrentStep(i);
            setIsComplete(s.progress > 0.99);

            bar.style.width = s.progress * 100 + '%';
            if (hs) {
              hs.textContent = `Step ${i + 1} of 6${s.progress > 0.99 ? ' · complete' : ''}`;
            }

            ps.forEach((p, k) => {
              if (p) p.classList.toggle('act', k === i);
            });

            if (hprog) {
              hprog.classList.add('walking');
              clearTimeout(walkingTimeout);
              walkingTimeout = setTimeout(() => {
                hprog.classList.remove('walking');
              }, 220);

              const uEls = hprog.querySelectorAll('u');
              uEls.forEach((u, k) => {
                u.classList.toggle('on', s.progress >= k / 5 - 0.001);
              });
            }
          }
        }
      });

      return () => {
        hz.classList.remove('live');
        clearTimeout(walkingTimeout);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hz" id="career" ref={sectionRef}>
      <div className="head">
        <h2>Stage 3: from ATPL graduate to airline pilot to Captain.</h2>
        <p style={{ marginTop: '1rem' }}>
          Airgen continues beyond examinations. The aim is not simply to get a pilot job, but to
          build the competencies required to progress toward command.
        </p>
      </div>

      <div className="pin" ref={pinRef}>
        <div className="hprog" ref={hprogRef} aria-hidden="true">
          <span id="hs" ref={hsRef}>
            Step {currentStep + 1} of 6{isComplete ? ' · complete' : ''}
          </span>
          <b>
            <u className="on" style={{ left: '0%' }}></u>
            <u style={{ left: '20%' }}></u>
            <u style={{ left: '40%' }}></u>
            <u style={{ left: '60%' }}></u>
            <u style={{ left: '80%' }}></u>
            <u style={{ left: '100%' }}></u>
            <i id="hbar" ref={barRef}>
              <span className="walker">
                <svg viewBox="0 0 24 34">
                  <circle cx="12" cy="5" r="3.4" fill="#0D1B2E" />
                  <path d="M12 8.6V19" stroke="#0D1B2E" strokeWidth="2.4" strokeLinecap="round" />
                  <path className="ar ar1" d="M12 11L8 18" />
                  <path className="ar ar2" d="M12 11L16 18" />
                  <path className="lg lg1" d="M12 19L9 31" />
                  <path className="lg lg2" d="M12 19L15 31" />
                </svg>
              </span>
            </i>
          </b>
        </div>

        <div className="track" id="track" ref={trackRef}>
          {CAREER_STEPS.map((step, idx) => (
            <article
              key={step.step}
              className="panel"
              ref={(el) => (panelsRef.current[idx] = el)}
            >
              <SvgIcon pathString={PANEL_ICONS[idx]} />
              <div className="n">{step.step}</div>
              <h3>{step.title}</h3>

              {step.subtitle && <p className="pn">{step.subtitle}</p>}

              {step.sections ? (
                step.sections.map((sec, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <p className="gl">{sec.label}</p>
                    <div className="tg">
                      {sec.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <div className="tg">
                  {step.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
              )}

              {step.goal && (
                <>
                  <p className="gl">Goal</p>
                  <div className="tg">
                    <span>{step.goal}</span>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
