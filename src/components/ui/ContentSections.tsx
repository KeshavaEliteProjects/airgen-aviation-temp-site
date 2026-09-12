import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import { useRef } from "react";
import { useFlight } from "../../context/FlightContext";
import {
  ABOUT,
  COURSES,
  DESTINATIONS,
  FOUNDERS,
  INCLUDED_FEATURES,
  SITE,
  VISUAL_STORY,
} from "../../lib/content";
import { useInView } from "../../lib/hooks";

/** Wraps a block so it fades and lifts once, the first time it is scrolled to. */
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
  const { setActiveFounder, setEnquiryModalOpen } = useFlight();

  return (
    <>
      <section id="about" className="editorial-section about-section">
        <Reveal className="section-intro">
          <div className="eyebrow">
            <span /> About AirGen
          </div>
          <h2>
            Prepare for the cockpit.
            <br />
            <strong>Not just the exam.</strong>
          </h2>
        </Reveal>

        <div className="about-copy">
          <Reveal delay={60}>
            <p className="lead">{ABOUT.lead}</p>
            <p className="about-body">{ABOUT.body}</p>
          </Reveal>

          <Reveal className="about-stats" delay={120}>
            {ABOUT.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="about-pillars" delay={160}>
            <div>
              <span>Mission</span>
              <p>{ABOUT.mission}</p>
            </div>
            <div>
              <span>Vision</span>
              <p>{ABOUT.vision}</p>
            </div>
          </Reveal>

          <Reveal className="value-grid" delay={200}>
            {ABOUT.values.map((value) => (
              <div key={value.title}>
                <strong>{value.title}</strong>
                <p>{value.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="visual-story">
        <Reveal className="visual-story-head">
          <div className="eyebrow">
            <span /> The training system
          </div>
          <p>Real preparation, in the places it actually happens.</p>
        </Reveal>
        <Reveal className="visual-grid" delay={80}>
          {VISUAL_STORY.map((card) => (
            <figure key={card.src}>
              <img src={card.src} alt={card.title} loading="lazy" />
              <figcaption>
                <span>{card.tag}</span>
                <strong>{card.title}</strong>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section id="founders" className="editorial-section founders-section">
        <Reveal className="section-intro">
          <div className="eyebrow">
            <span /> Founding team
          </div>
          <h2>
            People behind
            <br />
            <strong>the standard.</strong>
          </h2>
        </Reveal>
        <Reveal className="founder-grid" delay={80}>
          {FOUNDERS.map((founder) => (
            <button
              key={founder.id}
              className="founder-card focus-ring"
              onClick={() => setActiveFounder(founder)}
            >
              <span>{founder.initials}</span>
              <small>{founder.role}</small>
              <strong>{founder.name}</strong>
              <p>{founder.focus}</p>
              <i>
                <ArrowUpRight size={16} />
              </i>
            </button>
          ))}
        </Reveal>
      </section>

      <section id="locations" className="location-section">
        <Reveal className="section-intro">
          <div className="eyebrow">
            <span /> Global flight training
          </div>
          <h2>
            Ground school here.
            <br />
            <strong>Flight hours anywhere.</strong>
          </h2>
          <p>
            Cadets complete ground school with AirGen, then build hours with a partner organisation
            abroad.
          </p>
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

      <section id="courses" className="course-section">
        <Reveal className="section-intro">
          <div className="eyebrow">
            <span /> Regulatory pathways
          </div>
          <h2>
            Three regulators.
            <br />
            <strong>One standard.</strong>
          </h2>
        </Reveal>
        <div className="course-column">
          <Reveal className="course-grid" delay={80}>
            {COURSES.map((course) => (
              <article key={course.id} className="course-card">
                <div>
                  <span>{course.regulator}</span>
                  <small>{course.region}</small>
                </div>
                <h3>{course.tagline}</h3>
                <p>{course.description}</p>
                <ul>
                  {course.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>

          <Reveal className="included" delay={140}>
            <div className="included-head">
              <strong>Included in every pathway</strong>
              <span>{INCLUDED_FEATURES.length} inclusions</span>
            </div>
            <ul>
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature}>
                  <Check size={13} /> {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <Reveal>
          <div className="eyebrow">
            <span /> Start the conversation
          </div>
          <h2>
            Ready for
            <br />
            <strong>takeoff?</strong>
          </h2>
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
