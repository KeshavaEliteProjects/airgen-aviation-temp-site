import React, { useState, useEffect } from 'react';
import { AIRGEN_CONFIG } from '../config/airgenConfig';

export default function Footer() {
  const [zuluTime, setZuluTime] = useState('');

  useEffect(() => {
    const updateZuluTime = () => {
      const d = new Date();
      const hours = String(d.getUTCHours()).padStart(2, '0');
      const mins = String(d.getUTCMinutes()).padStart(2, '0');
      setZuluTime(`Zulu ${hours}${mins}Z`);
    };

    updateZuluTime();
    const interval = setInterval(updateZuluTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="begin">
      <div className="wrap">
        <img className="flogo" src="/assets/logo.png" alt="Airgen Aviation" loading="lazy" />
        <h2>Your journey from aspiration to airline command.</h2>
        <p style={{ color: '#B9CADB' }}>
          It starts with one decision. Book a 15-minute demo call to see the pathway.
        </p>

        <a
          className="btn pri"
          href={AIRGEN_CONFIG.demoUrl || '#demo'}
          target={AIRGEN_CONFIG.demoUrl ? '_blank' : '_self'}
          rel={AIRGEN_CONFIG.demoUrl ? 'noopener' : ''}
          onClick={AIRGEN_CONFIG.demoUrl ? undefined : (e) => handleSmoothScroll(e, 'demo')}
        >
          Book a 15-min demo call
        </a>

        <div id="contact" style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {AIRGEN_CONFIG.email && (
            <a href={`mailto:${AIRGEN_CONFIG.email}`} style={{ color: '#F2A33A' }}>
              {AIRGEN_CONFIG.email}
            </a>
          )}
          {AIRGEN_CONFIG.phone && (
            <a href={`tel:${AIRGEN_CONFIG.phone}`} style={{ color: '#F2A33A' }}>
              {AIRGEN_CONFIG.phoneText || AIRGEN_CONFIG.phone}
            </a>
          )}
        </div>

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
          Airgen Aviation · India · DGCA · FAA · EASA · <span id="z">{zuluTime}</span>
        </small>
      </div>
    </footer>
  );
}
