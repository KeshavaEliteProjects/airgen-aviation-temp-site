import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SvgIcon, RI } from '../utils/icons';
import { ROADMAP_DATA } from '../utils/roadmapData';

gsap.registerPlugin(ScrollTrigger);

const ROADMAP_STEPS = ROADMAP_DATA.map(s => s.title);

function RoadmapPopup({ index, onClose, onChange, onDemo, onMentor }) {
  const closeRef = useRef(null);
  const open = index !== null;
  const d = open ? ROADMAP_DATA[index] : null;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onChange(Math.min(ROADMAP_DATA.length - 1, index + 1));
      else if (e.key === 'ArrowLeft') onChange(Math.max(0, index - 1));
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, index, onClose, onChange]);

  if (!open) return null;

  return createPortal(
    <div className="rmpop" role="presentation" onClick={onClose}>
      <div
        className="rmcard"
        role="dialog"
        aria-modal="true"
        aria-label={d.title}
        onClick={e => e.stopPropagation()}
      >
        <button ref={closeRef} className="rmx" aria-label="Close" onClick={onClose}>
          &#x2715;
        </button>
        <div className="rmhead">
          <span className="rmico">
            <SvgIcon d={RI[index]} />
          </span>
          <div>
            <div className="rmstepn">
              Step {index + 1} of {ROADMAP_DATA.length}
            </div>
            <h3>{d.title}</h3>
          </div>
        </div>
        <p className="rmsum">{d.summary}</p>
        <ul className="rmkp">
          {d.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className="rmhelp">
          <b>How Airgen helps</b>
          <p>{d.help}</p>
        </div>
        <div className="rmact">
          <button
            className="btn rmdemo"
            onClick={() => {
              onClose();
              onDemo();
            }}
          >
            Book a 15-min demo call
          </button>
          <button
            className="btn rmmentor"
            onClick={() => {
              onClose();
              onMentor();
            }}
          >
            Talk to a mentor
          </button>
        </div>
        <div className="rmnav">
          <button disabled={index === 0} onClick={() => onChange(index - 1)}>
            &larr; Previous
          </button>
          <button disabled={index === ROADMAP_DATA.length - 1} onClick={() => onChange(index + 1)}>
            Next &rarr;
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function RoadmapSection({ onDemo, onMentor }) {
  const sectionRef = useRef(null);
  const olRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ol = olRef.current;
    const section = sectionRef.current;
    if (!ol || !section) return;

    if (rm) {
      ol.style.setProperty('--w', '83.4%');
      ol.querySelectorAll('li').forEach(l => l.classList.add('on'));
      return;
    }

    const ctx = gsap.context(() => {
      const rl = [...ol.querySelectorAll('li')];

      ScrollTrigger.create({
        trigger: ol,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: true,
        onUpdate: s => {
          ol.style.setProperty('--w', `${s.progress * 83.4}%`);
          rl.forEach((l, i) => l.classList.toggle('on', s.progress >= i / 5 - 0.001));
        }
      });

      const sc = (triggerEl, a, b) => ({
        trigger: triggerEl,
        start: a || 'top 85%',
        end: b || 'top 35%',
        scrub: 0.8
      });

      gsap.fromTo(
        '.road h2',
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', scrollTrigger: sc(section) }
      );
      gsap.fromTo(
        '.road .wrap > p',
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', scrollTrigger: sc(section) }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="road" id="roadmap">
      <div className="wrap">
        <h2>Should I become a pilot? Start with a roadmap.</h2>
        <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
          Stage 1 &middot; Thinking. Before any training begins, Airgen helps you decide, one step at a time.
        </p>
        <ol ref={olRef}>
          {ROADMAP_STEPS.map((step, idx) => (
            <li key={idx}>
              <button
                type="button"
                className="rmbtn"
                aria-haspopup="dialog"
                aria-label={`${step}: open details`}
                onClick={() => setOpenIdx(idx)}
              >
                <span className="dot">
                  <SvgIcon d={RI[idx]} />
                </span>
                <b>{step}</b>
                <small>Tap for details</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <RoadmapPopup
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onChange={setOpenIdx}
        onDemo={onDemo}
        onMentor={onMentor}
      />
    </section>
  );
}
