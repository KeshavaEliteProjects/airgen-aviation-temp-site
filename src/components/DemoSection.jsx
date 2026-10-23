import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AIRGEN_CONFIG } from '../utils/config';

gsap.registerPlugin(ScrollTrigger);

export default function DemoSection({ selectedTopic }) {
  const sectionRef = useRef(null);
  const nameInputRef = useRef(null);
  const [topic, setTopic] = useState(selectedTopic || 'DGCA ground class');
  const [time, setTime] = useState('Morning');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(null);

  React.useEffect(() => {
    if (selectedTopic) {
      setTopic(selectedTopic);
    }
  }, [selectedTopic]);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const demo = sectionRef.current;
      if (!demo) return;

      const sc = (triggerEl, a, b) => ({
        trigger: triggerEl,
        start: a || 'top 85%',
        end: b || 'top 35%',
        scrub: 0.8
      });

      gsap.fromTo(
        '.demo .g > div',
        { x: -110, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', scrollTrigger: sc(demo) }
      );
      gsap.fromTo(
        '.demo form',
        { x: 110, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', scrollTrigger: sc(demo) }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const t = `Demo call request: ${name}, ${phone}, ${email}, ${topic}, preferred time: ${time}${notes ? ', notes: ' + notes : ''}`;

    if (AIRGEN_CONFIG.demoUrl) {
      window.open(AIRGEN_CONFIG.demoUrl, '_blank', 'noopener');
      setSubmittedMessage(<span>Opening the booking page.</span>);
      return;
    }

    const wa = `https://wa.me/${AIRGEN_CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
    const phoneUrl = `tel:${AIRGEN_CONFIG.phone}`;

    setSubmittedMessage(
      <span>
        Thank you. Opening your phone app to call Airgen. If it does not open,{' '}
        <a href={phoneUrl}>tap here to call</a> or{' '}
        <a href={wa} target="_blank" rel="noopener noreferrer">
          send your details on WhatsApp
        </a>
        .
      </span>
    );

    const framed = typeof window !== 'undefined' && window.top !== window.self;
    if (framed) {
      const a = document.createElement('a');
      a.href = phoneUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      window.location.href = phoneUrl;
    }
  };

  return (
    <section ref={sectionRef} className="demo" id="demo">
      <div className="wrap g">
        <div className="dh">
          <div className="pk">1-on-1 pilot advisory</div>
          <h2>Book free pilot counselling &amp; platform demo</h2>
          <p style={{ marginTop: '1rem' }}>
            Connect 1-on-1 with an experienced flight instructor. Get clear guidance on licences, medicals, budgets and airline pathways.
          </p>
        </div>

        <div className="card dl">
          <h3 className="wg">What you get from this session</h3>
          <ul className="ticks">
            <li>
              <b>Pathway roadmap:</b> your DGCA ground school roadmap, timelines and costs.
            </li>
            <li>
              <b>Medical guidance:</b> DGCA Class 2 and Class 1 medical appointment walkthrough and eye standards.
            </li>
            <li>
              <b>Live platform demo:</b> walkthrough of CBT question banks, analytics and navigation modules.
            </li>
            <li>
              <b>Zero financial bias:</b> transparent flight training cost estimation, with no hidden fees.
            </li>
          </ul>
          <div className="hl">
            <span>Direct pilot admissions helpline</span>
            <a href={`tel:${AIRGEN_CONFIG.phone}`}>{AIRGEN_CONFIG.phoneText}</a>
          </div>
        </div>

        <form id="df" className="card" onSubmit={handleSubmit}>
          <h3 className="wg">Request free counselling &amp; demo</h3>
          <label>
            Full name *
            <input
              ref={nameInputRef}
              name="n"
              required
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            Mobile number (WhatsApp) *
            <input
              name="p"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </label>
          <label>
            Email address *
            <input
              name="e"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            I am enquiring about *
            <select
              name="w"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            >
              <option>DGCA ground class</option>
              <option>ATPL ground class</option>
              <option>Type rating</option>
              <option>Licence</option>
              <option>NIOS</option>
              <option>VISA</option>
              <option>Complementary services</option>
              <option>Conversion</option>
              <option>Medicals</option>
              <option>General enquiry</option>
            </select>
          </label>
          <label>
            Preferred time
            <select
              name="t"
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>
          <label>
            Your educational background or questions (optional)
            <input
              name="q"
              maxLength={200}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </label>
          <button className="btn pri" type="submit">
            Submit request &amp; connect
          </button>
          <div id="dm" aria-live="polite">
            {submittedMessage}
          </div>
          <p style={{ margin: 0 }}>
            Prefer to talk now? <a href={`tel:${AIRGEN_CONFIG.phone}`}>Call {AIRGEN_CONFIG.phoneText}</a>
          </p>
        </form>

        <figure className="photo">
          <img
            src="/assets/photo-student-study.jpg"
            alt="Student pilot studying with a notebook and laptop"
            loading="lazy"
          />
          <figcaption>Illustrative image</figcaption>
        </figure>
      </div>
    </section>
  );
}
