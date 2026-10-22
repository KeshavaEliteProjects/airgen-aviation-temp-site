import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function JourneySection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const path = pathRef.current;
    const plane = planeRef.current;
    const section = sectionRef.current;

    if (!path || !plane || !section) return;

    const L = path.getTotalLength();
    path.style.strokeDasharray = L;

    const updatePlanePosition = (p) => {
      const t = path.getPointAtLength(L * p);
      const a = path.getPointAtLength(Math.max(0, L * p - 1));
      const b = path.getPointAtLength(Math.min(L, L * p + 1));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      plane.setAttribute(
        'transform',
        `translate(${t.x} ${t.y}) rotate(${angle}) scale(1.4)`
      );
    };

    if (prefersReducedMotion) {
      path.style.strokeDashoffset = 0;
      updatePlanePosition(1);
      return;
    }

    path.style.strokeDashoffset = L;
    updatePlanePosition(0);

    const ctx = gsap.context(() => {
      // Journey clip-path transition
      gsap.fromTo(
        section,
        { clipPath: 'inset(10% 6% 0 6% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.8
          }
        }
      );

      // Pinned stages animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2400',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          path.style.strokeDashoffset = L * (1 - p);
          updatePlanePosition(p);
          const stageIdx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
          setActiveStage(stageIdx);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="journey" id="journey" ref={sectionRef} aria-label="The Airgen pilot journey">
      <div className="in">
        <div className="stages">
          <div className={`stage ${activeStage === 0 ? 'on' : ''}`}>
            <div className="q">Stage 1 · Thinking — Discover your aviation path</div>
            <h2>Should I become a pilot?</h2>
            <p>
              Career discovery, eligibility, medical guidance, licence pathway and financial
              planning — shaped into a personalised roadmap.
            </p>
          </div>

          <div className={`stage ${activeStage === 1 ? 'on' : ''}`}>
            <div className="q">Stage 2 · Training — Build your pilot competencies</div>
            <h2>How do I become a competent pilot?</h2>
            <p>
              DGCA, FAA and EASA ground school with live classes, recorded modules, CBT and test
              series, built on Attitude, Skills and Knowledge.
            </p>
          </div>

          <div className={`stage ${activeStage === 2 ? 'on' : ''}`}>
            <div className="q">Stage 3 · Airline career — From First Officer to Captain</div>
            <h2>How do I become an airline captain?</h2>
            <p>
              Airline readiness, selection preparation, First Officer development and the
              competencies that lead toward command.
            </p>
          </div>
        </div>

        <svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path className="ghost" d="M20 310 C250 310 300 210 480 190 S760 90 980 30" />
          <path ref={pathRef} id="fp" d="M20 310 C250 310 300 210 480 190 S760 90 980 30" />
          <g ref={planeRef} id="pl">
            <path d="M16 0L-12 -4L-14 0L-12 4Z" fill="#fff" />
            <path d="M4 0L-6 -14L-2 -14L10 0L-2 14L-6 14Z" fill="#fff" />
          </g>
          <text x="130" y="336">
            Think
          </text>
          <text x="450" y="226">
            Train
          </text>
          <text x="900" y="66">
            Airline career
          </text>
        </svg>
      </div>
    </section>
  );
}
