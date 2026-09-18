import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useFlight } from "../../context/FlightContext";
import { ASK_FRAMEWORK, STAGES, STAGE_PROMISE } from "../../lib/content";
import { useReducedMotion } from "../../lib/hooks";

export function Stages() {
  const { setEnquiryModalOpen, setSelectedStageForEnquiry } = useFlight();
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const updateActiveStage = () => {
      frame = 0;
      const viewportLine = window.innerHeight * 0.46;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      stageRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const isCrossing = rect.top <= viewportLine && rect.bottom >= viewportLine;
        if (isCrossing) {
          closestIndex = index;
          closestDistance = 0;
          return;
        }
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) => current === closestIndex ? current : closestIndex);
    };

    const requestUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(updateActiveStage);
    };

    updateActiveStage();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setVideoPlaying(true);
    const onPause = () => setVideoPlaying(false);
    const onMetadata = () => setVideoDuration(video.duration || 0);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadedmetadata", onMetadata);
    if (!reducedMotion) {
      void video.play().catch(() => undefined);
    }
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion && videoRef.current) videoRef.current.pause();
  }, [reducedMotion]);

  const active = STAGES[activeIndex];
  const stageLabel = (index: number) => index === 2 ? "AIRLINE CAREER" : STAGES[index].title.toUpperCase();

  const jumpToStage = (index: number) => {
    const node = stageRefs.current[index];
    node?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const askAbout = () => {
    setSelectedStageForEnquiry(`Stage ${active.number} — ${active.title}`);
    setEnquiryModalOpen(true);
  };

  return (
    <section id="stages" className="journey-v23">
      <div className="journey-v23-shell">
        <header className="journey-v23-header">
          <div>
            <div className="eyebrow"><span /> The pilot journey</div>
            <h2>From aspiration<br /><strong>to airline command.</strong></h2>
          </div>
          <div className="journey-v23-head-copy">
            <span>THREE STAGES</span>
            <p>Scroll naturally through the route. Each stage has room to breathe — no stacked dashboards, no hidden content.</p>
          </div>
        </header>

        <div className="journey-v23-grid">
          <div className="journey-v23-story-column">
            <nav className="journey-v23-rail" aria-label="AirGen three-stage journey">
              <div className="journey-v23-rail-line" />
              <div className="journey-v23-rail-fill" style={{ "--rail-progress": `${(activeIndex / Math.max(1, STAGES.length - 1)) * 100}%` } as CSSProperties} />
              {STAGES.map((stage, index) => (
                <button
                  key={stage.id}
                  type="button"
                  className={`journey-v23-node ${activeIndex === index ? "is-active" : ""} ${activeIndex > index ? "is-passed" : ""}`}
                  onClick={() => jumpToStage(index)}
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span className="journey-v23-node-dot"><i /></span>
                  <span><b>{stage.number}</b><strong>{stageLabel(index)}</strong><small>{stage.motion}</small></span>
                </button>
              ))}
            </nav>

            <div className="journey-v23-chapters">
              {STAGES.map((stage, index) => (
                <article
                  key={stage.id}
                  ref={(node) => { stageRefs.current[index] = node; }}
                  className={`journey-v23-chapter ${activeIndex === index ? "is-active" : ""}`}
                >
                  <div className="journey-v23-chapter-top">
                    <span>{stage.number} / {String(STAGES.length).padStart(2, "0")}</span>
                    <span>{stage.flightLevel} / {stage.ask}</span>
                  </div>

                  <p className="journey-v23-stage-kicker">{stage.motion.toUpperCase()} · AIRGEN</p>
                  <h3>{stage.question}</h3>
                  <p className="journey-v23-summary">{stage.summary}</p>

                  <div className="journey-v23-facts">
                    <div><span>ENTRY</span><strong>{stage.entry}</strong></div>
                    <div><span>DURATION</span><strong>{stage.duration}</strong></div>
                    <div><span>GATE</span><strong>{stage.gate}</strong></div>
                    <div><span>OUTCOME</span><strong>{stage.outcome}</strong></div>
                  </div>

                  <div className="journey-v23-modules-head">
                    <span>WHAT HAPPENS HERE</span>
                    <em>{stage.modules.length} modules</em>
                  </div>

                  <div className="journey-v23-modules">
                    {stage.modules.map((module, moduleIndex) => (
                      <article key={module.title} className="journey-v23-module" style={{ "--delay": `${moduleIndex * 55}ms` } as CSSProperties}>
                        <span>{String(moduleIndex + 1).padStart(2, "0")}</span>
                        <div><strong>{module.title}</strong><p>{module.description}</p></div>
                      </article>
                    ))}
                  </div>

                  <div className="journey-v23-footer">
                    <div><span>STAGE PROMISE</span><strong>{STAGE_PROMISE[index]}</strong></div>
                    <button className="primary-button focus-ring" type="button" onClick={askAbout}>
                      Ask about this stage <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="journey-v23-media-column">
            <div className="journey-v23-media-sticky">
              <div className="journey-v23-media-meta"><span>JOURNEY FILM / AIRGEN</span><b>{active.number} · {stageLabel(activeIndex)}</b></div>
              <div className="journey-v23-media-frame">
                <video
                  ref={videoRef}
                  src="/assets/evolve.mp4"
                  muted
                  autoPlay={!reducedMotion}
                  loop
                  playsInline
                  preload="metadata"
                  poster="/assets/image6.jpeg"
                  className="journey-v23-video"
                />
                <div className="journey-v23-media-shade" />
                <div className="journey-v23-media-caption">
                  <span>{active.number}</span>
                  <strong>{stageLabel(activeIndex)}</strong>
                  <small>{STAGE_PROMISE[activeIndex]}</small>
                </div>
                <div className="journey-v23-media-controls">
                  <button type="button" className="journey-v23-control" onClick={toggleVideo} aria-label={videoPlaying ? "Pause journey film" : "Play journey film"}>{videoPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button>
                  <button type="button" className="journey-v23-control" onClick={toggleMute} aria-label={muted ? "Unmute journey film" : "Mute journey film"}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>
                  <span className="journey-v23-time">{videoDuration ? `${Math.floor(videoDuration / 60)}:${String(Math.floor(videoDuration % 60)).padStart(2, "0")}` : "FILM"}</span>
                </div>
              </div>
              <div className="journey-v23-media-note">The film stays in one stable frame while the story on the left moves through the journey.</div>
            </div>
          </aside>
        </div>

        <section className="ask-v18 journey-v23-ask" id="ask">
          <div className="ask-v18-copy">
            <div className="eyebrow"><span /> {ASK_FRAMEWORK.label}</div>
            <h3>One competency system.<br /><strong>Running through training.</strong></h3>
            <p>{ASK_FRAMEWORK.line}</p>
          </div>
          <div className="ask-v18-grid">
            {ASK_FRAMEWORK.axes.map((axis) => (
              <article key={axis.key} className="ask-v18-card">
                <div className="ask-v18-key">{axis.key}</div>
                <div><strong>{axis.title}</strong><span>{axis.meaning}</span><p>{axis.detail}</p></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
