import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LadderSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const lad = sectionRef.current;
      if (!lad) return;

      const sc = (t, a, b) => ({ trigger: t, start: a || 'top 85%', end: b || 'top 35%', scrub: 0.8 });

      gsap.fromTo(
        lad,
        { clipPath: 'circle(0% at 50% 100%)' },
        {
          clipPath: 'circle(150% at 50% 100%)',
          ease: 'none',
          scrollTrigger: sc(lad, 'top 100%', 'top 25%')
        }
      );

      gsap.from('.steps li', {
        yPercent: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.steps',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="lad">
      <div className="wrap">
        <blockquote>
          &ldquo;We don’t train students just to earn a licence. We develop aviators for a career &mdash; from their first decision to their future command.&rdquo;
        </blockquote>
        <ol className="steps">
          <li>
            <b>Think</b>
            <span>Discover whether aviation is right for you.</span>
          </li>
          <li>
            <b>Train</b>
            <span>Build your Knowledge, Skills and Attitude through DGCA ground school.</span>
          </li>
          <li>
            <b>Fly</b>
            <span>Prepare for airline selection and professional cockpit operations.</span>
          </li>
          <li>
            <b>Advance</b>
            <span>Develop as an airline First Officer.</span>
          </li>
          <li>
            <b>Command</b>
            <span>Build the leadership and operational competencies required for future Captaincy.</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
