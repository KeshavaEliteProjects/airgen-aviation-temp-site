import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BandImageSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to('.bandimg img', {
        yPercent: 12,
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
        { clipPath: 'inset(18% 10% 18% 10%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 0.8
          }
        }
      );

      gsap.from('.bandimg h2', {
        x: -140,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%'
        }
      });

      gsap.from('.bandimg p', {
        x: 140,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bandimg" ref={sectionRef}>
      <img src="/assets/photo-navigation-band.jpg" alt="" loading="lazy" />
      <div className="wrap">
        <h2>We don't just teach ATPL subjects. We train pilots.</h2>
        <p>Attitude, Skills and Knowledge, from ground school to airline readiness.</p>
      </div>
    </section>
  );
}
