import React, { useState, useEffect, useRef } from 'react';

const SK = [
  [0, [255, 170, 120, 0.18], 'dawn'],
  [0.22, [255, 255, 255, 0], 'morning'],
  [0.5, [130, 185, 255, 0.05], 'day'],
  [0.78, [255, 185, 95, 0.15], 'golden hour'],
  [1, [85, 65, 150, 0.2], 'dusk']
];

export default function FlightLevelGauge() {
  const [flightLevel, setFlightLevel] = useState('FL000');
  const [timeOfDay, setTimeOfDay] = useState('· dawn');
  const [tintColor, setTintColor] = useState('rgba(255, 170, 120, 0.18)');
  const [progress, setProgress] = useState(0);

  const curRef = useRef(0);
  const tgtRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      tgtRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(tgtRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    let animationFrameId;

    const tick = () => {
      curRef.current += (tgtRef.current - curRef.current) * 0.12;
      const cur = curRef.current;

      // Flight level calculation (FL000 to FL390)
      const flNumber = Math.round(cur * 39) * 10;
      setFlightLevel('FL' + String(flNumber).padStart(3, '0'));

      // Interpolate atmospheric tint
      let i = 0;
      while (i < SK.length - 2 && cur > SK[i + 1][0]) {
        i++;
      }
      const a = SK[i];
      const b = SK[i + 1];
      const f = Math.min(1, Math.max(0, (cur - a[0]) / (b[0] - a[0])));
      const c = a[1].map((v, k) => v + (b[1][k] - v) * f);
      const col = `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${c[3].toFixed(2)})`;
      setTintColor(col);

      const period = f < 0.5 ? a[2] : b[2];
      setTimeOfDay(`· ${period}`);

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="sp"
        style={{ transform: `scaleX(${progress})`, transformOrigin: '0 50%' }}
        aria-hidden="true"
      />
      <div className="tint" style={{ background: tintColor }} aria-hidden="true" />
      <div className="gauge" aria-hidden="true">
        Flight level <span>{flightLevel}</span> <span>{timeOfDay}</span>
      </div>
    </>
  );
}
