import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useFlight } from "../../context/FlightContext";

export function Hero() {
  const { scrollToStage, setEnquiryModalOpen } = useFlight();

  return (
    <section id="home" className="airgen-hero">
      <video
        className="airgen-hero-video"
        src="/assets/cloud.mp4"
        poster="/assets/imagery/landing-fog.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="airgen-hero-shade" />
      <div className="airgen-hero-vignette" />

      <div className="airgen-hero-inner">
        <div className="airgen-hero-copy">
          <div className="airgen-hero-topline">
            <span className="airgen-rule" />
            <span>DGCA · FAA · EASA</span>
          </div>

          <div className="airgen-kicker">AirGen Aviation / the flight path</div>

          <h1>
            From aspiration
            <span>to <em>command.</em></span>
          </h1>

          <p>
            A complete pilot pathway built around <strong>attitude, skills and knowledge</strong> — from
            the first decision to the left-hand seat.
          </p>

          <div className="airgen-hero-actions">
            <button className="primary-button focus-ring" onClick={() => scrollToStage(0)}>
              Begin the journey <ArrowDownRight size={16} />
            </button>
            <button className="secondary-button focus-ring" onClick={() => setEnquiryModalOpen(true)}>
              Talk to AirGen <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="airgen-hero-statement">
          <span>“</span>
          <p>Dream beyond the clouds.</p>
          <i />
        </div>
      </div>

      <div className="airgen-hero-scroll">
        <span /> Scroll to explore
      </div>
    </section>
  );
}
