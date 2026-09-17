import { Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFlight } from "../../context/FlightContext";
import { TESTIMONIALS } from "../../lib/content";
import { useInView, useMediaQuery, useReducedMotion } from "../../lib/hooks";
import type { Testimonial } from "../../types/aviation";

/**
 * Honeycomb of circular tiles, sized by distance from the pointer — the Apple
 * Watch home screen. The pointer is the focus point, so hovering anywhere
 * magnifies that part of the cluster rather than just the one tile under the
 * cursor. Video tiles open a popup player; the rest are texture.
 */

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Deliberately even-toned frames. High-contrast shots (approach lights,
// dusk takeoffs) read as hotspots at tile size and pull the eye off the
// testimonials, which are the point of the section.
const FILLER_IMAGERY = [
  "/assets/imagery/glass-cockpit.webp",
  "/assets/imagery/instrument-panel.webp",
  "/assets/imagery/hands-on-controls.webp",
  "/assets/imagery/engine-fan.webp",
  "/assets/imagery/cessna-cockpit.webp",
  "/assets/imagery/nacelle-chevrons.webp",
  "/assets/imagery/departure-lobby.webp",
  "/assets/imagery/landing-fog.webp",
];

interface Cell {
  /** Unit-space centre, one unit = one cell diameter. */
  x: number;
  y: number;
  testimonial?: Testimonial;
  imagery?: string;
  /** Fillers without imagery render as plain dots. */
  dot?: boolean;
}

/**
 * Offset rows of 3-4-5-4-3. The six video tiles take the ring one step out from
 * the centre, which is the only arrangement of six that stays symmetric; the
 * centre and the outer rows are fillers so the cluster reads as a honeycomb
 * rather than a row of circles.
 */
function buildCells(): Cell[] {
  const rows = [3, 4, 5, 4, 3];
  const videoSlots = new Set(["1:1", "1:2", "2:1", "2:3", "3:1", "3:2"]);
  const cells: Cell[] = [];
  let videoIndex = 0;
  let fillerIndex = 0;

  rows.forEach((count, row) => {
    for (let i = 0; i < count; i += 1) {
      const cell: Cell = {
        x: (i - (count - 1) / 2) * 1.03,
        y: (row - (rows.length - 1) / 2) * 0.9,
      };
      if (videoSlots.has(`${row}:${i}`) && videoIndex < TESTIMONIALS.length) {
        cell.testimonial = TESTIMONIALS[videoIndex];
        videoIndex += 1;
      } else if (fillerIndex % 3 === 2) {
        cell.dot = true;
        fillerIndex += 1;
      } else {
        cell.imagery = FILLER_IMAGERY[fillerIndex % FILLER_IMAGERY.length];
        fillerIndex += 1;
      }
      cells.push(cell);
    }
  });

  // Any testimonial that did not get a central slot still gets a tile.
  while (videoIndex < TESTIMONIALS.length) {
    cells.push({ x: (videoIndex % 3 - 1) * 1.03, y: 2.7, testimonial: TESTIMONIALS[videoIndex] });
    videoIndex += 1;
  }

  return cells;
}

export function Testimonials() {
  const { setActiveTestimonial } = useFlight();
  const reducedMotion = useReducedMotion();
  // On a phone the full 19-cell cluster would shrink every tile to a dot, so
  // the outer ring is dropped and the remaining tiles get the space instead.
  const dense = useMediaQuery("(max-width: 760px)");
  const cells = useMemo(
    () => (dense ? buildCells().filter((cell) => Math.hypot(cell.x, cell.y) < 1.2) : buildCells()),
    [dense],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const focus = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const cell = useRef(140);
  const pointerInside = useRef(false);
  /** Restarts the paint loop after it has parked. Set by the loop effect. */
  const kickRef = useRef<(() => void) | null>(null);

  const [hovered, setHovered] = useState<Testimonial | null>(null);
  const inView = useInView(sectionRef);

  /** Cell diameter, derived from the stage box so the cluster always fits. */
  const measure = useCallback(() => {
    const node = stageRef.current;
    if (!node) return;
    const { width, height } = node.getBoundingClientRect();
    // Full cluster: 5 columns wide, 5 offset rows tall (0.9 unit pitch).
    // Dense cluster: a single ring, so it can afford much larger cells.
    cell.current = dense
      ? Math.max(72, Math.min(width / 3.35, height / 3.4))
      : Math.max(58, Math.min(width / 5.3, height / 4.55));
  }, [dense]);

  const paint = useCallback(() => {
    const size = cell.current;
    const { x: fx, y: fy } = focus.current;
    const radius = pointerInside.current ? 2.15 : 2.75;

    cells.forEach((item, index) => {
      const node = tileRefs.current[index];
      if (!node) return;
      const dx = item.x - fx;
      const dy = item.y - fy;
      const distance = Math.hypot(dx, dy);
      const falloff = Math.pow(clamp(distance / radius, 0, 1), 1.25);
      const scale = item.testimonial
        ? 1.06 - falloff * 0.62
        : 0.74 - falloff * 0.46;
      // Nudge tiles away from the focus so the magnified ones do not collide.
      const push = distance > 0.001 ? ((1 - falloff) * 0.11) / distance : 0;
      const ox = dx * push * size;
      const oy = dy * push * size;

      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
      node.style.transform = `translate3d(calc(${item.x * size + ox}px - 50%), calc(${
        item.y * size + oy
      }px - 50%), 0) scale(${scale})`;
      node.style.opacity = String(item.testimonial ? clamp(1.05 - falloff * 0.5, 0, 1) : clamp(0.78 - falloff * 0.55, 0, 1));
      node.style.zIndex = String(Math.round(100 - falloff * 60));
    });
  }, [cells]);

  // Focus spring + paint loop. Idles out once the cluster has settled.
  useEffect(() => {
    measure();
    if (reducedMotion) {
      focus.current = { x: 0, y: 0 };
      const repaint = () => {
        measure();
        paint();
      };
      repaint();
      window.addEventListener("resize", repaint);
      return () => window.removeEventListener("resize", repaint);
    }

    let frame = 0;
    let settledFrames = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const dx = target.current.x - focus.current.x;
      const dy = target.current.y - focus.current.y;
      focus.current.x += dx * 0.14;
      focus.current.y += dy * 0.14;
      paint();
      settledFrames = Math.hypot(dx, dy) < 0.0015 ? settledFrames + 1 : 0;
      if (settledFrames > 12) {
        frame = 0;
        return; // parked — a pointer move restarts it
      }
      frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (frame === 0) frame = requestAnimationFrame(tick);
    };
    kickRef.current = kick;
    kick();

    const onResize = () => {
      measure();
      kick();
    };
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
      if (frame !== 0) cancelAnimationFrame(frame);
      kickRef.current = null;
    };
  }, [measure, paint, reducedMotion]);

  const setFocusFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const size = cell.current;
      const x = (clientX - rect.left - rect.width / 2) / size;
      const y = (clientY - rect.top - rect.height / 2) / size;
      target.current = { x: clamp(x, -2.6, 2.6), y: clamp(y, -2.4, 2.4) };
      kickRef.current?.();

      // Whichever video tile the focus is sitting on becomes the previewed one.
      let nearest: Testimonial | undefined;
      let best = 0.62;
      for (const item of cells) {
        if (!item.testimonial) continue;
        const distance = Math.hypot(item.x - x, item.y - y);
        if (distance < best) {
          best = distance;
          nearest = item.testimonial;
        }
      }
      setHovered(nearest ?? null);
    },
    [cells],
  );

  // Preview playback: exactly one tile plays at a time, muted.
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, node]) => {
      if (!node) return;
      if (hovered && id === hovered.id && !reducedMotion) {
        node.currentTime = 0;
        void node.play().catch(() => undefined);
      } else if (!node.paused) {
        node.pause();
      }
    });
  }, [hovered, reducedMotion]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    pointerInside.current = true;
    setFocusFromPointer(event.clientX, event.clientY);
  };

  const onPointerLeave = () => {
    pointerInside.current = false;
    target.current = { x: 0, y: 0 };
    setHovered(null);
    kickRef.current?.();
  };

  return (
    <section id="testimonials" className={`testimonials ${inView ? "is-in" : ""}`} ref={sectionRef}>
      <div className="testimonials-grid">
      <div className="testimonials-head">
        <div className="eyebrow">
          <span /> From the flight deck
        </div>
        <h2>
          Cadets who
          <br />
          <strong>made it through.</strong>
        </h2>
        <p>
          Move across the cluster to bring a story forward — the nearest tiles grow, the rest recede.
          Click one to play it in full.
        </p>

        <div className="honeycomb-caption" aria-live="polite">
          {hovered ? (
            <>
              <span>
                {hovered.role} · {hovered.pathway}
              </span>
              <strong>{hovered.name}</strong>
              <em>“{hovered.quote}”</em>
            </>
          ) : (
            <>
              <span>DGCA · FAA · EASA cadets</span>
              <strong>{TESTIMONIALS.length} video testimonials</strong>
              <em>Hover a tile to preview it, click to open the full clip.</em>
            </>
          )}
        </div>
      </div>

      <div
        className="honeycomb"
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="honeycomb-halo" aria-hidden="true" />

        {cells.map((item, index) => {
          const testimonial = item.testimonial;
          const isHovered = Boolean(testimonial && hovered?.id === testimonial.id);

          return (
            <div
              key={testimonial ? testimonial.id : `filler-${index}`}
              className={`hc-tile ${testimonial ? "hc-tile--video" : "hc-tile--filler"} ${
                item.dot ? "hc-tile--dot" : ""
              } ${isHovered ? "is-focused" : ""}`}
              ref={(node) => {
                tileRefs.current[index] = node;
              }}
            >
              {testimonial ? (
                <button
                  type="button"
                  className="hc-button focus-ring"
                  onClick={() => setActiveTestimonial(testimonial)}
                  onFocus={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setFocusFromPointer(rect.left + rect.width / 2, rect.top + rect.height / 2);
                  }}
                  aria-label={`Play testimonial from ${testimonial.name}, ${testimonial.role}`}
                >
                  <img src={testimonial.poster} alt="" aria-hidden="true" loading="lazy" />
                  <video
                    ref={(node) => {
                      videoRefs.current[testimonial.id] = node;
                    }}
                    src={testimonial.video}
                    poster={testimonial.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <span className="hc-ring" aria-hidden="true" />
                  <span className="hc-play" aria-hidden="true">
                    <Play size={13} fill="currentColor" />
                  </span>
                  <span className="hc-label" aria-hidden="true">
                    <b>{testimonial.name.split(" ")[0]}</b>
                    <i>{testimonial.length}</i>
                  </span>
                </button>
              ) : item.dot ? (
                <span className="hc-dot" aria-hidden="true" />
              ) : (
                <img src={item.imagery} alt="" aria-hidden="true" loading="lazy" />
              )}
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
