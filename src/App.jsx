import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ScrollProgress from './components/ScrollProgress';
import SkyTint from './components/SkyTint';
import FlightLevelGauge from './components/FlightLevelGauge';
import Navbar from './components/Navbar';
import WhatsAppFab from './components/WhatsAppFab';
import MentorButton from './components/MentorButton';
import MentorModal from './components/MentorModal';
import BoardingPass from './components/BoardingPass';
import GateModal from './components/GateModal';
import PageOverlay from './components/PageOverlay';
import NewsMarquee from './components/NewsMarquee';
import AdminPanel from './components/AdminPanel';

import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import WorldSection from './components/WorldSection';
import JourneySection from './components/JourneySection';
import RoadmapSection from './components/RoadmapSection';
import AskSection from './components/AskSection';
import BandImageSection from './components/BandImageSection';
import CareerSection from './components/CareerSection';
import RunsSection from './components/RunsSection';
import LadderSection from './components/LadderSection';
import ValuesSection from './components/ValuesSection';
import InstrumentsSection from './components/InstrumentsSection';
import DemoSection from './components/DemoSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

export default function App() {
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [gateKey, setGateKey] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [enquiryTopic, setEnquiryTopic] = useState('DGCA ground class');
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // Reduced motion handling
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      document.documentElement.classList.add('rm');
      document.body.classList.add('rm');
    }

    ScrollTrigger.config({ ignoreMobileResize: true });

    // Smooth in-page anchor scrolling handling pin-spacers
    const handleAnchorClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.classList.contains('skip')) return;
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const el =
        target.parentNode &&
        target.parentNode.classList &&
        target.parentNode.classList.contains('pin-spacer')
          ? target.parentNode
          : target;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    };

    document.addEventListener('click', handleAnchorClick);

    // Deep link: yoursite.com/#news opens the news page
    if (window.location.hash === '#news') setActivePage('news');

    // Admin panel: yoursite.com/#admin
    const syncAdmin = () => setAdminOpen(window.location.hash === '#admin');
    syncAdmin();
    window.addEventListener('hashchange', syncAdmin);

    // Refresh ScrollTrigger after initial mount and asset loads
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', syncAdmin);
      clearTimeout(refreshTimer);
    };
  }, []);

  const handleOpenPage = key => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      setActivePage(key);
    } else {
      setGateKey(key);
    }
  };

  const handleTakeoffComplete = key => {
    setGateKey(null);
    setActivePage(key);
  };

  const handleCancelGate = () => {
    setGateKey(null);
  };

  const handleClosePage = () => {
    setActivePage(null);
    if (window.location.hash === '#news') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  const handleOpenNews = () => {
    window.history.replaceState(null, '', '#news');
    setActivePage('news');
  };

  const handleEnquire = topic => {
    setEnquiryTopic(topic);
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      const el =
        demoEl.parentNode &&
        demoEl.parentNode.classList &&
        demoEl.parentNode.classList.contains('pin-spacer')
          ? demoEl.parentNode
          : demoEl;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
      setTimeout(() => {
        const input = document.querySelector('#df input[name="n"]');
        if (input) input.focus({ preventScroll: true });
      }, 700);
    }
  };

  const handleBookDemoFromModal = () => {
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      const el =
        demoEl.parentNode &&
        demoEl.parentNode.classList &&
        demoEl.parentNode.classList.contains('pin-spacer')
          ? demoEl.parentNode
          : demoEl;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: 'instant'
      });
    }
  };

  return (
    <>
      <a className="skip" href="#why">
        Skip to content
      </a>

      {/* Top scroll progress */}
      <ScrollProgress />

      {/* Dynamic sky tint */}
      <SkyTint />

      {/* Latest news strip */}
      <NewsMarquee onOpen={handleOpenNews} />

      {/* Main navigation */}
      <Navbar onOpenPage={handleOpenPage} onEnquire={handleEnquire} />

      {/* Floating widgets */}
      <WhatsAppFab />
      <MentorButton onOpen={() => setMentorModalOpen(true)} />
      <FlightLevelGauge />

      {/* Modals & Overlays */}
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
        onBookDemo={handleBookDemoFromModal}
      />
      <BoardingPass />
      <GateModal
        gateKey={gateKey}
        onTakeoffComplete={handleTakeoffComplete}
        onCancel={handleCancelGate}
      />
      <PageOverlay
        pageKey={activePage}
        onClose={handleClosePage}
        onNavigate={handleOpenPage}
        onDemo={handleBookDemoFromModal}
      />

      <AdminPanel open={adminOpen} onClose={handleCloseAdmin} />

      {/* Main Page Content */}
      <main>
        <HeroSection onOpenPage={handleOpenPage} />
        <WhySection />
        <WorldSection />
        <JourneySection />
        <RoadmapSection
          onDemo={handleBookDemoFromModal}
          onMentor={() => setMentorModalOpen(true)}
        />
        <AskSection />
        <BandImageSection />
        <CareerSection />
        <RunsSection />
        <LadderSection />
        <ValuesSection />
        <InstrumentsSection onOpenPage={handleOpenPage} />
        <DemoSection selectedTopic={enquiryTopic} />
      </main>

      <Footer />
    </>
  );
}
