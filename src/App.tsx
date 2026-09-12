import { useEffect } from "react";
import { FlightProvider, useFlight } from "./context/FlightContext";
import { Navigation } from "./components/ui/Navigation";
import { Hero } from "./components/ui/Hero";
import { Stages } from "./components/ui/Stages";
import { Testimonials } from "./components/ui/Testimonials";
import { ContentSections } from "./components/ui/ContentSections";
import { Footer } from "./components/ui/Footer";
import { EnquiryModal } from "./components/ui/EnquiryModal";
import { FoundersModal } from "./components/ui/FoundersModal";
import { TestimonialModal } from "./components/ui/TestimonialModal";

function Experience() {
  const { setScrollProgress } = useFlight();

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };

    const onViewportChange = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange, { passive: true });

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [setScrollProgress]);

  return (
    <div className="app-shell">
      <Navigation />
      <main>
        <Hero />
        <Stages />
        <div className="page-lower">
          <Testimonials />
          <ContentSections />
        </div>
      </main>
      <Footer />
      <EnquiryModal />
      <FoundersModal />
      <TestimonialModal />
    </div>
  );
}

export default function App() {
  return (
    <FlightProvider>
      <Experience />
    </FlightProvider>
  );
}
