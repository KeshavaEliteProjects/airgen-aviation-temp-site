import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function BoardingPass() {
  const [visible, setVisible] = useState(false);
  const bpRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('agbp');
    } catch (e) {}

    if (seen || window.location.hash) {
      return;
    }

    try {
      sessionStorage.setItem('agbp', '1');
    } catch (e) {}

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !bpRef.current) return;

    const bp = bpRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      }
    });
    tlRef.current = tl;

    tl.from('.bpc', { y: 60, scale: 0.92, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .to({}, { duration: 0.9 })
      .to('.bpstub', { rotation: 16, y: '120%', x: '12%', opacity: 0, duration: 0.6, ease: 'power2.in' })
      .to('.bpmain', { xPercent: -4, duration: 0.15 }, '<')
      .to('.bpc', { y: '-120%', opacity: 0, duration: 0.7, ease: 'power3.in' }, '+=.1')
      .to(bp, { opacity: 0, duration: 0.3 }, '-=.3');

    return () => {
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.timeScale(4);
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      ref={bpRef}
      className="bp"
      id="bp"
      role="dialog"
      aria-label="Welcome boarding pass"
    >
      <div className="bpc">
        <div className="bpmain">
          <img src="/assets/logo.png" alt="Airgen Aviation" />
          <div className="bpt">BOARDING PASS &middot; AIRGEN AVIATION</div>
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
          <div className="bpt">DGCA</div>
          <div className="bpbar" />
        </div>
      </div>
      <button className="bpskip" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}
