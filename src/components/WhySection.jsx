import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhySection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      gsap.from('.why .pk, .whyh, .lead2', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });

      const cards = gsap.utils.toArray('.wb');
      cards.forEach(b => {
        gsap.from(b, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: b,
            start: 'top 86%'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why" id="why">
      <div className="wrap">
        <div className="pk">Why AirGen Aviation?</div>
        <h2 className="whyh">
          Precision cadet training engineered for DGCA excellence &amp; airline readiness.
        </h2>
        <p className="lead2">
          At AirGen Aviation, we deliver a bespoke, high-touch training environment designed to transform aspiring pilots into commercial first officers. We reject high-volume, assembly-line flight instruction in favor of personalized mentorship, academic rigor, and complete alignment with DGCA standards.
        </p>
        <p className="lead2">
          By embedding our proprietary ASK (Attitude, Skills, and Knowledge) competency framework directly into DGCA ground school, we bridge the critical gap between passing written exams and excelling on an airline flight deck.
        </p>
        <div className="wy">
          <article className="wb">
            <span className="wn">01</span>
            <div>
              <h3>The ASK Framework: Operationally Ready, Not Just Exam-Qualified</h3>
              <p>
                Modern airlines demand first officers who can make sound decisions under pressure, manage workload, and cross-check automation effectively. We build these competencies from day one:
              </p>
              <ul className="wl">
                <li>
                  <b>Attitude:</b> Developing professional judgment, open communication, situational awareness, and proactive threat and error management (TEM).
                </li>
                <li>
                  <b>Skills:</b> Building numerical reasoning, rapid mental arithmetic (estimating fuel, time, and performance without calculators), and real-time decision-making.
                </li>
                <li>
                  <b>Knowledge:</b> Deep conceptual understanding of DGCA theory, moving beyond rote memorization to practical operational application.
                </li>
              </ul>
            </div>
          </article>

          <article className="wb">
            <span className="wn">02</span>
            <div>
              <h3>Small Cohorts &amp; Bespoke Support</h3>
              <ul className="wl">
                <li>
                  <b>Optimized Class Sizes:</b> We strictly limit intake capacity to guarantee an optimal learning environment and direct, personalized engagement between cadets and faculty.
                </li>
                <li>
                  <b>End-to-End Administrative Guidance:</b> From initial eGCA portal setup and DGCA Computer Number processing to flight clearances and licensing, our dedicated student support team manages your journey at every step.
                </li>
              </ul>
            </div>
          </article>

          <article className="wb">
            <span className="wn">03</span>
            <div>
              <h3>30+ Industry-Expert Instructors</h3>
              <p>
                Our faculty consists of over 30 seasoned airline captains, ground evaluators, and subject matter experts chosen for their practical industry experience.
              </p>
              <ul className="wl">
                <li>
                  <b>Scenario-Based Teaching:</b> Complex theoretical topics in Air Navigation, Air Meteorology, Air Regulations, and Aircraft Technical General are brought to life through real-world operational scenarios.
                </li>
                <li>
                  <b>Progressive Competency Evaluations:</b> Continuous formative assessments and structured progress reviews ensure early developmental feedback rather than late failure.
                </li>
              </ul>
            </div>
          </article>

          <article className="wb">
            <span className="wn">04</span>
            <div>
              <h3>Industry Leadership &amp; Continuous Guidance</h3>
              <ul className="wl">
                <li>
                  <b>Authoritative Publications:</b> We regularly publish expert articles and regulatory guides on DGCA requirements, RTR (A) preparation, and pilot recruitment trends to keep cadets fully informed.
                </li>
                <li>
                  <b>Seamless Airline Transition:</b> Cadets trained under our integrated ASK framework enter type rating courses, simulator evaluations, and airline assessments with superior confidence and flight deck discipline.
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
