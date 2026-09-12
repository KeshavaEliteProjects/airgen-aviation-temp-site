import { Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useFlight } from "../../context/FlightContext";
import { TESTIMONIALS } from "../../lib/content";
import { useInView, useReducedMotion } from "../../lib/hooks";

export function Testimonials() {
  const { setActiveTestimonial } = useFlight();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef);
  const [hovered, setHovered] = useState<string | null>(null);
  const previewRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    Object.values(previewRefs.current).forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
    if (hovered && !reducedMotion) {
      const video = previewRefs.current[hovered];
      video?.play().catch(() => undefined);
    }
  }, [hovered, reducedMotion]);

  return (
    <section ref={sectionRef} id="testimonials" className={`testimonials testimonials-clean ${inView ? "is-in" : ""}`}>
      <div className="testimonials-grid-clean">
        <header className="testimonials-head-clean">
          <div className="eyebrow"><span /> From the flight deck</div>
          <h2>Cadets who<br /><strong>made it through.</strong></h2>
          <p>Move across the stories to bring a story forward — the nearest tiles glow, the rest recede. Click one to play it in full.</p>
          <div className="testimonials-meta">
            <span>DGCA · FAA · EASA CADETS</span>
            <strong>{TESTIMONIALS.length} video testimonials</strong>
            <small>Hover a tile to preview it, click to open the full clip.</small>
          </div>
        </header>

        <div className="testimonial-rail-clean">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`testimonial-tile-clean ${hovered === testimonial.id ? "is-hovered" : ""}`}
              style={{ "--delay": `${index * 65}ms` } as CSSProperties}
              onMouseEnter={() => setHovered(testimonial.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(testimonial.id)}
              onBlur={() => setHovered(null)}
              onClick={() => setActiveTestimonial(testimonial)}
            >
              <img src={testimonial.poster} alt="" aria-hidden="true" />
              <video
                ref={(node) => { previewRefs.current[testimonial.id] = node; }}
                src={testimonial.video}
                poster={testimonial.still}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="testimonial-tile-shade" />
              <span className="testimonial-tile-content">
                <small>0{index + 1}</small>
                <strong>{testimonial.name}</strong>
                <em>{testimonial.pathway}</em>
              </span>
              <span className="testimonial-tile-play"><Play size={13} fill="currentColor" /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
