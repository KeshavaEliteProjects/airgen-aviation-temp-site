import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORLD_LAND_PATH } from '../data/worldLandPath';

export default function WorldMapSection() {
  const sectionRef = useRef(null);
  const route1Ref = useRef(null);
  const route2Ref = useRef(null);
  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const routes = [route1Ref.current, route2Ref.current].filter(Boolean);
    const markers = [marker1Ref.current, marker2Ref.current].filter(Boolean);

    routes.forEach((r) => {
      const len = r.getTotalLength();
      r._len = len;
      r.style.strokeDasharray = len;
      r.style.strokeDashoffset = len;
    });

    const updatePlanes = (progress) => {
      routes.forEach((r, i) => {
        if (!r._len || !markers[i]) return;
        const l = r._len;
        const q = Math.min(1, Math.max(0, (progress - i * 0.18) / 0.7));
        const pt = r.getPointAtLength(l * q);
        const ptBefore = r.getPointAtLength(Math.max(0, l * q - 1));
        const ptAfter = r.getPointAtLength(Math.min(l, l * q + 1));
        r.style.strokeDashoffset = l * (1 - q);
        const angle = (Math.atan2(ptAfter.y - ptBefore.y, ptAfter.x - ptBefore.x) * 180) / Math.PI;
        markers[i].setAttribute(
          'transform',
          `translate(${pt.x} ${pt.y}) rotate(${angle}) scale(1.3)`
        );
      });
    };

    updatePlanes(0);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 65%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: (self) => updatePlanes(self.progress)
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="world" id="world" ref={sectionRef}>
      <div className="wrap">
        <h2>One academy. Three global pathways.</h2>
        <p>
          DGCA in India, FAA in the USA and EASA in Europe, all from one learning ecosystem built for
          aspiring pilots.
        </p>

        <svg
          className="wmap"
          viewBox="0 0 1000 384"
          role="img"
          aria-label="World map with routes from India to the USA and Europe, for the DGCA, FAA and EASA pathways"
        >
          <path className="land" d={WORLD_LAND_PATH} />

          <defs>
            <radialGradient id="rdg" gradientUnits="userSpaceOnUse" cx="718" cy="174" r="560">
              <stop offset="0" stopColor="#F2A33A" stopOpacity=".42" />
              <stop offset="1" stopColor="#F2A33A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Range rings */}
          <g fill="none" stroke="#F2A33A" strokeOpacity=".16">
            <circle cx="718" cy="174" r="100" />
            <circle cx="718" cy="174" r="220" />
            <circle cx="718" cy="174" r="340" />
          </g>

          {/* Radar sweep */}
          <g className="rdr">
            <path d="M718 174L1278 174A560 560 0 0 0 1212.4 -88.9Z" fill="url(#rdg)" />
            <path d="M718 174L1278 174" stroke="#F2A33A" strokeOpacity=".55" />
          </g>

          {/* Route guidelines */}
          <path className="rtg" id="r1" d="M718 174 Q474 6 231 131" />
          <path className="rtg" id="r2" d="M718 174 Q621 69 524 83" />

          {/* Animated stroke routes */}
          <path ref={route1Ref} className="rt" d="M718 174 Q474 6 231 131" />
          <path ref={route2Ref} className="rt" d="M718 174 Q621 69 524 83" />

          {/* Continuous flying planes along curves */}
          <path
            className="fl"
            d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
            fill="#F2A33A"
          >
            <animateMotion dur="9s" begin="0s" repeatCount="indefinite" rotate="auto">
              <mpath href="#r1" />
            </animateMotion>
          </path>
          <path
            className="fl"
            d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
            fill="#F2A33A"
          >
            <animateMotion dur="9s" begin="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#r1" />
            </animateMotion>
          </path>
          <path
            className="fl"
            d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
            fill="#F2A33A"
          >
            <animateMotion dur="7s" begin="1s" repeatCount="indefinite" rotate="auto">
              <mpath href="#r2" />
            </animateMotion>
          </path>
          <path
            className="fl"
            d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
            fill="#F2A33A"
          >
            <animateMotion dur="7s" begin="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#r2" />
            </animateMotion>
          </path>

          {/* Scroll markers */}
          <g ref={marker1Ref} className="mk" transform="translate(231 131)">
            <path
              d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
              fill="#fff"
            />
          </g>
          <g ref={marker2Ref} className="mk" transform="translate(524 83)">
            <path
              d="M8 0L-6 -3L-7 0L-6 3Z M2 0L-3 -7L-1 -7L5 0L-1 7L-3 7Z"
              fill="#fff"
            />
          </g>

          {/* Pulse origins and destination markers */}
          <circle className="pulse" cx="718" cy="174" r="8" />
          <circle cx="718" cy="174" r="6" fill="#F2A33A" />
          <circle className="pulse" cx="231" cy="131" r="6" />
          <circle cx="231" cy="131" r="4" fill="#F2A33A" />
          <circle className="pulse" cx="524" cy="83" r="6" />
          <circle cx="524" cy="83" r="4" fill="#F2A33A" />

          {/* City & Pathway Labels */}
          <text x="730" y="200">
            India<tspan x="730" dy="18" className="s">DGCA</tspan>
          </text>
          <text x="219" y="157" textAnchor="end">
            USA<tspan x="219" dy="18" className="s">FAA</tspan>
          </text>
          <text x="536" y="59">
            Europe<tspan x="536" dy="18" className="s">EASA</tspan>
          </text>
        </svg>

        <div className="pw">
          <span>DGCA · India</span>
          <span>FAA · USA</span>
          <span>EASA · Europe</span>
        </div>
      </div>
    </section>
  );
}
