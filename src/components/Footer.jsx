import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AIRGEN_CONFIG } from '../utils/config';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const [zuluTime, setZuluTime] = useState('');

  useEffect(() => {
    const updateZulu = () => {
      const d = new Date();
      setZuluTime(`Zulu ${String(d.getUTCHours()).padStart(2, '0')}${String(d.getUTCMinutes()).padStart(2, '0')}Z`);
    };
    updateZulu();
    const interval = setInterval(updateZulu, 15000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const tk = document.getElementById('tk');
      if (tk) {
        gsap.set(tk, { transformOrigin: '50% 90%' });
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
        tl.fromTo(tk, { x: 0, y: 0, rotation: 0 }, { x: 520, duration: 2.4, ease: 'power2.in' })
          .to(tk, { rotation: -12, duration: 0.6, ease: 'power1.out' }, '-=.5')
          .to(tk, { x: 1100, y: -210, duration: 1.8, ease: 'power1.in' }, '-=.1');

        ScrollTrigger.create({
          trigger: '.rwy',
          start: 'top 92%',
          refreshPriority: -1,
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.pause(0)
        });
      }

      gsap.fromTo(
        'footer h2',
        { clipPath: 'inset(0 0 100% 0)', y: 36, opacity: 0 },
        {
          clipPath: 'inset(0 0 -10% 0)',
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: 'footer h2', start: 'top 88%', refreshPriority: -1 }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const demoHref = AIRGEN_CONFIG.demoUrl || '#demo';
  const demoTarget = AIRGEN_CONFIG.demoUrl ? '_blank' : undefined;
  const demoRel = AIRGEN_CONFIG.demoUrl ? 'noopener' : undefined;

  return (
    <footer ref={footerRef} id="begin">
      <div className="wrap">
        <img
          className="flogo"
          src="/assets/logo.png"
          alt="Airgen Aviation"
          loading="lazy"
        />
        <h2>Your journey from aspiration to airline command.</h2>
        <p style={{ color: '#B9CADB' }}>
          It starts with one decision. Book a 15-minute demo call to see the pathway.
        </p>
        <a
          className="btn pri"
          href={demoHref}
          target={demoTarget}
          rel={demoRel}
          data-cta="demo"
        >
          Book a 15-min demo call
        </a>

        {(AIRGEN_CONFIG.email || AIRGEN_CONFIG.phone) && (
          <div id="contact">
            {AIRGEN_CONFIG.email && (
              <a href={`mailto:${AIRGEN_CONFIG.email}`}>{AIRGEN_CONFIG.email}</a>
            )}
            {AIRGEN_CONFIG.phone && (
              <a href={`tel:${AIRGEN_CONFIG.phone}`}>
                {AIRGEN_CONFIG.phoneText || AIRGEN_CONFIG.phone}
              </a>
            )}
          </div>
        )}

        <svg className="rwy" viewBox="0 0 1000 240" aria-hidden="true">
          <rect x="0" y="196" width="1000" height="44" fill="#16283D" />
          <path d="M0 196H1000" stroke="#F2A33A" strokeWidth="2" />
          <path className="dash" d="M0 218H1000" stroke="#fff" strokeWidth="4" fill="none" />
          <g id="tk">
            <g transform="translate(20 146) scale(1.4)" fill="#E9F0F7">
              <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
              <path d="M10 17L2 4L16 4L26 17Z" />
              <path d="M52 24L84 24L66 36L56 36Z" />
            </g>
          </g>
        </svg>

        <small>
          Airgen Aviation &middot; India &middot; DGCA &middot; <span id="z">{zuluTime}</span>
        </small>
      </div>
    </footer>
  );
}
