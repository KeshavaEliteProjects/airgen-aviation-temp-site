import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BoardingPassModal() {
  const [isVisible, setIsVisible] = useState(false);
  const bpRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('agbp') === '1';
    } catch (e) {}

    if (seen || window.location.hash) {
      return;
    }

    try {
      sessionStorage.setItem('agbp', '1');
    } catch (e) {}

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false)
    });

    timelineRef.current = tl;

    tl.from('.bpc', { y: 60, scale: 0.92, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .to({}, { duration: 0.9 })
      .to('.bpstub', {
        rotation: 16,
        y: '120%',
        x: '12%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      })
      .to('.bpmain', { xPercent: -4, duration: 0.15 }, '<')
      .to('.bpc', { y: '-120%', opacity: 0, duration: 0.7, ease: 'power3.in' }, '+=.1')
      .to(bpRef.current, { opacity: 0, duration: 0.3 }, '-=.3');

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(4);
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bp" ref={bpRef} role="dialog" aria-label="Welcome boarding pass">
      <div className="bpc">
        <div className="bpmain">
          <img src="/assets/logo.png" alt="Airgen Aviation" />
          <div className="bpt">BOARDING PASS · AIRGEN AVIATION</div>
          <div className="bpg">
            <div>
              <span>PASSENGER</span>
              <b>Future Captain</b>
            </div>
            <div>
              <span>FROM</span>
              <b>Dream</b>
            </div>
            <div>
              <span>TO</span>
              <b>Cockpit</b>
            </div>
            <div>
              <span>GATE</span>
              <b>Think</b>
            </div>
            <div>
              <span>SEAT</span>
              <b>1A</b>
            </div>
            <div>
              <span>BOARDING</span>
              <b>Now</b>
            </div>
          </div>
        </div>

        <div className="bpstub">
          <div className="bpt">DGCA · FAA · EASA</div>
          <div className="bpbar"></div>
        </div>
      </div>

      <button className="bpskip" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}
