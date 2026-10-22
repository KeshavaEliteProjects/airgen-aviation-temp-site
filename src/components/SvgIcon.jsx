import React from 'react';

export default function SvgIcon({ pathString, className = 'ic', size = 24, fill = 'none', stroke = 'currentColor', strokeWidth = 1.7 }) {
  if (!pathString) return null;
  const paths = pathString.split('|');

  return (
    <svg
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
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
