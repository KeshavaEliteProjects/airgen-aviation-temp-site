import React, { useState, useEffect } from 'react';
import { AIRGEN_CONFIG } from '../config/airgenConfig';

export default function Navbar({ onOpenPage }) {
  const [isSolid, setIsSolid] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for section tracking
    const sections = ['journey', 'ask', 'career', 'about'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <nav aria-label="Main" className={isSolid ? 'solid' : ''}>
        <a
          className="logo"
          href="#top"
          onClick={(e) => handleSmoothScroll(e, 'top')}
          aria-label="Airgen Aviation home"
        >
          <img className="logo-light" src="/assets/logo-dark.png" alt="Airgen Aviation" />
          <img className="logo-dark" src="/assets/logo.png" alt="Airgen Aviation" />
        </a>

        <div>
          <a
            href="#journey"
            className={activeSection === 'journey' ? 'on' : ''}
            onClick={(e) => handleSmoothScroll(e, 'journey')}
          >
            Journey
          </a>
          <button className="nl" onClick={() => onOpenPage('dgca')}>
            DGCA
          </button>
          <button className="nl" onClick={() => onOpenPage('faa')}>
            FAA
          </button>
          <button className="nl" onClick={() => onOpenPage('easa')}>
            EASA
          </button>
          <button className="nl" onClick={() => onOpenPage('ask')}>
            ASK
          </button>
          <button className="nl" onClick={() => onOpenPage('platform')}>
            Platform
          </button>
          <a
            href="#about"
            className={activeSection === 'about' ? 'on' : ''}
            onClick={(e) => handleSmoothScroll(e, 'about')}
          >
            About
          </a>
          <a
            className="keep pill"
            href={AIRGEN_CONFIG.demoUrl || '#demo'}
            target={AIRGEN_CONFIG.demoUrl ? '_blank' : '_self'}
            rel={AIRGEN_CONFIG.demoUrl ? 'noopener' : ''}
            onClick={AIRGEN_CONFIG.demoUrl ? undefined : (e) => handleSmoothScroll(e, 'demo')}
          >
            Book a demo
          </a>
        </div>
      </nav>
    </>
  );
}
