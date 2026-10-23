import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JourneySection() {
  const journeyRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useLayoutEffect(() => {
    const journeyEl = journeyRef.current;
    const path = pathRef.current;
    const pl = planeRef.current;
    if (!journeyEl || !path || !pl) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const L = path.getTotalLength();

    function updatePlane(p) {
      const t = path.getPointAtLength(L * p);
      const a = path.getPointAtLength(Math.max(0, L * p - 1));
      const b = path.getPointAtLength(Math.min(L, L * p + 1));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      pl.setAttribute('transform', `translate(${t.x} ${t.y}) rotate(${angle}) scale(1.4)`);
    }

    if (rm) {
      path.style.strokeDasharray = `${L}`;
      path.style.strokeDashoffset = '0';
      updatePlane(1);
      const st = [...journeyEl.querySelectorAll('.stage')];
      st.forEach(s => s.classList.add('on'));
      return;
    }

    const ctx = gsap.context(() => {
      path.style.strokeDasharray = `${L}`;
      path.style.strokeDashoffset = `${L}`;
      updatePlane(0);

      const st = [...journeyEl.querySelectorAll('.stage')];

      ScrollTrigger.create({
        trigger: journeyEl,
        start: 'top top',
        end: '+=2400',
        pin: true,
        scrub: true,
        onUpdate: s => {
          const p = s.progress;
          path.style.strokeDashoffset = `${L * (1 - p)}`;
          updatePlane(p);
          const i = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
          journeyEl.dataset.s = i;
          st.forEach((e, k) => e.classList.toggle('on', k === i));
        }
      });

      // Section transition clip-path
      gsap.fromTo(
        journeyEl,
        { clipPath: 'inset(10% 6% 0 6% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: journeyEl,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.8
          }
        }
      );
    }, journeyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={journeyRef}
      className="journey"
      id="journey"
      aria-label="The Airgen pilot journey"
    >
      <div className="in">
        <div className="stages">
          <div className="stage on">
            <div className="q">Stage 1 &middot; Thinking &mdash; Discover your aviation path</div>
            <h2>Should I become a pilot?</h2>
            <p>
              Career discovery, eligibility, medical guidance, licence pathway and financial planning &mdash; shaped into a personalised roadmap.
            </p>
          </div>
          <div className="stage">
            <div className="q">Stage 2 &middot; Training &mdash; Build your pilot competencies</div>
            <h2>How do I become a competent pilot?</h2>
            <p>
              DGCA ground school with live classes, recorded modules, CBT and test series, built on Attitude, Skills and Knowledge.
            </p>
          </div>
          <div className="stage">
            <div className="q">Stage 3 &middot; Airline career &mdash; From First Officer to Captain</div>
            <h2>How do I become an airline captain?</h2>
            <p>
              Airline readiness, selection preparation, First Officer development and the competencies that lead toward command.
            </p>
          </div>
        </div>

        <svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path className="ghost" d="M20 310 C250 310 300 210 480 190 S760 90 980 30" />
          <path id="fp" ref={pathRef} d="M20 310 C250 310 300 210 480 190 S760 90 980 30" />
          <g id="pl" ref={planeRef}>
            <path d="M16 0L-12 -4L-14 0L-12 4Z" fill="#fff" />
            <path d="M4 0L-6 -14L-2 -14L10 0L-2 14L-6 14Z" fill="#fff" />
          </g>
          <text x="130" y="336">Think</text>
          <text x="450" y="226">Train</text>
          <text x="900" y="66">Airline career</text>
        </svg>
      </div>
    </section>
  );
}
