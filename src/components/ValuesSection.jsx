import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ValuesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const val = sectionRef.current;
      if (!val) return;

      const sc = (t, a, b) => ({ trigger: t, start: a || 'top 85%', end: b || 'top 35%', scrub: 0.8 });

      gsap.to('.rose', {
        rotation: 240,
        ease: 'none',
        scrollTrigger: {
          trigger: val,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.fromTo(
        val,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: sc(val, 'top 95%', 'top 45%')
        }
      );

      gsap.fromTo(
        '.values h2',
        { clipPath: 'inset(0 0 100% 0)', y: 36, opacity: 0 },
        {
          clipPath: 'inset(0 0 -10% 0)',
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values h2', start: 'top 88%', refreshPriority: -1 }
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

      const mm = gsap.matchMedia();
      mm.add('(min-width: 801px)', () => {
        ScrollTrigger.create({
          trigger: val,
          start: 'bottom bottom',
          end: () => '+=' + window.innerHeight,
          pin: true,
          pinSpacing: false
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="values" id="about">
      <svg className="rose" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor">
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
            <h3>Mission</h3>
            <p>
              To transform aviation education by developing technically proficient, safety-focused and globally competent aviation professionals through innovative learning, expert mentorship and industry-leading technology.
            </p>
          </div>
          <div>
            <h3>Vision</h3>
            <p>
              To become one of the world’s most trusted aviation education ecosystems, empowering the next generation of pilots through excellence, innovation and a commitment to global aviation standards.
            </p>
          </div>
        </div>
        <ul className="vl">
          <li>
            <b>Safety first</b>
            <span>Every lesson, decision and procedure is built around aviation safety.</span>
          </li>
          <li>
            <b>Technical excellence</b>
            <span>Deep theoretical knowledge and practical competence, not just exam preparation.</span>
          </li>
          <li>
            <b>Pilot-centric learning</b>
            <span>Every course, tool and mentoring process follows the student’s learning journey.</span>
          </li>
          <li>
            <b>Innovation in education</b>
            <span>AI-enabled classrooms, hybrid learning and digital tools.</span>
          </li>
          <li>
            <b>Integrity and professionalism</b>
            <span>Honesty, discipline, accountability and ethical decisions.</span>
          </li>
          <li>
            <b>Situational awareness and decision making</b>
            <span>Sound judgement, communication and risk management.</span>
          </li>
          <li>
            <b>DGCA standards</b>
            <span>Training aligned with DGCA standards and the expectations of modern airlines.</span>
          </li>
          <li>
            <b>Continuous growth</b>
            <span>Lifelong learning and adaptability across an aviation career.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
