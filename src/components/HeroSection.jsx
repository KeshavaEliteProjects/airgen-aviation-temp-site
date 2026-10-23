import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const activate = (e, fn) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fn();
  }
};

export default function HeroSection({ onOpenPage }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const wh = heroRef.current;
      if (!wh) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wh,
          start: 'top top',
          end: '+=4800',
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
        // Circles fly in from three sides and merge into a Venn diagram; the hint appears only with the Venn
        .set('.vn .vc', { autoAlpha: 0 }, 0)
        .set('.vn .vcore', { autoAlpha: 0 }, 0)
        .set('.vn .vhint', { autoAlpha: 0 }, 0)
        .fromTo('.vn .vA', { autoAlpha: 0, yPercent: -140 }, { autoAlpha: 1, yPercent: 0, duration: 1.3, ease: 'power2.out' }, 4.6)
        .fromTo('.vn .vS', { autoAlpha: 0, xPercent: -170 }, { autoAlpha: 1, xPercent: 0, duration: 1.3, ease: 'power2.out' }, 4.6)
        .fromTo('.vn .vK', { autoAlpha: 0, xPercent: 170 }, { autoAlpha: 1, xPercent: 0, duration: 1.3, ease: 'power2.out' }, 4.6)
        .to('.vn .vcore', { autoAlpha: 1, duration: 0.5 }, 6.1)
        .to('.vn .vhint', { autoAlpha: 1, duration: 0.5 }, 6.4)
        .to({}, { duration: 1 });

      const shk = ['.scene', '.ring'];
      ScrollTrigger.create({
        trigger: wh,
        start: 'top top',
        end: '+=3000',
        onUpdate: st => {
          const v = Math.min(1, Math.abs(st.getVelocity()) / 3500);
          if (v > 0.15) {
            gsap.set(shk, {
              x: (Math.random() - 0.5) * 8 * v,
              y: (Math.random() - 0.5) * 6 * v
            });
          } else {
            gsap.set(shk, { x: 0, y: 0 });
          }
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const statementWords = "Precision cadet training engineered for DGCA excellence & airline readiness.".split(/\s+/);

  return (
    <header
      ref={heroRef}
      className="wh"
      id="top"
      data-tone="light"
      aria-label="Airgen Aviation introduction"
    >
      <div className="hcopy">
        <div className="tag2">Airgen Aviation &middot; DGCA ground training</div>
        <h1>From your first decision to your future command.</h1>
        <p>
          Airgen Aviation trains DGCA cadets in Attitude, Skills and Knowledge, and stays with them from ground school to the captain’s seat.
        </p>
        <div className="cta">
          <a className="btn pri" href="#demo" data-cta="demo">
            Book a 15-min demo call
          </a>
          <a className="btn sec" href="#journey">
            Explore the journey &darr;
          </a>
        </div>
      </div>

      <div className="scene">
        <div className="dc" aria-hidden="true">
        <div className="cl c1" />
        <div className="cl c2" />
        <div className="cl c3" />
        <div className="cl c4" />
        <div className="cg">
          <i className="pf a" />
          <i className="pf b" />
          <i className="pf c" />
          <i className="pf d" />
          <i className="pf e" />
          <i className="pf f" />
        </div>
        <div className="trail2" />
        <svg className="jet2" viewBox="0 0 120 40">
          <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
          <path d="M10 17L2 4L16 4L26 17Z" />
          <path d="M52 24L84 24L66 36L56 36Z" />
        </svg>
        <div className="fog" />
        <div className="glint" />
        <div className="shutter" />
        </div>
        <div className="sA" aria-hidden="true">
          <div className="lab">Why AirGen Aviation?</div>
          <p>
            {statementWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="w">{word}</span>
                {idx < statementWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className="vn">
          <svg
            className="vsvg"
            viewBox="0 0 520 430"
            role="group"
            aria-label="Attitude, Skills and Knowledge overlap to form an airline-ready pilot"
          >
            <g
              className="vc vA"
              role="button"
              tabIndex={0}
              aria-label="Attitude. Open the Attitude page"
              onClick={() => onOpenPage('attitude')}
              onKeyDown={e => activate(e, () => onOpenPage('attitude'))}
            >
              <circle cx="260" cy="140" r="130" fill="#F2A33A" opacity=".55" />
              <text x="260" y="88">Attitude</text>
            </g>
            <g
              className="vc vS"
              role="button"
              tabIndex={0}
              aria-label="Skills. Open the Skills page"
              onClick={() => onOpenPage('skills')}
              onKeyDown={e => activate(e, () => onOpenPage('skills'))}
            >
              <circle cx="170" cy="275" r="130" fill="#3E8BD0" opacity=".55" />
              <text x="108" y="326">Skills</text>
            </g>
            <g
              className="vc vK"
              role="button"
              tabIndex={0}
              aria-label="Knowledge. Open the Knowledge page"
              onClick={() => onOpenPage('knowledge')}
              onKeyDown={e => activate(e, () => onOpenPage('knowledge'))}
            >
              <circle cx="350" cy="275" r="130" fill="#8FA4BA" opacity=".6" />
              <text x="414" y="326">Knowledge</text>
            </g>
            <g
              className="vcore"
              role="button"
              tabIndex={0}
              aria-label="Airline-ready pilot. Open the full ASK framework page"
              onClick={() => onOpenPage('ask')}
              onKeyDown={e => activate(e, () => onOpenPage('ask'))}
            >
              <circle cx="260" cy="226" r="46" fill="transparent" />
              <text className="s" x="260" y="222">Airline-ready</text>
              <text className="s" x="260" y="243">pilot</text>
            </g>
          </svg>
          <p className="vhint">Tap a circle to explore</p>
        </div>
      </div>
      <div className="ring" aria-hidden="true" />
      <div className="cue">Scroll to open the window</div>
    </header>
  );
}
