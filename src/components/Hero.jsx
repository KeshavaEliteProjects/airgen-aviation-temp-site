import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AIRGEN_CONFIG } from '../config/airgenConfig';

export default function Hero() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wh = headerRef.current;
      if (!wh) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wh,
          start: 'top top',
          end: '+=4600',
          pin: true,
          scrub: 0.6
        }
      });

      tl.to('.shutter', { yPercent: -102, duration: 1, ease: 'power1.inOut' }, 0)
        .to('.cg', { y: '-30vh', scale: 1.2, transformOrigin: '50% 60%', duration: 3.5 }, 0)
        .to(wh, { '--t': '0vh', '--r': '0vw', '--b': '0vh', '--l': '0vw', '--rad': '0vw', duration: 1.6 }, 0.6)
        .to(wh, { '--s1': 'rgb(190,214,232)', '--s2': 'rgb(236,244,250)', duration: 2.4 }, 0.6)
        .to('.hcopy', { opacity: 0, xPercent: -10, duration: 0.7 }, 0.3)
        .to('.cue', { opacity: 0, duration: 0.2 }, 0)
        .to('.ring', { opacity: 0, duration: 0.4 }, 1.9)
        .to('.fog', { yPercent: -175, duration: 1.9 }, 1)
        .fromTo('.sA', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.2)
        .fromTo('.sA .w', { opacity: 0.15 }, { opacity: 1, stagger: 0.14, duration: 0.4 }, 2.3)
        .to('.sA', { opacity: 0, yPercent: -8, duration: 0.4 }, 4)
        .fromTo(
          '.sB b',
          { xPercent: (i) => [-110, 110, -110][i], opacity: 0 },
          { xPercent: 0, opacity: 1, stagger: 0.35, duration: 0.8 },
          4.4
        )
        .to({}, { duration: 1 });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whyAirgenText = 'Most academies teach subjects. Airgen trains pilot competencies.';

  return (
    <header className="wh" id="top" ref={headerRef} aria-label="Airgen Aviation introduction">
      <div className="hcopy">
        <div className="tag2">Airgen Aviation · DGCA · FAA · EASA</div>
        <h1>From your first decision to your future command.</h1>
        <p>
          Airgen Aviation trains DGCA, FAA and EASA pilots in Attitude, Skills and Knowledge, and
          stays with them from ground school to the captain's seat.
        </p>
        <div className="cta">
          <a
            className="btn pri"
            href={AIRGEN_CONFIG.demoUrl || '#demo'}
            target={AIRGEN_CONFIG.demoUrl ? '_blank' : '_self'}
            rel={AIRGEN_CONFIG.demoUrl ? 'noopener' : ''}
            onClick={AIRGEN_CONFIG.demoUrl ? undefined : (e) => handleSmoothScroll(e, 'demo')}
          >
            Book a 15-min demo call
          </a>
          <a
            className="btn sec"
            href="#journey"
            onClick={(e) => handleSmoothScroll(e, 'journey')}
          >
            Explore the journey →
          </a>
        </div>
      </div>

      <div className="scene" aria-hidden="true">
        <div className="cl c1"></div>
        <div className="cl c2"></div>
        <div className="cl c3"></div>
        <div className="cl c4"></div>
        <div className="cg">
          <i className="pf a"></i>
          <i className="pf b"></i>
          <i className="pf c"></i>
          <i className="pf d"></i>
          <i className="pf e"></i>
          <i className="pf f"></i>
        </div>
        <div className="trail2"></div>
        <svg className="jet2" viewBox="0 0 120 40">
          <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
          <path d="M10 17L2 4L16 4L26 17Z" />
          <path d="M52 24L84 24L66 36L56 36Z" />
        </svg>
        <div className="fog"></div>
        <div className="glint"></div>
        <div className="shutter"></div>

        <div className="sA">
          <div className="lab">Why Airgen</div>
          <p>
            {whyAirgenText.split(/\s+/).map((word, idx) => (
              <span key={idx} className="w">
                {word}{' '}
              </span>
            ))}
          </p>
        </div>

        <div className="sB">
          <b>Attitude.</b>
          <b>Skills.</b>
          <b>Knowledge.</b>
        </div>
      </div>

      <div className="ring" aria-hidden="true"></div>
      <div className="cue">Scroll to open the window</div>
    </header>
  );
}
