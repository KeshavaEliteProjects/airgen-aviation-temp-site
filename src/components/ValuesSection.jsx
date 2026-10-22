import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MISSION, VISION, CORE_VALUES } from '../data/valuesData';

export default function ValuesSection() {
  const sectionRef = useRef(null);
  const roseRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(roseRef.current, {
        rotation: 240,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.fromTo(
        sectionRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'top 45%',
            scrub: 0.8
          }
        }
      );

      gsap.from('.vl li', {
        opacity: 0,
        y: 24,
        stagger: 0.07,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.vl',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="values" id="about" ref={sectionRef}>
      <svg
        ref={roseRef}
        className="rose"
        viewBox="0 0 200 200"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
      >
        <g className="rg">
          <circle cx="100" cy="100" r="95" />
          <circle cx="100" cy="100" r="95" strokeDasharray="1 9.9" strokeWidth="6" />
          <circle cx="100" cy="100" r="70" />
          <path d="M100 5L112 88 195 100 112 112 100 195 88 112 5 100 88 88Z" fill="currentColor" />
        </g>
      </svg>

      <div className="wrap" style={{ position: 'relative' }}>
        <h2>Built for safe, capable, globally ready pilots.</h2>

        <div className="mv">
          <div>
            <h3>{MISSION.title}</h3>
            <p>{MISSION.text}</p>
          </div>
          <div>
            <h3>{VISION.title}</h3>
            <p>{VISION.text}</p>
          </div>
        </div>

        <ul className="vl">
          {CORE_VALUES.map((val, idx) => (
            <li key={idx}>
              <b>{val.title}</b>
              <span>{val.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
