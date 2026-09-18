import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFlight } from "../../context/FlightContext";
import { FOUNDERS } from "../../lib/content";

const founderVideos = [
  "/assets/founder1.mp4",
  "/assets/founder2.mp4",
  "/assets/founder3.mp4",
];

export function Founders() {
  const { setActiveFounder } = useFlight();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideTimer = useRef<number | null>(null);
  const founder = useMemo(() => FOUNDERS[active], [active]);

  const revealControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = window.setTimeout(() => setControlsVisible(false), 3000);
    }
  };

  useEffect(() => {
    revealControls();
    return () => { if (hideTimer.current) window.clearTimeout(hideTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.muted = true;
    setMuted(true);
    setProgress(0);
    setDuration(0);
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [active]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + FOUNDERS.length) % FOUNDERS.length);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().then(() => setPlaying(true)).catch(() => undefined);
    else video.pause();
    revealControls();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    revealControls();
  };



  return (
    <section id="founders" className="founders-v23">
      <div className="founders-v23-shell">
        <header className="founders-v23-header">
          <div>
            <div className="eyebrow"><span /> The people behind AirGen</div>
            <h2>Different disciplines.<br /><strong>One aviation standard.</strong></h2>
          </div>
          <p>Meet the people shaping curriculum, operations and technology across the AirGen journey.</p>
        </header>

        <div className="founders-v23-grid">
          <div
            className={`founder-v23-video-card ${controlsVisible ? "is-controls-visible" : ""}`}
            onMouseEnter={revealControls}
            onMouseMove={revealControls}
            onTouchStart={revealControls}
          >
            <video
              ref={videoRef}
              className="founder-v23-cover-video"
              src={founderVideos[active]}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              poster={`/assets/profile${active + 1}.png`}
              onPlay={() => setPlaying(true)}
              onPause={() => { setPlaying(false); setControlsVisible(true); }}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
              onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)}
            />
            <div className="founder-v23-cover-shade" />

            <div className="founder-v23-topbar">
              <span><b>A</b>IRGEN <i>│</i> FOUNDERS</span>
              <span>{String(active + 1).padStart(2, "0")} / {String(FOUNDERS.length).padStart(2, "0")}</span>
            </div>

            <div className="founder-v23-arrows">
              <button className="founder-v23-arrow focus-ring" type="button" onClick={() => move(-1)} aria-label="Previous founder"><ArrowLeft size={18} /></button>
              <button className="founder-v23-arrow focus-ring" type="button" onClick={() => move(1)} aria-label="Next founder"><ArrowRight size={18} /></button>
            </div>

            <div className="founder-v23-profile-overlay">
              <div className="founder-v23-profile-photo">
                <img src={`/assets/profile${active + 1}.png`} alt={founder.name} />
              </div>
              <div className="founder-v23-profile-copy">
                <span>{founder.focus}</span>
                <h3>{founder.name}</h3>
                <strong>{founder.role}</strong>
                <p>{founder.bio}</p>
                <div className="founder-v23-actions">
                  <button className="primary-button focus-ring" type="button" onClick={() => setActiveFounder(founder)}>View profile <ArrowUpRight size={15} /></button>
                  <button className="secondary-button focus-ring" type="button" onClick={togglePlay}>{playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />} {playing ? "Pause video" : "Play video"}</button>
                </div>
              </div>
            </div>

            <div className="founder-v23-controls">
              <button type="button" className="founder-v23-control" onClick={togglePlay} aria-label={playing ? "Pause founder video" : "Play founder video"}>{playing ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button>
              <button type="button" className="founder-v23-control" onClick={toggleMute} aria-label={muted ? "Unmute founder video" : "Mute founder video"}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>
              <span>{duration ? `${Math.floor((progress * duration) / 60)}:${String(Math.floor(progress * duration) % 60).padStart(2, "0")}` : "00:00"}</span>
            </div>

            <div className="founder-v23-scrim-label">AIRGEN / PEOPLE · PURPOSE · HIGHER SKIES</div>
          </div>

          <aside className="founders-v23-side">
            <div className="founders-v23-side-head">
              <span>OUR FOUNDERS</span>
              <p>Built by people<br />who believe in a higher standard.</p>
              <i />
            </div>

            <div className="founder-v23-list">
              {FOUNDERS.map((item, index) => (
                <button
                  key={item.id}
                  className={`founder-v23-row focus-ring ${active === index ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setActive(index)}
                >
                  <span className="founder-v23-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="founder-v23-thumb"><img src={`/assets/profile${index + 1}.png`} alt="" /></span>
                  <span className="founder-v23-row-copy"><strong>{item.name}</strong><small>{item.role} / {item.focus}</small></span>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
