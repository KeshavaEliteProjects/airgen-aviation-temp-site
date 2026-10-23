import React, { useEffect } from 'react';
import { useNews } from '../utils/newsData';

export default function NewsMarquee({ onOpen }) {
  const items = useNews();
  const heads = items.slice(0, 5).map(n => n.title);

  useEffect(() => {
    document.documentElement.classList.add('has-tk');
    return () => document.documentElement.classList.remove('has-tk');
  }, []);

  if (!heads.length) return null;

  const dur = 18 + heads.length * 7;

  const copy = hidden => (
    <span className="tk-copy" aria-hidden={hidden || undefined}>
      <span className="tk-item tk-cta">Click here to watch latest news</span>
      {heads.map((h, i) => (
        <span className="tk-item" key={i}>
          {h}
        </span>
      ))}
    </span>
  );

  return (
    <button
      type="button"
      className="tk"
      onClick={onOpen}
      aria-label={`Latest news: ${heads[0]}. Open the news page`}
    >
      <span className="tk-badge">Latest news</span>
      <span className="tk-view">
        <span className="tk-track" style={{ '--tk-dur': dur + 's' }}>
          {copy(false)}
          {copy(true)}
        </span>
      </span>
    </button>
  );
}
