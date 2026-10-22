import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PromiseSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.promise .reveal', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.promise',
          start: 'top 80%'
        }
      });

      gsap.from('.facts div', {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.facts',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="promise" id="main" ref={sectionRef}>
      <div className="wrap">
        <p className="reveal">
          We don't just prepare students to pass examinations — we prepare professionals to lead
          safely, think critically, and perform confidently in the cockpit.
        </p>
        <small>
          Airgen is a next-generation aviation education and training company: experienced
          instructors, industry-aligned curricula and digital learning built for aspiring pilots.
        </small>
        <div className="facts">
          <div>
            <b data-n="3">3</b>
            <span>licence pathways: DGCA, FAA, EASA</span>
          </div>
          <div>
            <b data-n="3">3</b>
            <span>stages: Think, Train, Airline career</span>
          </div>
          <div>
            <b data-n="6">6</b>
            <span>career steps toward command</span>
          </div>
          <div>
            <b data-n="8">8</b>
            <span>core values</span>
          </div>
        </div>
      </div>
    </section>
  );
}
