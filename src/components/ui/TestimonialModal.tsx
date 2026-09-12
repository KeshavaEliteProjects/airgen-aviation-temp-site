import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFlight } from "../../context/FlightContext";
import { TESTIMONIALS } from "../../lib/content";

export function TestimonialModal() {
  const { activeTestimonial, setActiveTestimonial } = useFlight();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [failed, setFailed] = useState(false);

  const index = activeTestimonial
    ? TESTIMONIALS.findIndex((item) => item.id === activeTestimonial.id)
    : -1;

  const step = useCallback(
    (delta: number) => {
      if (index < 0) return;
      const next = (index + delta + TESTIMONIALS.length) % TESTIMONIALS.length;
      setActiveTestimonial(TESTIMONIALS[next]);
    },
    [index, setActiveTestimonial],
  );

  const close = useCallback(() => setActiveTestimonial(null), [setActiveTestimonial]);

  useEffect(() => {
    if (!activeTestimonial) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTestimonial, close, step]);

  // The click that opened this counts as the gesture, so audio is allowed.
  useEffect(() => {
    setFailed(false);
    if (!activeTestimonial) return;
    closeRef.current?.focus();
    const node = videoRef.current;
    if (!node) return;
    node.currentTime = 0;
    node.muted = false;
    // Autoplay policies refuse sound in some contexts; play it muted rather
    // than leaving the viewer looking at a paused frame.
    void node.play().catch(() => {
      node.muted = true;
      void node.play().catch(() => undefined);
    });
  }, [activeTestimonial]);

  if (!activeTestimonial) return null;
  const testimonial = activeTestimonial;

  return (
    <div
      className="modal-shell"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.name}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-card modal-card--video">
        <button ref={closeRef} className="modal-close focus-ring" onClick={close} aria-label="Close">
          <X size={18} />
        </button>

        <div className="video-frame">
          {failed ? (
            <div className="video-fallback">
              <img src={testimonial.still} alt="" aria-hidden="true" />
              <p>
                This clip isn’t available yet. The testimonial is below.
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={testimonial.video}
              poster={testimonial.still}
              controls
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
            />
          )}

          <button
            className="video-step video-step--prev focus-ring"
            onClick={() => step(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="video-step video-step--next focus-ring"
            onClick={() => step(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="video-meta">
          <div className="video-identity">
            <img src={testimonial.poster} alt="" aria-hidden="true" />
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
              <small>
                {testimonial.detail} · {testimonial.pathway}
              </small>
            </div>
          </div>

          <blockquote>
            <Quote size={16} />
            <p className="video-quote">{testimonial.quote}</p>
            <p className="video-statement">{testimonial.statement}</p>
          </blockquote>

          <div className="video-pager">
            {TESTIMONIALS.map((item, itemIndex) => (
              <button
                key={item.id}
                className={`focus-ring ${itemIndex === index ? "is-active" : ""}`}
                onClick={() => setActiveTestimonial(item)}
                aria-label={`Testimonial ${itemIndex + 1}: ${item.name}`}
                aria-current={itemIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
