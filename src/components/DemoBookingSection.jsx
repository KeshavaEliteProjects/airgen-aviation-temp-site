import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AIRGEN_CONFIG } from '../config/airgenConfig';

export default function DemoBookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pathway: 'DGCA (India CPL ground school)',
    time: 'Morning',
    notes: ''
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.demo .g > div',
        { x: -110, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(
        '.demo form',
        { x: 110, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const t = `Demo call request: ${formData.name}, ${formData.phone}, ${formData.email}, ${formData.pathway}, preferred time: ${formData.time}${
      formData.notes ? ', notes: ' + formData.notes : ''
    }`;

    if (AIRGEN_CONFIG.demoUrl) {
      window.open(AIRGEN_CONFIG.demoUrl, '_blank', 'noopener');
      setStatusMessage({ type: 'info', text: 'Opening the booking page.' });
      return;
    }

    const wa = `https://wa.me/${AIRGEN_CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
    window.open(wa, '_blank', 'noopener');

    setStatusMessage({
      type: 'success',
      waUrl: wa
    });
  };

  return (
    <section className="demo" id="demo" ref={sectionRef}>
      <div className="wrap g">
        <div>
          <div className="pk">1-on-1 pilot advisory</div>
          <h2>Book free pilot counselling &amp; platform demo</h2>
          <p style={{ marginTop: '1rem' }}>
            Connect 1-on-1 with an experienced flight instructor. Get clear guidance on licences,
            medicals, budgets and airline pathways.
          </p>

          <div className="card" style={{ marginTop: '24px' }}>
            <h3 className="wg">What you get from this session</h3>
            <ul className="ticks">
              <li>
                <b>Pathway roadmap:</b> compare DGCA (India), FAA (USA) and EASA (Europe) timelines
                and costs.
              </li>
              <li>
                <b>Medical guidance:</b> DGCA Class 2 and Class 1 medical appointment walkthrough
                and eye standards.
              </li>
              <li>
                <b>Live platform demo:</b> walkthrough of CBT question banks, analytics and
                navigation modules.
              </li>
              <li>
                <b>Zero financial bias:</b> transparent flight training cost estimation, with no
                hidden fees.
              </li>
            </ul>

            <div className="hl">
              <span>Direct pilot admissions helpline</span>
              <a href={`tel:${AIRGEN_CONFIG.phone}`}>{AIRGEN_CONFIG.phoneText}</a>
            </div>
          </div>

          <figure className="photo">
            <img
              src="/assets/photo-student-study.jpg"
              alt="Student pilot studying with a notebook and laptop"
              loading="lazy"
            />
          </figure>
        </div>

        <form id="df" className="card" onSubmit={handleSubmit}>
          <h3 className="wg">Request free counselling &amp; demo</h3>

          <label>
            Full name *
            <input
              name="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Mobile number (WhatsApp) *
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Email address *
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Licence / training pathway of interest *
            <select name="pathway" value={formData.pathway} onChange={handleChange}>
              <option>DGCA (India CPL ground school)</option>
              <option>FAA (USA)</option>
              <option>EASA (Europe)</option>
              <option>Not sure yet</option>
            </select>
          </label>

          <label>
            Preferred time
            <select name="time" value={formData.time} onChange={handleChange}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>

          <label>
            Your educational background or questions (optional)
            <input
              name="notes"
              maxLength={200}
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          <button className="btn pri" type="submit">
            Submit request &amp; connect
          </button>

          {statusMessage && (
            <div id="dm" aria-live="polite">
              Thank you. Opening WhatsApp to connect with Airgen. If it does not open,{' '}
              <a href={`tel:${AIRGEN_CONFIG.phone}`}>tap here to call</a> or{' '}
              <a href={statusMessage.waUrl} target="_blank" rel="noopener noreferrer">
                send your details on WhatsApp
              </a>
              .
            </div>
          )}

          <p style={{ margin: 0 }}>
            Prefer to talk now? <a href={`tel:${AIRGEN_CONFIG.phone}`}>Call {AIRGEN_CONFIG.phoneText}</a>
          </p>
        </form>
      </div>
    </section>
  );
}
