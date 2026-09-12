import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
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
  const [lightTheme, setLightTheme] = useState(() => document.documentElement.dataset.theme === "redline");
  const scrolled = scrollProgress > 0.015;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  const toggleTheme = () => {
    const nextLight = !lightTheme;
    const theme = nextLight ? "redline" : "crimson";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = nextLight ? "light" : "dark";
    window.localStorage.setItem("airgen-theme", theme);
    setLightTheme(nextLight);
  };

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
          <img className="brand-logo" src={lightTheme ? "/assets/logo-dark.png" : "/assets/logo-light.png"} alt="AirGen Aviation" />
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
          <button
            className="theme-switch focus-ring"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${lightTheme ? "dark" : "light"} theme`}
            title={`Switch to ${lightTheme ? "dark" : "light"} theme`}
          >
            <span className="theme-switch-icon">{lightTheme ? <Moon size={15} /> : <Sun size={15} />}</span>
            <span className="theme-switch-copy">{lightTheme ? "LIGHT" : "DARK"}<i>↕</i></span>
          </button>
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
            className="mobile-theme-button"
            onClick={toggleTheme}
            type="button"
          >
            {lightTheme ? <Moon size={15} /> : <Sun size={15} />}
            <span>Switch to {lightTheme ? "dark" : "light"} mode</span>
          </button>
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
