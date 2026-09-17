import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import { useRef } from "react";
import { useFlight } from "../../context/FlightContext";
import { ABOUT, COURSES, DESTINATIONS, INCLUDED_FEATURES, SITE, VISUAL_STORY } from "../../lib/content";
import { useInView } from "../../lib/hooks";
import { Founders } from "./Founders";

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function ContentSections() {
  const { setEnquiryModalOpen } = useFlight();

  const openCourse = (id: string) => {
    window.location.hash = `course/${id}`;
  };

  return (
    <>
      <section id="about" className="editorial-section about-section">
        <Reveal className="section-intro">
          <div className="eyebrow"><span /> About AirGen</div>
          <h2>Prepare for the cockpit.<br /><strong>Not just the exam.</strong></h2>
        </Reveal>

        <div className="about-copy">
          <Reveal delay={60}>
            <p className="lead">{ABOUT.lead}</p>
            <p className="about-body">{ABOUT.body}</p>
          </Reveal>

          <Reveal className="about-stats" delay={120}>
            {ABOUT.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </Reveal>

          <Reveal className="about-pillars" delay={160}>
            <div><span>Mission</span><p>{ABOUT.mission}</p></div>
            <div><span>Vision</span><p>{ABOUT.vision}</p></div>
          </Reveal>

          <Reveal className="value-grid" delay={200}>
            {ABOUT.values.map((value) => (
              <div key={value.title}><strong>{value.title}</strong><p>{value.detail}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="visual-story">
        <Reveal className="visual-story-head">
          <div className="eyebrow"><span /> The training system</div>
          <p>Real preparation, in the places it actually happens.</p>
        </Reveal>
        <Reveal className="visual-grid" delay={80}>
          {VISUAL_STORY.map((card) => (
            <figure key={card.src}>
              <img src={card.src} alt={card.title} loading="lazy" />
              <figcaption><span>{card.tag}</span><strong>{card.title}</strong></figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <Founders />

      <section id="locations" className="location-section">
        <Reveal className="section-intro">
          <div className="eyebrow"><span /> Global flight training</div>
          <h2>Ground school here.<br /><strong>Flight hours anywhere.</strong></h2>
          <p>Cadets complete ground school with AirGen, then build hours with a partner organisation abroad.</p>
        </Reveal>
        <Reveal className="location-grid" delay={80}>
          {DESTINATIONS.map((destination) => (
            <div key={destination.id} className="location-card">
              <Globe2 size={16} />
              <span>{destination.regulator}</span>
              <strong>{destination.city}</strong>
              <small>{destination.country}</small>
              <em>{destination.aircraft}</em>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="courses" className="course-section-v18">
        <div className="course-v18-shell">
          <Reveal className="course-v18-header">
            <div>
              <div className="eyebrow"><span /> Regulatory pathways</div>
              <h2>Choose the pathway.<br /><strong>Keep the AirGen standard.</strong></h2>
            </div>
            <p>Explore the DGCA, FAA and EASA pathways and open a dedicated view for each course track.</p>
          </Reveal>

          <div className="course-v18-grid">
            {COURSES.map((course, index) => (
              <Reveal key={course.id} className="course-v18-card" delay={index * 70}>
                <div className="course-v18-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{course.regulator}</b>
                  <small>{course.region}</small>
                </div>
                <div className="course-v18-card-main">
                  <span>{course.tagline}</span>
                  <h3>{course.regulator} pathway</h3>
                  <p>{course.description}</p>
                  <ul>
                    {course.highlights.slice(0, 4).map((item) => <li key={item}><Check size={13} /> {item}</li>)}
                  </ul>
                </div>
                <button className="course-v18-open focus-ring" onClick={() => openCourse(course.id)}>
                  Explore pathway <ArrowUpRight size={15} />
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="included-v18" delay={180}>
            <div className="included-head"><strong>Included in every pathway</strong><span>{INCLUDED_FEATURES.length} inclusions</span></div>
            <div className="included-v18-grid">
              {INCLUDED_FEATURES.map((feature) => <div key={feature}><Check size={13} /> {feature}</div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <Reveal>
          <div className="eyebrow"><span /> Start the conversation</div>
          <h2>Ready for<br /><strong>takeoff?</strong></h2>
          <p>{SITE.promise}</p>
        </Reveal>
        <Reveal delay={80}>
          <button className="primary-button focus-ring" onClick={() => setEnquiryModalOpen(true)}>
            Open enquiry <ArrowUpRight size={16} />
          </button>
        </Reveal>
      </section>
    </>
  );
}
