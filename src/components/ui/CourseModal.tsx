import { ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFlight } from "../../context/FlightContext";
import { ASK_FRAMEWORK, INCLUDED_FEATURES } from "../../lib/content";
import type { CoursePathway } from "../../types/aviation";

export function CourseModal({ course, onClose }: { course: CoursePathway; onClose: () => void }) {
  const { setEnquiryModalOpen } = useFlight();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="course-modal-v22" role="dialog" aria-modal="true" aria-label={`${course.regulator} pathway`} onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="course-modal-v22-card">
        <button ref={closeRef} className="course-modal-v22-close focus-ring" type="button" onClick={onClose} aria-label="Close course details"><X size={18} /></button>

        <div className="course-modal-v22-topline">
          <span>{course.regulator}</span>
          <span>{course.region}</span>
        </div>

        <div className="course-modal-v22-hero">
          <div>
            <div className="eyebrow"><span /> {course.tagline}</div>
            <h2>{course.regulator}<br /><strong>pathway.</strong></h2>
            <p>{course.description}</p>
          </div>
          <div className="course-modal-v22-code">{course.id.toUpperCase()}</div>
        </div>

        <div className="course-modal-v22-content">
          <div className="course-modal-v22-block">
            <div className="u-data">PATHWAY COVERAGE</div>
            <div className="course-modal-v22-list">
              {course.highlights.map((item, index) => (
                <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>
              ))}
            </div>
          </div>

          <div className="course-modal-v22-block">
            <div className="u-data">ASK @ AIRGEN</div>
            <div className="course-modal-v22-ask">
              <strong>One competency system running through training.</strong>
              <p>{ASK_FRAMEWORK.line}</p>
              <div>{ASK_FRAMEWORK.axes.map((axis) => <span key={axis.key}><b>{axis.key}</b>{axis.title}</span>)}</div>
            </div>
          </div>

          <div className="course-modal-v22-block">
            <div className="u-data">INCLUDED SUPPORT</div>
            <div className="course-modal-v22-support">
              {INCLUDED_FEATURES.map((item) => <span key={item}><Check size={13} /> {item}</span>)}
            </div>
          </div>
        </div>

        <div className="course-modal-v22-footer">
          <span>Ready to choose your pathway?</span>
          <button className="primary-button focus-ring" type="button" onClick={() => { onClose(); setEnquiryModalOpen(true); }}>
            Enquire about {course.regulator} <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
