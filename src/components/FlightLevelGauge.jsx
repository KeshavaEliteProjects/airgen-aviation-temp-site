import React, { useEffect, useRef } from 'react';

const SK = [
  [0, [255, 170, 120, 0.06], 'dawn'],
  [0.22, [255, 255, 255, 0], 'morning'],
  [0.5, [130, 185, 255, 0.03], 'day'],
  [0.78, [255, 185, 95, 0.08], 'golden hour'],
  [1, [85, 65, 150, 0.1], 'dusk']
];

export default function FlightLevelGauge() {
  const flRef = useRef(null);
  const todRef = useRef(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tgt = 0;
    let cur = 0;
    let lt = '';
    let animId = 0;

    const tintEl = document.getElementById('sky-tint');

    const updateScrollTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (rm) cur = tgt;
    };

    function tintAt(p) {
      if (!tintEl) return;
      let i = 0;
      while (i < SK.length - 2 && p > SK[i + 1][0]) i++;
      const a = SK[i];
      const b = SK[i + 1];
      const f = Math.min(1, Math.max(0, (p - a[0]) / (b[0] - a[0])));
      const c = a[1].map((v, k) => v + (b[1][k] - v) * f);
      const col = `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${c[3].toFixed(2)})`;
      if (col !== lt) {
        tintEl.style.background = col;
        lt = col;
      }
      const todName = '· ' + (f < 0.5 ? a[2] : b[2]);
      if (todRef.current && todRef.current.textContent !== todName) {
        todRef.current.textContent = todName;
      }
    }

    function tick() {
      cur += (tgt - cur) * 0.12;
      if (flRef.current) {
        flRef.current.textContent = 'FL' + String(Math.round(cur * 39) * 10).padStart(3, '0');
      }
      tintAt(cur);
      animId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollTarget);
    updateScrollTarget();
    tick();

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateScrollTarget);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="gauge" aria-hidden="true">
      Flight level <span id="fl" ref={flRef}>FL000</span> <span id="tod" ref={todRef} />
    </div>
  );
}
