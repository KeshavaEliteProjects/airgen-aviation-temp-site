import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SvgIcon, PI } from '../utils/icons';

gsap.registerPlugin(ScrollTrigger);

export default function CareerSection() {
  const hzRef = useRef(null);
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const hbarRef = useRef(null);
  const hsRef = useRef(null);
  const hprogRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hz = hzRef.current;
    const tr = trackRef.current;
    const pin = pinRef.current;
    if (!hz || !tr || !pin) return;

    if (rm) {
      tr.style.flexWrap = 'wrap';
      return;
    }

    const ctx = gsap.context(() => {
      const sc = (triggerEl, a, b) => ({
        trigger: triggerEl,
        start: a || 'top 85%',
        end: b || 'top 35%',
        scrub: 0.8
      });

      gsap.fromTo(
        '.hz .head',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', scrollTrigger: sc(hz, 'top 90%', 'top 40%') }
      );

      gsap.fromTo(
        '.hz .head h2',
        { clipPath: 'inset(0 0 100% 0)', y: 36, opacity: 0 },
        {
          clipPath: 'inset(0 0 -10% 0)',
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.hz .head h2', start: 'top 88%', refreshPriority: -1 }
        }
      );

      // Desktop horizontal pinning
      const mm = gsap.matchMedia();
      mm.add('(min-width: 801px)', () => {
        const ps = [...tr.querySelectorAll('.panel')];
        const bar = hbarRef.current;
        const hs = hsRef.current;
        const hq = hprogRef.current;

        hz.classList.add('live');
        if (ps[0]) ps[0].classList.add('act');

        gsap.to(tr, {
          x: () => -(tr.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 0.6,
            start: 'top top',
            end: () => '+=' + (tr.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            onUpdate: s => {
              const i = Math.min(5, Math.round(s.progress * 5));
              if (bar) bar.style.width = `${s.progress * 100}%`;
              if (hs) hs.textContent = `Step ${i + 1} of 6${s.progress > 0.99 ? ' \u00b7 complete' : ''}`;
              ps.forEach((p, k) => p.classList.toggle('act', k === i));

              if (hq) {
                hq.classList.add('walking');
                clearTimeout(hq._t);
                hq._t = setTimeout(() => hq.classList.remove('walking'), 220);
                hq.querySelectorAll('u').forEach((u, k) => u.classList.toggle('on', s.progress >= k / 5 - 0.001));
              }
            }
          }
        });

        // 3D tilt
        if (window.matchMedia('(hover:hover) and (min-width: 801px)').matches) {
          ps.forEach(p => {
            const rx = gsap.quickTo(p, 'rotationX', { duration: 0.4 });
            const ry = gsap.quickTo(p, 'rotationY', { duration: 0.4 });
            p.style.transformPerspective = '800px';

            const onMove = e => {
              const r = p.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 8);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
            };
            const onLeave = () => {
              rx(0);
              ry(0);
            };

            p.addEventListener('pointermove', onMove);
            p.addEventListener('pointerleave', onLeave);
            p._cleanupTilt = () => {
              p.removeEventListener('pointermove', onMove);
              p.removeEventListener('pointerleave', onLeave);
            };
          });
        }

        return () => {
          hz.classList.remove('live');
          ps.forEach(p => {
            if (p._cleanupTilt) p._cleanupTilt();
          });
        };
      });
    }, hzRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={hzRef} className="hz" id="career">
      <div className="head">
        <h2>Stage 3: from ATPL graduate to airline pilot to Captain.</h2>
        <p style={{ marginTop: '1rem' }}>
          Airgen continues beyond examinations. The aim is not simply to get a pilot job, but to build the competencies required to progress toward command.
        </p>
      </div>

      <div ref={pinRef} className="pin">
        <div ref={hprogRef} className="hprog" aria-hidden="true">
          <span id="hs" ref={hsRef}>
            Step 1 of 6
          </span>
          <b>
            <u className="on" style={{ left: '0%' }} />
            <u style={{ left: '20%' }} />
            <u style={{ left: '40%' }} />
            <u style={{ left: '60%' }} />
            <u style={{ left: '80%' }} />
            <u style={{ left: '100%' }} />
            <i id="hbar" ref={hbarRef}>
              <span className="walker">
                <svg viewBox="0 0 24 34">
                  <circle cx="12" cy="5" r="3.4" fill="#0D1B2E" />
                  <path d="M12 8.6V19" stroke="#0D1B2E" strokeWidth="2.4" strokeLinecap="round" />
                  <path className="ar ar1" d="M12 11L8 18" />
                  <path className="ar ar2" d="M12 11L16 18" />
                  <path className="lg lg1" d="M12 19L9 31" />
                  <path className="lg lg2" d="M12 19L15 31" />
                </svg>
              </span>
            </i>
          </b>
        </div>

        <div className="track" id="track" ref={trackRef}>
          {/* Panel 1 */}
          <article className="panel">
            <SvgIcon d={PI[0]} />
            <div className="n">1</div>
            <h3>Airline readiness assessment</h3>
            <p className="pn">Before applying, students are evaluated across:</p>
            <div className="tg">
              <span>Technical knowledge</span>
              <span>Aviation fundamentals</span>
              <span>Communication</span>
              <span>Mental mathematics</span>
              <span>Situational awareness</span>
              <span>Decision making</span>
              <span>Problem solving</span>
              <span>Professional attitude</span>
              <span>CRM &amp; teamwork</span>
            </div>
          </article>

          {/* Panel 2 */}
          <article className="panel">
            <SvgIcon d={PI[1]} />
            <div className="n">2</div>
            <h3>Airline selection preparation</h3>
            <div className="tg">
              <span>Technical interview preparation</span>
              <span>Aircraft systems fundamentals</span>
              <span>Performance &amp; limitations</span>
              <span>Flight planning</span>
              <span>Meteorology</span>
              <span>Navigation</span>
              <span>Air law &amp; operational procedures</span>
            </div>
            <div className="tg">
              <span>HR interview</span>
              <span>Communication</span>
              <span>Leadership</span>
              <span>Decision making</span>
              <span>Situational awareness</span>
              <span>Teamwork</span>
              <span>Stress &amp; workload management</span>
            </div>
          </article>

          {/* Panel 3 */}
          <article className="panel">
            <SvgIcon d={PI[2]} />
            <div className="n">3</div>
            <h3>Assessment centre preparation</h3>
            <p className="pn">Competencies commonly encountered during airline selection:</p>
            <div className="tg">
              <span>Aptitude assessments</span>
              <span>Numerical reasoning</span>
              <span>Verbal reasoning</span>
              <span>Spatial reasoning</span>
              <span>Technical assessments</span>
              <span>Multi-tasking</span>
              <span>Group exercises</span>
              <span>Communication exercises</span>
              <span>Competency-based interviews</span>
            </div>
          </article>

          {/* Panel 4 */}
          <article className="panel">
            <SvgIcon d={PI[3]} />
            <div className="n">4</div>
            <h3>Simulator and type-rating readiness</h3>
            <p className="pn">Build the mindset required before entering airline training:</p>
            <div className="tg">
              <span>SOP discipline</span>
              <span>Cockpit procedures</span>
              <span>Checklist philosophy</span>
              <span>CRM</span>
              <span>TEM</span>
              <span>Automation awareness</span>
              <span>Situational awareness</span>
              <span>Workload management</span>
              <span>Decision making</span>
            </div>
            <p className="pn">Enter type rating or airline training with a professional cockpit mindset, not from zero.</p>
          </article>

          {/* Panel 5 */}
          <article className="panel">
            <SvgIcon d={PI[4]} />
            <div className="n">5</div>
            <h3>First Officer development</h3>
            <p className="pn">Cadet &rarr; Junior First Officer &rarr; First Officer</p>
            <div className="tg">
              <span>Operational discipline</span>
              <span>Line-oriented thinking</span>
              <span>CRM</span>
              <span>SOP adherence</span>
              <span>Threat &amp; Error Management</span>
              <span>Continuous learning</span>
              <span>Professional development</span>
            </div>
          </article>

          {/* Panel 6 */}
          <article className="panel">
            <SvgIcon d={PI[5]} />
            <div className="n">6</div>
            <h3>Command development</h3>
            <p className="pn">First Officer &rarr; Senior First Officer &rarr; Command</p>
            <div className="tg">
              <span>Leadership</span>
              <span>Crew management</span>
              <span>Decision making</span>
              <span>Risk management</span>
              <span>Operational judgement</span>
              <span>Situational awareness</span>
              <span>Communication</span>
              <span>Conflict management</span>
              <span>Mentoring</span>
              <span>Safety leadership</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
