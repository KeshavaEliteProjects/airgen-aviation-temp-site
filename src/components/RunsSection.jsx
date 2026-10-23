import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RunsSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      gsap.from('.row3', {
        opacity: 0,
        x: i => (i % 2 ? 140 : -140),
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.rows',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="runs">
      <div className="wrap">
        <h2>ASK runs through all three stages.</h2>
        <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
          ASK is not a separate ATPL subject. It is a competency framework integrated throughout training.
        </p>
        <div className="rows">
          <div className="rowh">
            <span />
            <span>Student question</span>
            <span>Airgen solution</span>
            <span>ASK focus</span>
          </div>
          <div className="row3">
            <span className="no">01</span>
            <div>
              <b>Thinking</b>
              <i>Should I become a pilot?</i>
            </div>
            <div>Career discovery and roadmap</div>
            <div className="focus3">
              <span>Attitude</span>
            </div>
          </div>
          <div className="row3">
            <span className="no">02</span>
            <div>
              <b>Training</b>
              <i>How do I become competent?</i>
            </div>
            <div>DGCA ground school</div>
            <div className="focus3">
              <span>Knowledge</span>
              <span>Skills</span>
              <span>Attitude</span>
            </div>
          </div>
          <div className="row3">
            <span className="no">03</span>
            <div>
              <b>Job to command</b>
              <i>How do I become an airline captain?</i>
            </div>
            <div>Airline readiness and career development</div>
            <div className="focus3">
              <span>Professional competency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
