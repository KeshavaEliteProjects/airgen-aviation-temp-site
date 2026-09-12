import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFlight } from "../../context/FlightContext";
import { TESTIMONIALS } from "../../lib/content";

const items = [
  ["about", "About"],
  ["stages", "Journey"],
  ["testimonials", "Cadets"],
  ["founders", "Founders"],
  ["courses", "Courses"],
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { setEnquiryModalOpen, setActiveTestimonial, scrollProgress } = useFlight();
  const scrolled = scrollProgress > 0.015;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Anchors go through Lenis, otherwise nav jumps feel unrelated to the page.
  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <span className="nav-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="nav-inner">
        <button
          className="brand focus-ring"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="AirGen Aviation — back to top"
        >
          <img className="brand-logo" src="/assets/logo-light.png" alt="AirGen Aviation" />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {items.map(([id, label]) => (
            <button
              key={id}
              className="nav-link focus-ring"
              onClick={() => {
                if (id === "founders") {
                  // Founder navigation opens the existing full-screen video viewer.
                  // The viewer contains the complete testimonial carousel, so the
                  // user can move through every supplied clip without leaving the page.
                  setActiveTestimonial(TESTIMONIALS[0]);
                  setOpen(false);
                  return;
                }
                goTo(id);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="enquire-button focus-ring" onClick={() => setEnquiryModalOpen(true)}>
            Enquire <ArrowUpRight size={15} />
          </button>
        </div>

        <button
          className="mobile-menu-button focus-ring"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="mobile-panel">
          {items.map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                if (id === "founders") {
                  setActiveTestimonial(TESTIMONIALS[0]);
                  setOpen(false);
                  return;
                }
                goTo(id);
              }}
              className="mobile-panel-link"
            >
              <span>{label}</span>
              <ArrowUpRight size={15} />
            </button>
          ))}
          <button
            className="mobile-panel-cta"
            onClick={() => {
              setOpen(false);
              setEnquiryModalOpen(true);
            }}
          >
            Start your journey <ArrowUpRight size={15} />
          </button>
        </div>
      )}
    </header>
  );
}
