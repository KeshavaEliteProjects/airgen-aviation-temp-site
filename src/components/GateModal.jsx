import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PAGE_NAMES } from '../utils/pageContent';

export default function GateModal({ gateKey, onTakeoffComplete, onCancel }) {
  const gateRef = useRef(null);
  const gpRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!gateKey) return;
    const gate = gateRef.current;
    const gp = gpRef.current;
    if (!gate || !gp) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      onTakeoffComplete(gateKey);
      return;
    }

    gsap.set(gp, { x: 0, y: 0, rotation: 0 });
    gsap.fromTo(
      gate,
      { xPercent: -101 },
      {
        xPercent: 0,
        duration: 0.45,
        ease: 'power3.out',
        onComplete: () => {
          if (gp) gp.focus();
          timerRef.current = setTimeout(runTakeoff, 5000);
        }
      }
    );

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        runCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gateKey]);

  const runTakeoff = () => {
    if (!gateKey) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const gate = gateRef.current;
    const gp = gpRef.current;
    if (!gate || !gp) {
      onTakeoffComplete(gateKey);
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          onTakeoffComplete(gateKey);
        }
      })
      .to(gp, {
        x: '110vw',
        y: '-38vh',
        rotation: -12,
        duration: 1,
        ease: 'power2.in'
      })
      .to(
        gate,
        {
          xPercent: 101,
          duration: 0.55,
          ease: 'power3.inOut'
        },
        0.7
      );
  };

  const runCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const gate = gateRef.current;
    if (gate) {
      gsap.to(gate, {
        xPercent: 101,
        duration: 0.4,
        onComplete: () => {
          onCancel();
        }
      });
    } else {
      onCancel();
    }
  };

  if (!gateKey) return null;

  const title = PAGE_NAMES[gateKey] || gateKey;

  return (
    <div
      ref={gateRef}
      className="gate"
      id="gate"
      role="dialog"
      aria-modal="true"
      aria-label="Opening page"
    >
      <i className="gl g1" />
      <i className="gl g2" />
      <i className="gl g3" />
      <div className="gcen">
        <button
          ref={gpRef}
          className="gplane"
          id="gp"
          aria-label="Tap the plane to take off and open the page"
          onClick={runTakeoff}
        >
          <svg className="gjet" viewBox="0 0 120 40" aria-hidden="true">
            <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
            <path d="M10 17L2 4L16 4L26 17Z" />
            <path d="M52 24L84 24L66 36L56 36Z" />
          </svg>
        </button>
        <p className="gcap">Tap the plane to take off</p>
        <p className="gsub" id="gt">
          Opening the {title} page
        </p>
        <button className="gcancel" data-gcancel onClick={runCancel}>
          Cancel
        </button>
      </div>
      <div className="grw" />
    </div>
  );
}
