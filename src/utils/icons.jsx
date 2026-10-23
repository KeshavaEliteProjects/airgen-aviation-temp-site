import React from 'react';

export const PI = [
  'M9 3h6v3H9z|M7 5H5v16h14V5h-2|M9 13l2 2 4-4',
  'M4 5h16v11H9l-5 4z|M8 9h8|M8 12h5',
  'M4 4h7v7H4z|M13 4h7v7h-7z|M4 13h7v7H4z|M17 13l3 7h-6z',
  'M3 5h18v11H3z|M8 20h8|M12 16v4',
  'M3 6h18|M3 11h18|M3 16h18',
  'M3 4h18|M3 9h18|M3 14h18|M3 19h18'
];

export const SI = [
  'M3 6h12v12H3z|M15 10l6-3v10l-6-3',
  'M5 4h14v16H5z|M9 9h6|M9 13h6|M9 17h3',
  'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z|M12 6v14',
  'M8 8a3 3 0 100-6 3 3 0 000 6z|M2 20c0-4 3-6 6-6s6 2 6 6|M17 9a2.5 2.5 0 100-5|M16 14c3 0 6 2 6 6',
  'M12 21a9 9 0 100-18 9 9 0 000 18z|M12 8v8|M8 12h8',
  'M3 5h18v14H3z|M7 10h4|M7 14h6|M16 10v4',
  'M4 20l6-8 4 4 6-10|M16 6h4v4'
];

export const RI = [
  'M5 14c0-4.5 3-8 7-8s7 3.5 7 8|M4 14h16l1 3.5H3z|M12 9.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 11.3l2-.3z',
  'M9 4h6v3H9z|M7 5.5H6a1 1 0 00-1 1V20a1 1 0 001 1h12a1 1 0 001-1V6.5a1 1 0 00-1-1h-1|M8.5 13l2.2 2.2 4.8-4.7',
  'M4 3v5a5 5 0 0010 0V3|M9 13v2a4 4 0 008 0v-1.5|M17 9.5a2 2 0 110 4 2 2 0 010-4z',
  'M3 5h18v14H3z|M8.2 10a1.8 1.8 0 103.6 0 1.8 1.8 0 10-3.6 0|M6 16c.5-2 2-3 4-3s3.5 1 4 3|M15 10h3|M15 13h3',
  'M12 21a9 9 0 100-18 9 9 0 000 18z|M8.5 8h7|M8.5 11h7|M9.5 8c3.8 0 5 1.4 5 3s-1.2 3-5 3L14.5 17',
  'M16 3v10|M16 3l5.5 2.2-5.5 2.4|M4 20.5c4.5 0 4-4.5 8-4.5s3-3 4-3|M4 20.5h.01'
];

export function SvgIcon({ d, className = 'ic' }) {
  if (!d) return null;
  const paths = d.split('|');
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((p, idx) => (
        <path key={idx} d={p} />
      ))}
    </svg>
  );
}

export function DialGauge() {
  return (
    <svg className="gauge2" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="92" fill="#0A1626" stroke="#8FA4BA" strokeWidth="3" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#3A5573" strokeWidth="10" strokeDasharray="3 12.3" />
      <line className="nd" x1="100" y1="100" x2="100" y2="34" stroke="#F2A33A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill="#F2A33A" />
    </svg>
  );
}
