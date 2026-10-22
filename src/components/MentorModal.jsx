import React, { useEffect } from 'react';
import { AIRGEN_CONFIG } from '../config/airgenConfig';

export default function MentorModal({ isOpen, onClose, onBookDemo }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const waUrl = `https://wa.me/${AIRGEN_CONFIG.whatsapp}?text=${encodeURIComponent('Hello Airgen, I would like to speak to a pilot mentor.')}`;

  return (
    <div className="mm" id="mm" role="dialog" aria-modal="true" aria-labelledby="mmt">
      <div className="mmb" onClick={onClose}></div>
      <div className="mmc">
        <button className="mmx" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3 id="mmt">Speak to an Airgen pilot mentor</h3>
        <p>Talk to a pilot mentor about your licence pathway, medical and budget.</p>

        <div className="hl">
          <span>Direct pilot mentorship helpline</span>
          <b>{AIRGEN_CONFIG.phoneText}</b>
        </div>

        <a className="btn call" href={`tel:${AIRGEN_CONFIG.phone}`}>
          Call Mentor Now
        </a>
        <a className="btn wa" href={waUrl} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp
        </a>

        <p>
          Want a detailed session?{' '}
          <button
            className="lnk"
            onClick={() => {
              onClose();
              if (onBookDemo) onBookDemo();
            }}
          >
            Book counselling &amp; demo
          </button>
        </p>
      </div>
    </div>
  );
}
