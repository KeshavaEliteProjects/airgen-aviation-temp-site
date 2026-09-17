import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useFlight } from "../../context/FlightContext";
import { FOUNDERS } from "../../lib/content";

export function Founders() {
  const { setActiveFounder } = useFlight();
  const [active, setActive] = useState(0);
  const founder = useMemo(() => FOUNDERS[active], [active]);

  return (
    <section id="founders" className="founders-v18">
      <div className="founders-v18-shell">
        <header className="founders-v18-header">
          <div>
            <div className="eyebrow"><span /> The people behind AirGen</div>
            <h2>Different disciplines.<br /><strong>One aviation standard.</strong></h2>
          </div>
          <p>
            Training, operations and technology come together behind the AirGen learning experience.
          </p>
        </header>

        <div className="founders-v18-main">
          <div className="founder-feature-v18">
            <div className="founder-feature-v18-top">
              <span>{String(active + 1).padStart(2, "0")} / {String(FOUNDERS.length).padStart(2, "0")}</span>
              <span>{founder.role}</span>
            </div>
            <div className="founder-photo-v18">
              <img
                src={`/assets/profile${active + 1}.png`}
                alt={`${founder.name} profile`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement?.classList.add("is-missing");
                }}
              />
              <span aria-hidden="true">{founder.initials}</span>
            </div>
            <div className="founder-feature-v18-copy">
              <span>{founder.focus}</span>
              <h3>{founder.name}</h3>
              <p>{founder.bio}</p>
              <button className="secondary-button focus-ring" onClick={() => setActiveFounder(founder)}>
                Open founder profile <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="founders-v18-list">
            {FOUNDERS.map((item, index) => (
              <button
                key={item.id}
                className={`founder-row-v18 focus-ring ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="founder-row-copy-v18">
                  <span className="founder-row-thumb-v18">
                    <img
                      src={`/assets/profile${index + 1}.png`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.role} / {item.focus}</small>
                  </span>
                </div>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
