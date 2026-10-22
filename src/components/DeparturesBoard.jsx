import React, { useState, useEffect, useRef } from 'react';
import { DEPARTURE_ROWS, FLAP_WORDS } from '../data/departureBoardData';

function FlapWord({ word }) {
  // 7 character slots
  const chars = Array.from({ length: 7 }, (_, i) => word[i] || ' ');
  const [displayChars, setDisplayChars] = useState(chars);
  const [flippingIndices, setFlippingIndices] = useState([]);

  useEffect(() => {
    // When word changes, flip each character staggered
    chars.forEach((ch, k) => {
      setTimeout(() => {
        setFlippingIndices((prev) => [...prev, k]);
        setTimeout(() => {
          setDisplayChars((prev) => {
            const next = [...prev];
            next[k] = ch;
            return next;
          });
          setTimeout(() => {
            setFlippingIndices((prev) => prev.filter((idx) => idx !== k));
          }, 180);
        }, 150);
      }, k * 55);
    });
  }, [word]);

  return (
    <span className="bs" aria-hidden="true">
      {displayChars.map((ch, idx) => (
        <i key={idx} className={flippingIndices.includes(idx) ? 'f' : ''}>
          {ch === ' ' ? '\u00a0' : ch}
        </i>
      ))}
    </span>
  );
}

export default function DeparturesBoard({ onOpenPage }) {
  const [cycleIndex, setCycleIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let intervalId = null;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!intervalId) {
            intervalId = setInterval(() => {
              setCycleIndex((prev) => prev + 1);
            }, 3200);
          }
        } else {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="board" id="board" ref={sectionRef}>
      <div className="wrap">
        <h2>Departures</h2>
        <p>Three pathways, one journey: think, train, fly, advance, command.</p>

        <div className="bh">
          <span>Pathway</span>
          <span>Region</span>
          <span className="bfo">Focus</span>
          <span>Journey stage</span>
        </div>

        {DEPARTURE_ROWS.map((row, i) => {
          const currentWord = FLAP_WORDS[(cycleIndex + i) % FLAP_WORDS.length];
          return (
            <button
              key={row.pageKey}
              className="brow"
              onClick={() => onOpenPage(row.pageKey)}
              aria-label={`Open the ${row.pathway} page`}
            >
              <span className="bc">{row.pathway}</span>
              <span className="bc">{row.region}</span>
              <span className="bf bfo">{row.focus}</span>
              <FlapWord word={currentWord} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
