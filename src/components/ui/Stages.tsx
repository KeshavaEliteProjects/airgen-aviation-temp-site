import { ArrowUpRight } from "lucide-react";
import { useFlight } from "../../context/FlightContext";
import { STAGES, STAGE_PROMISE } from "../../lib/content";
import type { StageDefinition } from "../../types/aviation";

function StageCard({ stage, index }: { stage: StageDefinition; index: number }) {
  const { setEnquiryModalOpen, setSelectedStageForEnquiry } = useFlight();

  return (
    <>
      <div className="journey-card-top">
        <span className="journey-index">{stage.number}</span>
        <span>{stage.flightLevel}</span>
        <span>{stage.ask}</span>
      </div>

      <h3>{stage.question}</h3>
      <p className="journey-summary">{stage.summary}</p>

      <dl className="journey-facts">
        <div>
          <dt>Duration</dt>
          <dd>{stage.duration}</dd>
        </div>
        <div>
          <dt>You enter with</dt>
          <dd>{stage.entry}</dd>
        </div>
        <div>
          <dt>You leave with</dt>
          <dd>{stage.outcome}</dd>
        </div>
        <div>
          <dt>Gate</dt>
          <dd>{stage.gate}</dd>
        </div>
      </dl>

      <div className="journey-modules">
        <div className="journey-modules-head">
          <span>Inside this stage</span>
          <b>{stage.modules.length} modules</b>
        </div>
        {stage.modules.map((module, moduleIndex) => (
          <div className="journey-module" key={module.title}>
            <span>{String(moduleIndex + 1).padStart(2, "0")}</span>
            <div>
              <strong>{module.title}</strong>
              <p>{module.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="text-button focus-ring journey-ask"
        onClick={() => {
          setSelectedStageForEnquiry(`Stage ${stage.number} — ${stage.title}`);
          setEnquiryModalOpen(true);
        }}
      >
        Ask about {stage.title.toLowerCase()} <ArrowUpRight size={15} />
      </button>

      <div className="journey-promise">{STAGE_PROMISE[index]}</div>
    </>
  );
}

export function Stages() {
  const { scrollToStage } = useFlight();

  return (
    <section id="stages" className="journey-section">
      <div className="journey-shell">
        <header className="journey-header">
          <div>
            <div className="eyebrow"><span /> The journey</div>
            <h2>From aspiration<br /><strong>to airline command.</strong></h2>
          </div>
          <p>
            Three stages. One structured pathway. The content below is the original AirGen journey —
            now presented in a cleaner, calmer visual system.
          </p>
        </header>

        <div className="journey-curve" aria-hidden="true">
          <div className="journey-curve-glow" />
          <svg viewBox="0 0 1000 330" preserveAspectRatio="none">
            <path d="M40 245 C270 40 730 40 960 245" />
          </svg>

          <div className="journey-curve-card journey-curve-card--1">
            <span className="journey-curve-card-number">01</span>
            <strong>THINK</strong>
            <small>Build the foundation.</small>
          </div>

          <div className="journey-curve-card journey-curve-card--2">
            <span className="journey-curve-card-number">02</span>
            <strong>TRAIN</strong>
            <small>Turn knowledge into capability.</small>
          </div>

          <div className="journey-curve-card journey-curve-card--3">
            <span className="journey-curve-card-number">03</span>
            <strong>COMMAND</strong>
            <small>Develop airline-ready judgement.</small>
          </div>
        </div>

        <div className="journey-video-wrap">
          <video
            className="journey-video"
            src="/assets/evolve.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster="/assets/person1.png"
          />
          <div className="journey-video-overlay" />
          <div className="journey-video-copy">
            <span>THE AIRGEN PATH</span>
            <strong>Progress is a discipline.</strong>
          </div>
        </div>

        <div className="journey-stages">
        {STAGES.map((stage, index) => (
          <div key={stage.id} id={`stage-${stage.id}`} className="journey-stage-item">
            <article className={`journey-card journey-card--${index + 1}`}>
              <button className="journey-jump" onClick={() => scrollToStage(index)}>
                <span>{stage.number}</span>
                <b>{stage.title}</b>
                <i />
              </button>
              <StageCard stage={stage} index={index} />
            </article>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
