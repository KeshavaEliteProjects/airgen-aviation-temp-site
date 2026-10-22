import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const PAGE_NAMES = {
  dgca: 'DGCA',
  faa: 'FAA',
  easa: 'EASA',
  ask: 'ASK model',
  platform: 'Platform'
};

export default function TakeoffGateModal({ pageKey, onRevealPage, onComplete, onCancel }) {
  const gateRef = useRef(null);
  const planeRef = useRef(null);
  const isTakingOffRef = useRef(false);
  const autoTimerRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageKey) return;

    const gate = gateRef.current;
    const plane = planeRef.current;
    if (!gate || !plane) return;

    isTakingOffRef.current = false;

    // Reset positions and animate the gate into view from left
    gsap.set(gate, { xPercent: -101 });
    gsap.set(plane, { x: 0, y: 0, rotation: 0 });

    gsap.to(gate, {
      xPercent: 0,
      duration: 0.45,
      ease: 'power3.out',
      onComplete: () => {
        if (plane) plane.focus();
      }
    });

    // Auto-takeoff timer after 5 seconds if user hasn't tapped
    autoTimerRef.current = setTimeout(() => {
      triggerTakeoff();
    }, 5000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        triggerCancel();
      } else if (e.key === 'Enter' || e.key === ' ') {
        triggerTakeoff();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageKey]);

  const triggerTakeoff = () => {
    if (isTakingOffRef.current) return;
    isTakingOffRef.current = true;

    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
    }

    const gate = gateRef.current;
    const plane = planeRef.current;
    if (!gate || !plane) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Plane ascends and zooms off screen
    tl.to(plane, {
      x: '110vw',
      y: '-38vh',
      rotation: -12,
      duration: 1,
      ease: 'power2.in'
    })
      // Reveal the target page underneath during flight
      .add(() => {
        if (onRevealPage) onRevealPage();
      }, 0.55)
      // Slide the gate out to the right to reveal the page
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

  const triggerCancel = () => {
    if (isTakingOffRef.current) return;
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
    }

    const gate = gateRef.current;
    if (!gate) {
      if (onCancel) onCancel();
      return;
    }

    gsap.to(gate, {
      xPercent: 101,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        if (onCancel) onCancel();
      }
    });
  };

  if (!pageKey) return null;

  return (
    <div
      className="gate"
      ref={gateRef}
      role="dialog"
      aria-modal="true"
      aria-label="Opening page"
    >
      <i className="gl g1"></i>
      <i className="gl g2"></i>
      <i className="gl g3"></i>

      <div className="gcen">
        <button
          ref={planeRef}
          className="gplane"
          onClick={triggerTakeoff}
          type="button"
          aria-label="Tap the plane to take off and open the page"
        >
          <svg className="gjet" viewBox="0 0 120 40" aria-hidden="true">
            <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
            <path d="M10 17L2 4L16 4L26 17Z" />
            <path d="M52 24L84 24L66 36L56 36Z" />
          </svg>
        </button>

        <p
          className="gcap"
          onClick={triggerTakeoff}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          Tap the plane to take off
        </p>
        <p className="gsub">Opening the {PAGE_NAMES[pageKey] || pageKey} page</p>

        <button className="gcancel" type="button" onClick={triggerCancel}>
          Cancel
        </button>
      </div>

      <div className="grw"></div>
    </div>
  );
}
