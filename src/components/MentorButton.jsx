import React from 'react';

export default function MentorButton({ onOpen }) {
  return (
    <button
      className="mentor"
      data-mentor
      aria-haspopup="dialog"
      onClick={onOpen}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      </svg>
      Call Mentor
    </button>
  );
}
