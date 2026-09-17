import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useFlight } from "../../context/FlightContext";
import { ASK_FRAMEWORK, STAGES } from "../../lib/content";
import { useReducedMotion } from "../../lib/hooks";

const JOURNEY_STAGES = [
  {
    id: "think",
    number: "01",
    title: "THINK",
    eyebrow: "Ground / Attitude",
    question: STAGES[0].question,
    summary: STAGES[0].summary,
    signal: STAGES[0].ask,
    image: STAGES[0].figure.src,
    imageAlt: STAGES[0].figure.persona,
    modules: STAGES[0].modules,
    promise: "We help you decide to become a pilot.",
  },
  {
    id: "train",
    number: "02",
    title: "TRAIN",
    eyebrow: "FL240 / Knowledge + Skills",
    question: STAGES[1].question,
    summary: STAGES[1].summary,
    signal: "Knowledge · Skills · Attitude",
    image: STAGES[1].figure.src,
    imageAlt: STAGES[1].figure.persona,
    modules: STAGES[1].modules,
    promise: "We train you to become a competent pilot.",
  },
  {
    id: "fly",
    number: "03",
    title: "FLY",
    eyebrow: "Flight / Application",
    question: "Turn theory into handling.",
    summary: STAGES[1].modules[2].description,
    signal: "Practical application",
    image: STAGES[1].figure.src,
    imageAlt: "Flight training",
    modules: [STAGES[1].modules[2], STAGES[1].modules[3], STAGES[1].modules[4]],
    promise: "We turn classroom capability into flight discipline.",
  },
  {
    id: "advance",
    number: "04",
    title: "ADVANCE",
    eyebrow: "Right Seat / Professional Competency",
    question: "Develop as a First Officer.",
    summary: STAGES[2].modules[3].description,
    signal: "Professional competency",
    image: STAGES[2].figure.src,
    imageAlt: STAGES[2].figure.persona,
    modules: [STAGES[2].modules[3], STAGES[2].modules[0], STAGES[2].modules[1]],
    promise: "We support the transition from cadet to airline professional.",
  },
  {
    id: "command",
    number: "05",
    title: "COMMAND",
    eyebrow: "FL390 / Leadership",
    question: STAGES[2].question,
    summary: STAGES[2].summary,
    signal: STAGES[2].ask,
    image: STAGES[2].figure.src,
    imageAlt: STAGES[2].figure.persona,
    modules: [STAGES[2].modules[4], STAGES[2].modules[5]],
    promise: "We build the competencies required to progress toward command.",
  },
] as const;

export function Stages() {
  const { setEnquiryModalOpen, setSelectedStageForEnquiry } = useFlight();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const travelled = Math.min(scrollable, Math.max(0, -rect.top));
      const progress = travelled / scrollable;
      const nextIndex = Math.min(JOURNEY_STAGES.length - 1, Math.floor(progress * JOURNEY_STAGES.length));
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = JOURNEY_STAGES[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      setVideoPlaying(false);
      return;
    }

    const sync = () => setVideoPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    void video.play().then(sync).catch(() => setVideoPlaying(false));

    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, [reducedMotion]);

  const jumpToStage = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const ratio = index / (JOURNEY_STAGES.length - 1);
    const top = section.offsetTop + ratio * scrollable;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    if (video.paused) {
      void video.play().then(() => setVideoPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const askAbout = () => {
    setSelectedStageForEnquiry(`Stage ${active.number} — ${active.title}`);
    setEnquiryModalOpen(true);
  };

  return (
    <section id="stages" className="journey-v19" ref={sectionRef}>
      <div className="journey-v19-sticky">
        <div className="journey-v19-shell">
          <header className="journey-v19-head">
            <div>
              <div className="eyebrow"><span /> Guided flight path</div>
              <h2>From aspiration<br /><strong>to airline command.</strong></h2>
            </div>
            <div className="journey-v19-head-copy">
              <span>SCROLL TO PROGRESS</span>
              <p>A guided sequence that reveals one stage at a time. No dashboards to operate — just follow the flight path.</p>
            </div>
          </header>

          <div className="journey-v19-layout">
            <aside className="journey-v19-rail" aria-label="AirGen journey stages">
              <div className="journey-v19-track" />
              <div
                className="journey-v19-track-fill"
                style={{ "--progress": `${(activeIndex / (JOURNEY_STAGES.length - 1)) * 100}%` } as CSSProperties}
              />
              {JOURNEY_STAGES.map((stage, index) => (
                <button
                  key={stage.id}
                  type="button"
                  className={`journey-v19-node ${activeIndex === index ? "is-active" : ""} ${activeIndex > index ? "is-passed" : ""}`}
                  onClick={() => jumpToStage(index)}
                  aria-current={activeIndex === index ? "step" : undefined}
                  aria-label={`Go to ${stage.title}`}
                >
                  <span className="journey-v19-node-dot"><i /></span>
                  <span className="journey-v19-node-copy">
                    <b>{stage.number}</b>
                    <strong>{stage.title}</strong>
                  </span>
                </button>
              ))}
            </aside>

            <div className="journey-v19-story" aria-live="polite">
              <div className="journey-v19-counter">{active.number} / 05</div>
              <div className="journey-v19-kicker">{active.eyebrow}</div>
              <h3 key={`title-${active.id}`}>{active.question}</h3>
              <p key={`summary-${active.id}`} className="journey-v19-summary">{active.summary}</p>

              <div key={`modules-${active.id}`} className="journey-v19-module-grid">
                {active.modules.map((module, index) => (
                  <article key={module.title} className="journey-v19-module" style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{module.title}</strong>
                      <p>{module.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="journey-v19-story-footer">
                <div>
                  <span>ASK SIGNAL</span>
                  <strong>{active.signal}</strong>
                </div>
                <button className="primary-button focus-ring" type="button" onClick={askAbout}>
                  Ask about this stage <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            <aside className="journey-v19-visual">
              <div className="journey-v19-visual-top">
                <span>FLIGHT PATH / AIRGEN</span>
                <span>{Math.round(((activeIndex + 1) / JOURNEY_STAGES.length) * 100)}%</span>
              </div>

              <div className="journey-v19-visual-frame journey-v19-visual-frame--video">
                <video
                  ref={videoRef}
                  className="journey-v19-stage-video"
                  src="/assets/evolve.mp4"
                  muted
                  autoPlay={!reducedMotion}
                  loop
                  playsInline
                  preload="metadata"
                  poster="/assets/image6.jpeg"
                />
                <div className="journey-v19-visual-wash" />
                <div className="journey-v19-visual-stage">
                  <span>{active.number}</span>
                  <strong>{active.title}</strong>
                  <small>{active.promise}</small>
                </div>
                <div className="journey-v19-visual-corners"><i /><i /><i /><i /></div>
                <button
                  className="journey-v19-play journey-v19-play--frame focus-ring"
                  type="button"
                  onClick={toggleVideo}
                  aria-label={videoPlaying ? "Pause journey video" : "Play journey video"}
                >
                  {videoPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
                </button>
                <div className="journey-v19-video-badge">EVOLVE / AIRGEN</div>
              </div>
            </aside>
          </div>

          <div className="journey-v19-progress">
            <span>01 THINK</span>
            <div><i style={{ width: `${((activeIndex + 1) / JOURNEY_STAGES.length) * 100}%` }} /></div>
            <span>05 COMMAND</span>
          </div>
        </div>
      </div>

      <div className="journey-v19-ask">
        <div>
          <div className="eyebrow"><span /> {ASK_FRAMEWORK.label}</div>
          <h3>One competency system.<br /><strong>Running through training.</strong></h3>
          <p>{ASK_FRAMEWORK.line}</p>
        </div>
        <div className="journey-v19-ask-grid">
          {ASK_FRAMEWORK.axes.map((axis) => (
            <article key={axis.key}>
              <span>{axis.key}</span>
              <div><strong>{axis.title}</strong><small>{axis.meaning}</small><p>{axis.detail}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
