import React, { useEffect, useRef } from 'react';
import { renderPageContent } from '../utils/pageContent';

export default function PageOverlay({ pageKey, onClose, onNavigate, onDemo }) {
  const pgRef = useRef(null);
  const pginRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!pageKey) return;
    const pgEl = pgRef.current;
    if (!pgEl) return;

    pgEl.scrollTop = 0;
    if (closeBtnRef.current) closeBtnRef.current.focus();

    // Scroll progress & parallax
    const handleScroll = () => {
      const y = pgEl.scrollTop;
      const h = pgEl.scrollHeight - pgEl.clientHeight;
      pgEl.style.setProperty('--ps', h > 0 ? (y / h).toFixed(3) : 0);
      pgEl.style.setProperty('--py', Math.min(y, 700) * 0.35 + 'px');
    };

    pgEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Observer for .rv elements
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pgin = pginRef.current;
    let observer = null;

    if (pgin) {
      const els = [...pgin.querySelectorAll('.rv')];
      if (rm || !('IntersectionObserver' in window)) {
        els.forEach(e => e.classList.add('in'));
      } else {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(x => {
              if (x.isIntersecting) {
                x.target.classList.add('in');
                observer.unobserve(x.target);
              }
            });
          },
          { root: pgEl, rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
        );

        els.forEach((e, i) => {
          e.style.transitionDelay = (i % 4) * 70 + 'ms';
          observer.observe(e);
        });
      }
    }

    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      pgEl.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      if (observer) observer.disconnect();
    };
  }, [pageKey, onClose]);

  if (!pageKey) return null;

  return (
    <div
      ref={pgRef}
      className="pg"
      id="pg"
      role="dialog"
      aria-modal="true"
      aria-label="Airgen page"
    >
      <div className="pgp" />
      <button
        ref={closeBtnRef}
        className="pgx"
        data-pgclose
        aria-label="Close page"
        onClick={onClose}
      >
        Close &#x2715;
      </button>
      <div className="pgin" id="pgin" ref={pginRef}>
        {renderPageContent(pageKey, {
          onNavigate,
          onDemo: () => {
            onClose();
            onDemo();
          }
        })}
      </div>
    </div>
  );
}
