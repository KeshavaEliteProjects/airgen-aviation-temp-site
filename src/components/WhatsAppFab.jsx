import React from 'react';
import { AIRGEN_CONFIG } from '../utils/config';

export default function WhatsAppFab() {
  const waUrl = `https://wa.me/${AIRGEN_CONFIG.whatsapp}`;

  return (
    <div className="fab">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Airgen on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      </a>
    </div>
  );
}
