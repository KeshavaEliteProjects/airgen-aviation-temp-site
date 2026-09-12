import { Quote, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useFlight } from "../../context/FlightContext";

export function FoundersModal() {
  const { activeFounder, setActiveFounder } = useFlight();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setActiveFounder(null), [setActiveFounder]);

  useEffect(() => {
    if (!activeFounder) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeFounder, close]);

  if (!activeFounder) return null;
  const founder = activeFounder;

  return (
    <div
      className="modal-shell"
      role="dialog"
      aria-modal="true"
      aria-label={founder.name}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-card">
        <button ref={closeRef} className="modal-close focus-ring" onClick={close} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-eyebrow">
          {founder.role} / {founder.focus}
        </div>
        <h2 className="modal-title">{founder.name}</h2>
        <p className="modal-lead">{founder.bio}</p>

        <blockquote className="modal-quote">
          <Quote size={15} />
          <p>{founder.quote}</p>
        </blockquote>

        <div className="modal-list">
          <div className="u-data">What they own</div>
          <ul>
            {founder.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
