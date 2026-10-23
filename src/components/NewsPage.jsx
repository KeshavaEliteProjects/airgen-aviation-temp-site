import React, { useMemo, useState } from 'react';
import { useNews, isNewItem, dateParts } from '../utils/newsData';

function Video({ id, title }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className="nws-vid">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      className="nws-vid nws-play"
      style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` }}
      onClick={() => setOn(true)}
      aria-label={`Play video: ${title}`}
    >
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

function Entry({ n }) {
  const d = dateParts(n);
  const share = `https://wa.me/?text=${encodeURIComponent(`${n.title} ${window.location.origin}/#news`)}`;
  return (
    <li className={`nws-row${n.pinned ? ' is-pinned' : ''}`}>
      <div className="nws-d" aria-label={`${d.day} ${d.month} ${d.year}`}>
        <b>{d.day}</b>
        <span>
          {d.month} {d.year}
        </span>
      </div>
      <div className="nws-b">
        <div className="nws-meta">
          {isNewItem(n) && <span className="nws-new">New</span>}
          {n.pinned && <span className="nws-pinned">Pinned</span>}
          {n.category && <span className="nws-tag">{n.category}</span>}
        </div>
        <h3>{n.title}</h3>
        {n.summary && <p>{n.summary}</p>}
        {n.type === 'video' && n.videoId ? (
          <Video id={n.videoId} title={n.title} />
        ) : (
          n.image && <img className="nws-img" src={n.image} alt="" loading="lazy" />
        )}
        <div className="nws-act">
          {n.link && (
            <a href={n.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          )}
          <a href={share} target="_blank" rel="noopener noreferrer">
            Share on WhatsApp
          </a>
        </div>
      </div>
    </li>
  );
}

export default function NewsPage() {
  const items = useNews();
  const [cat, setCat] = useState('All');

  const cats = useMemo(
    () => ['All', ...Array.from(new Set(items.map(n => n.category).filter(Boolean)))],
    [items]
  );
  const shown = cat === 'All' ? items : items.filter(n => n.category === cat);

  return (
    <div className="nws">
      <div className="nws-chips" role="group" aria-label="Filter news by category">
        {cats.map(c => (
          <button
            key={c}
            type="button"
            className="nws-chip"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {shown.length ? (
        <ul className="nws-list">
          {shown.map(n => (
            <Entry key={n.id || n.title} n={n} />
          ))}
        </ul>
      ) : (
        <p className="nws-empty">No news in this category yet. Check back soon.</p>
      )}
    </div>
  );
}
