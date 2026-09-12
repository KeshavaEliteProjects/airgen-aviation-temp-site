import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Send, X } from "lucide-react";
import { useFlight } from "../../context/FlightContext";
import { STAGES } from "../../lib/content";

const STAGE_OPTIONS = [
  ...STAGES.map((stage) => `Stage ${stage.number} — ${stage.title}`),
  "Not sure yet",
];

const PATHWAYS = ["DGCA", "FAA", "EASA", "Not sure yet"];

export function EnquiryModal() {
  const {
    enquiryModalOpen,
    setEnquiryModalOpen,
    selectedStageForEnquiry,
    setSelectedStageForEnquiry,
  } = useFlight();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pathway, setPathway] = useState(PATHWAYS[0]);
  const [submitted, setSubmitted] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setEnquiryModalOpen(false);
    setSubmitted(false);
  }, [setEnquiryModalOpen]);

  useEffect(() => {
    if (!enquiryModalOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enquiryModalOpen, close]);

  if (!enquiryModalOpen) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim() && email.trim()) setSubmitted(true);
  };

  return (
    <div
      className="modal-shell"
      role="dialog"
      aria-modal="true"
      aria-label="AirGen enquiry"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-card">
        <button ref={closeRef} className="modal-close focus-ring" onClick={close} aria-label="Close">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <CheckCircle2 size={44} />
            <div className="u-data">Transmission received</div>
            <h2>We’ll take it from here.</h2>
            <p>
              Your enquiry has been captured for follow-up. Note that this form is not yet wired to a
              live inbox — see <code>TODO(client)</code> in the codebase.
            </p>
            <button className="secondary-button focus-ring" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="modal-eyebrow">AirGen / enquiry</div>
            <h2 className="modal-title">Start the conversation.</h2>
            <p className="modal-lead">Tell us where you are in your pilot journey.</p>

            <form onSubmit={submit} className="modal-form">
              <label>
                <span>Full name</span>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+91"
                  autoComplete="tel"
                />
              </label>
              <label>
                <span>Where you are</span>
                <select
                  value={selectedStageForEnquiry}
                  onChange={(event) => setSelectedStageForEnquiry(event.target.value)}
                >
                  {STAGE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Pathway</span>
                <select value={pathway} onChange={(event) => setPathway(event.target.value)}>
                  {PATHWAYS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <button type="submit" className="primary-button modal-submit focus-ring">
                Submit enquiry <Send size={15} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
