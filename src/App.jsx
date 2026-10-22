import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FlightLevelGauge from './components/FlightLevelGauge';
import Hero from './components/Hero';
import PromiseSection from './components/PromiseSection';
import WorldMapSection from './components/WorldMapSection';
import DeparturesBoard from './components/DeparturesBoard';
import MarqueeBand from './components/MarqueeBand';
import JourneySection from './components/JourneySection';
import RoadmapSection from './components/RoadmapSection';
import AskSection from './components/AskSection';
import BandImageSection from './components/BandImageSection';
import CareerTrack from './components/CareerTrack';
import ValuesSection from './components/ValuesSection';
import PlatformOverviewSection from './components/PlatformOverviewSection';
import DemoBookingSection from './components/DemoBookingSection';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import CallMentorButton from './components/CallMentorButton';
import MentorModal from './components/MentorModal';
import BoardingPassModal from './components/BoardingPassModal';
import TakeoffGateModal from './components/TakeoffGateModal';
import PageModal from './components/PageModal';

export default function App() {
  const [gatePage, setGatePage] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [isMentorOpen, setIsMentorOpen] = useState(false);

  const handleOpenPage = (pageKey) => {
    setGatePage(pageKey);
  };

  const handleTakeoffReveal = () => {
    setActivePage(gatePage);
    document.documentElement.style.overflow = 'hidden';
  };

  const handleTakeoffComplete = () => {
    setGatePage(null);
  };

  const handleGateCancel = () => {
    setGatePage(null);
  };

  const handleClosePage = () => {
    setActivePage(null);
    document.documentElement.style.overflow = '';
  };

  const handleNavigatePage = (newPageKey) => {
    setActivePage(null);
    setGatePage(newPageKey);
  };

  const handleBookDemo = () => {
    handleClosePage();
    setIsMentorOpen(false);
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="airgen-app">
      {/* Flight Level HUD & Ambient Sky Tint */}
      <FlightLevelGauge />

      {/* Main Navigation */}
      <Navbar onOpenPage={handleOpenPage} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <PromiseSection />
        <WorldMapSection />
        <DeparturesBoard onOpenPage={handleOpenPage} />
        <MarqueeBand />
        <JourneySection />
        <RoadmapSection />
        <AskSection onOpenPage={handleOpenPage} />
        <BandImageSection />
        <CareerTrack />
        <ValuesSection />
        <PlatformOverviewSection onOpenPage={handleOpenPage} />
        <DemoBookingSection />
      </main>

      {/* Runway Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <WhatsAppFab />
      <CallMentorButton onOpenMentor={() => setIsMentorOpen(true)} />

      {/* Modals & Dialogs */}
      <BoardingPassModal />

      <MentorModal
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        onBookDemo={handleBookDemo}
      />

      <TakeoffGateModal
        pageKey={gatePage}
        onRevealPage={handleTakeoffReveal}
        onComplete={handleTakeoffComplete}
        onCancel={handleGateCancel}
      />

      <PageModal
        pageKey={activePage}
        onClose={handleClosePage}
        onNavigatePage={handleNavigatePage}
        onBookDemo={handleBookDemo}
      />
    </div>
  );
}
