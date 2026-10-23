import React, { useEffect, useRef } from 'react';
import { AIRGEN_CONFIG } from '../utils/config';

export default function MentorModal({ isOpen, onClose, onBookDemo }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (closeBtnRef.current) closeBtnRef.current.focus();
      const handleKeyDown = e => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const phone = AIRGEN_CONFIG.phone || '+919515143311';
  const phoneText = AIRGEN_CONFIG.phoneText || '+91 95151 43311';
  const waUrl = `https://wa.me/${AIRGEN_CONFIG.whatsapp}`;

  return (
    <div
      className="mm"
      id="mm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mmt"
    >
      <div className="mmb" onClick={onClose} />
      <div className="mmc">
        <button
          ref={closeBtnRef}
          className="mmx"
          onClick={onClose}
          aria-label="Close"
        >
          &#x2715;
        </button>
        <h3 id="mmt">Speak to an Airgen pilot mentor</h3>
        <p>Talk to a pilot mentor about your licence pathway, medical and budget.</p>
        <div className="hl">
          <span>Direct pilot mentorship helpline</span>
          <b>{phoneText}</b>
        </div>
        <a className="btn call" href={`tel:${phone}`}>
          Call Mentor Now
        </a>
        <a
          className="btn wa"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
        <p>
          Want a detailed session?{' '}
          <button
            className="lnk"
            type="button"
            onClick={() => {
              onClose();
              onBookDemo();
            }}
          >
            Book counselling &amp; demo
          </button>
        </p>
      </div>
    </div>
  );
}
