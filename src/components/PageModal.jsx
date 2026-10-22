import React, { useEffect, useRef } from 'react';
import { PAGES_DATA } from '../data/pagesData';
import { ASK_DATA, COMMON_FAQS } from '../data/askData';
import SvgIcon from './SvgIcon';

const LEARNING_METHODS = [
  { title: 'Live virtual classes', icon: 'M3 6h12v12H3z|M15 10l6-3v10l-6-3' },
  { title: 'Recorded modules', icon: 'M5 4l14 8-14 8z' },
  { title: 'CBT learning and test series', icon: 'M5 4h14v16H5z|M9 9h6|M9 13h6|M9 17h3' },
  { title: 'Study materials', icon: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z|M12 6v14' },
  { title: 'Personal mentorship', icon: 'M8 8a3 3 0 100-6 3 3 0 000 6z|M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2' }
];

export default function PageModal({ pageKey, onClose, onNavigatePage, onBookDemo }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!pageKey) return;

    const el = modalRef.current;
    if (el) {
      el.scrollTop = 0;
      // Animate in reveal items
      const rvElements = el.querySelectorAll('.rv');
      rvElements.forEach((e, i) => {
        e.style.transitionDelay = `${(i % 4) * 70}ms`;
        e.classList.add('in');
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageKey]);

  if (!pageKey || !PAGES_DATA[pageKey]) return null;

  const data = PAGES_DATA[pageKey];
  const pathwayData = data.askPathway ? ASK_DATA[data.askPathway] : null;

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const y = el.scrollTop;
    const h = el.scrollHeight - el.clientHeight;
    el.style.setProperty('--ps', h > 0 ? (y / h).toFixed(3) : 0);
    el.style.setProperty('--py', Math.min(y, 700) * 0.35 + 'px');
  };

  return (
    <div
      className="pg"
      id="pg"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Airgen page"
      onScroll={handleScroll}
    >
      <div className="pgp"></div>
      <button className="pgx" onClick={onClose} aria-label="Close page">
        Close ✕
      </button>

      <div className="pgin" id="pgin">
        {/* Page Hero */}
        <div className="phero">
          <div className="pbg">
            <img src={data.heroImage} alt="" />
          </div>
          <div className="pov"></div>
          <svg className="pjet" viewBox="0 0 120 40" aria-hidden="true">
            <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
            <path d="M10 17L2 4L16 4L26 17Z" />
            <path d="M52 24L84 24L66 36L56 36Z" />
          </svg>
          <div className="pht">
            <div className="ppill">{data.subtitle}</div>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
          </div>
        </div>

        <div className="pgc">
          {/* Syllabus study cards if pathway page */}
          {pathwayData && (
            <>
              <h2 className="rv in">What you study with ASK</h2>
              <div className="sg">
                {pathwayData.rows.map((r, i) => (
                  <div key={i} className="sc rv in">
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <div className="sct">{r[0]}</div>
                    {r.length === 4 ? (
                      <>
                        <div className="chp k">
                          <b>Knowledge</b>
                          {r[1]}
                        </div>
                        <div className="chp s">
                          <b>Skills</b>
                          {r[2]}
                        </div>
                        <div className="chp a">
                          <b>Attitude</b>
                          {r[3]}
                        </div>
                      </>
                    ) : (
                      <div className="chp s">
                        <b>{pathwayData.headers[1]}</b>
                        {r[1]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {data.focusItems && (
                <>
                  <h2 className="rv in">Where we focus</h2>
                  <div className="fch rv in">
                    {data.focusItems.map((item, idx) => (
                      <span key={idx}>{item}</span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Area 100 KSA if EASA */}
          {data.ksaCards && (
            <>
              <h2 className="rv in">Understanding Area 100 KSA</h2>
              <div className="kcards">
                {data.ksaCards.map((card, idx) => (
                  <div key={idx} className="kc rv in">
                    <b>{card.title}</b>
                    <p>{card.text}</p>
                  </div>
                ))}
              </div>
              {data.note && (
                <p className="rv in" style={{ color: 'var(--muted)', marginTop: '14px' }}>
                  {data.note}
                </p>
              )}
            </>
          )}

          {/* Special ASK Model Breakdown */}
          {data.showVennBreakdown && (
            <>
              <h2 className="rv in">Three parts of one competency</h2>
              <div className="askg rv in">
                <svg className="venn vn2" viewBox="0 0 520 430" aria-hidden="true">
                  <circle cx="260" cy="140" r="130" fill="#F2A33A" opacity=".5" />
                  <circle cx="170" cy="275" r="130" fill="#3E8BD0" opacity=".5" />
                  <circle cx="350" cy="275" r="130" fill="#8FA4BA" opacity=".55" />
                  <text x="260" y="95">Attitude</text>
                  <text x="110" y="320">Skills</text>
                  <text x="410" y="320">Knowledge</text>
                  <text className="s" x="260" y="226">Airline-ready</text>
                  <text className="s" x="260" y="246">pilot</text>
                </svg>
                <div className="cmp">
                  <div>
                    <b>Attitude</b>
                    <span>Professional mindset. We train discipline, communication and decision making.</span>
                  </div>
                  <div>
                    <b>Skills</b>
                    <span>Pilot thinking ability. We train mental math, problem solving and situational awareness.</span>
                  </div>
                  <div>
                    <b>Knowledge</b>
                    <span>ATPL subjects. DGCA, FAA and EASA theory.</span>
                  </div>
                </div>
              </div>

              <h2 className="rv in">How ASK is assessed</h2>
              <div className="stp">
                {data.assessmentSteps.map((step, idx) => (
                  <div key={idx} className="rv in">
                    {step}
                  </div>
                ))}
              </div>

              <h2 className="rv in">How you are graded</h2>
              <div className="grd rv in">
                {data.grades.map((g, idx) => (
                  <div key={idx}>
                    {g.title}
                    <span>{g.desc}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Platform Features Grid & Dashboard */}
          {data.features && (
            <>
              <h2 className="rv in">Everything in one campus</h2>
              <div className="lt">
                {data.features.map((feat, idx) => (
                  <div key={idx} className="lg rv in">
                    <SvgIcon pathString={feat.icon} />
                    <span>{feat.title}</span>
                  </div>
                ))}
              </div>

              <h2 className="rv in">See progress at a glance</h2>
              <div className="dash in rv">
                <small>Sample view, illustrative only (not real student data)</small>
                {data.dashboardMetrics.map((metric, idx) => (
                  <div key={idx} className="bar">
                    <span>{metric.name}</span>
                    <i style={{ '--w': metric.value }}></i>
                  </div>
                ))}
              </div>

              <h2 className="rv in">Built for aviation training organisations</h2>
              <p className="rv in">{data.overviewParagraph}</p>
              <div className="fch rv in">
                {data.chips.map((chip, idx) => (
                  <span key={idx}>{chip}</span>
                ))}
              </div>
            </>
          )}

          {/* Feature Photo */}
          {data.featureImage && (
            <figure className="pimg rv in">
              <img src={data.featureImage.src} alt={data.featureImage.alt} loading="lazy" />
              <figcaption>{data.featureImage.caption}</figcaption>
            </figure>
          )}

          {/* Learning methods */}
          {!data.features && !data.showVennBreakdown && (
            <>
              <h2 className="rv in">How you learn</h2>
              <div className="lt">
                {LEARNING_METHODS.map((item, idx) => (
                  <div key={idx} className="lg rv in">
                    <SvgIcon pathString={item.icon} />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* FAQs */}
          {(data.showFaqs || pageKey === 'easa' || pageKey === 'ask') && (
            <>
              <h2 className="rv in">Common questions</h2>
              {COMMON_FAQS.map((faq, idx) => (
                <details key={idx} className="rv in">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </>
          )}

          {/* CTA Banner */}
          <div className="pcta rv in">
            <div>
              <h2>{data.ctaTitle}</h2>
              <p>Talk to a pilot mentor about your pathway, medical and budget.</p>
            </div>
            <button
              className="btn pri"
              onClick={() => {
                onClose();
                if (onBookDemo) onBookDemo();
              }}
            >
              {data.ctaButton}
            </button>
          </div>

          {/* Next Explore Links */}
          {data.next && (
            <div className="pnext rv in">
              <span>Explore next:</span>
              {data.next.map((item) => (
                <button
                  key={item.key}
                  className="lnk"
                  onClick={() => onNavigatePage(item.key)}
                >
                  {item.label} →
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
