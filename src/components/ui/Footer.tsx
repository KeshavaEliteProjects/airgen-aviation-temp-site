import { useFlight } from "../../context/FlightContext";
import { STAGES } from "../../lib/content";
import { scrollToElement } from "../../lib/smoothScroll";

const links = [
  ["about", "About"],
  ["testimonials", "Cadets"],
  ["founders", "Founders"],
  ["locations", "Locations"],
  ["courses", "Courses"],
  ["contact", "Contact"],
] as const;

export function Footer() {
  const { scrollToStage } = useFlight();

  const returnToHomeAnd = (id: string, stageIndex?: number) => {
    if (window.location.hash) {
      window.location.hash = "";
      window.setTimeout(() => {
        if (typeof stageIndex === "number") scrollToStage(stageIndex);
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
      return;
    }
    if (typeof stageIndex === "number") scrollToStage(stageIndex);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="footer-shell">
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/assets/logo-light.png" alt="AirGen Aviation" />
            <small>From aspiration to airline command</small>
          </div>

          <div className="footer-links">
            <div>
              <h3>Journey</h3>
              {STAGES.map((stage, index) => (
                <button key={stage.id} onClick={() => returnToHomeAnd("stages", index)}>
                  {stage.number} {stage.title}
                </button>
              ))}
            </div>
            <div>
              <h3>Company</h3>
              {links.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => {
                    const target = document.getElementById(id);
                    if (target) scrollToElement(target, -76);
                    else returnToHomeAnd(id);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AirGen Aviation</span>
          <span>
            Ground training and career preparation. Flight training is conducted at partner flying
            organisations.
          </span>
        </div>
      </footer>
    </div>
  );
}
