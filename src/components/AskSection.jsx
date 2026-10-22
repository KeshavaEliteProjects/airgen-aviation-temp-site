import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASK_DATA } from '../data/askData';
import MentalMathTrainer from './MentalMathTrainer';
import PhoneticTool from './PhoneticTool';

export default function AskSection({ onOpenPage }) {
  const [activeTab, setActiveTab] = useState('DGCA');
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.pillars div, .grades div', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pillars',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabKeys = ['DGCA', 'FAA', 'EASA'];
  const currentPathway = ASK_DATA[activeTab];

  const handleKeyDownTab = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabKeys.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabKeys.length) % tabKeys.length;

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveTab(tabKeys[nextIndex]);
    }
  };

  return (
    <section className="ask" id="ask" ref={sectionRef}>
      <div className="wrap">
        <div className="lead">
          <h2>Most academies teach subjects. Airgen trains pilot competencies.</h2>
          <p>
            ASK is not a subject. It is a competency system woven through every subject and every
            licence — the bridge between DGCA theory and airline reality.
          </p>
        </div>

        {/* Venn Diagram */}
        <svg
          className="venn"
          viewBox="0 0 520 430"
          role="button"
          tabIndex={0}
          onClick={() => onOpenPage('ask')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenPage('ask');
            }
          }}
          aria-label="Attitude, Skills and Knowledge overlap to form an airline-ready pilot. Open the ASK page"
        >
          <circle cx="260" cy="140" r="130" fill="#F2A33A" opacity=".5" />
          <circle cx="170" cy="275" r="130" fill="#3E8BD0" opacity=".5" />
          <circle cx="350" cy="275" r="130" fill="#8FA4BA" opacity=".55" />
          <text x="260" y="95">
            Attitude
          </text>
          <text x="110" y="320">
            Skills
          </text>
          <text x="410" y="320">
            Knowledge
          </text>
          <text className="s" x="260" y="226">
            Airline-ready
          </text>
          <text className="s" x="260" y="246">
            pilot
          </text>
        </svg>

        <p className="vhint">Tap the diagram to explore ASK →</p>

        <p style={{ textAlign: 'center', color: 'var(--muted)', margin: '0 auto 14px' }}>
          ASK is integrated into
        </p>
        <div className="chips">
          <span>Ground school</span>
          <span>Test series</span>
          <span>Mental maths training</span>
          <span>Scenario-based classes</span>
          <span>Progress reviews</span>
          <span>Interview preparation</span>
          <span>Airline competency preparation</span>
        </div>

        <div className="pillars">
          <div>
            <h3>Attitude</h3>
            <p>Professional mindset: discipline, communication and decision making.</p>
          </div>
          <div>
            <h3>Skills</h3>
            <p>Pilot thinking: mental maths, problem solving and situational awareness.</p>
          </div>
          <div>
            <h3>Knowledge</h3>
            <p>The ATPL subjects of DGCA, FAA and EASA theory.</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="tabs" role="tablist" aria-label="Licence pathway">
          {tabKeys.map((key, i) => (
            <button
              key={key}
              role="tab"
              id={`tab-${key}`}
              aria-controls="panel"
              aria-selected={activeTab === key}
              tabIndex={activeTab === key ? 0 : -1}
              onClick={() => setActiveTab(key)}
              onKeyDown={(e) => handleKeyDownTab(e, i)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Table Panel */}
        <div className="tbl" id="panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${activeTab}`}>
          <table>
            <thead>
              <tr>
                {currentPathway.headers.map((h, idx) => (
                  <th key={idx}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPathway.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="focus" id="focus">
          <b>Focus:</b> {currentPathway.focus}
        </p>

        <p>
          <button
            className="lnk"
            id="fullpg"
            onClick={() => onOpenPage(activeTab.toLowerCase())}
          >
            Open the full {activeTab} page →
          </button>
        </p>

        <h3 style={{ marginTop: '72px', fontSize: '1.6rem' }}>How ASK is assessed</h3>
        <p style={{ color: 'var(--muted)', marginTop: '.6em' }}>
          Through instructor observation, scenario exercises, mental arithmetic tests, progress
          reviews and structured assessments — graded on a developmental scale, so support comes
          early.
        </p>

        <div className="grades">
          <div>
            <h3>Standard achieved</h3>
            <p>You are meeting the expected competency standard.</p>
          </div>
          <div>
            <h3>Improvement recommended</h3>
            <p>You are progressing, with specific areas to strengthen.</p>
          </div>
          <div>
            <h3>Further development required</h3>
            <p>You need more support in this competency before moving on.</p>
          </div>
        </div>

        <p style={{ marginTop: '24px' }}>
          <button className="lnk" onClick={() => onOpenPage('ask')}>
            Read the full ASK model and FAQ →
          </button>
        </p>

        <figure className="photo">
          <img
            src="/assets/photo-flight-computer.jpg"
            alt="Hands using a flight computer beside a flight plan and headset"
            loading="lazy"
          />
          <figcaption>Skills in practice: time, fuel and distance on the flight computer.</figcaption>
        </figure>

        <MentalMathTrainer />
        <PhoneticTool />
      </div>
    </section>
  );
}
