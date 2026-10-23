import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BandImageSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const band = sectionRef.current;
      if (!band) return;

      gsap.to('.bandimg img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: band,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      const sc = (t, a, b) => ({ trigger: t, start: a || 'top 85%', end: b || 'top 35%', scrub: 0.8 });
      gsap.fromTo(
        band,
        { clipPath: 'inset(18% 10% 18% 10%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: sc(band, 'top bottom', 'top 20%') }
      );

      gsap.from('.bandimg h2', {
        x: -140,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: band, start: 'top 55%' }
      });

      gsap.from('.bandimg p', {
        x: 140,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: band, start: 'top 55%' }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bandimg">
      <img src="/assets/photo-navigation-band.jpg" alt="" loading="lazy" />
      <div className="wrap">
        <h2>We don’t just teach ATPL subjects. We train pilots.</h2>
        <p>Attitude, Skills and Knowledge, from ground school to airline readiness.</p>
      </div>
    </section>
  );
}
