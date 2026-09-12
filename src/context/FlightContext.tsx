import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { STAGES } from "../lib/content";
import type { FounderProfile, Testimonial } from "../types/aviation";

interface FlightContextType {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  scrollToProgress: (target: number) => void;
  scrollToStage: (stageIndex: number) => void;
  enquiryModalOpen: boolean;
  setEnquiryModalOpen: (open: boolean) => void;
  selectedStageForEnquiry: string;
  setSelectedStageForEnquiry: (value: string) => void;
  activeFounder: FounderProfile | null;
  setActiveFounder: (founder: FounderProfile | null) => void;
  activeTestimonial: Testimonial | null;
  setActiveTestimonial: (testimonial: Testimonial | null) => void;
}

const FlightContext = createContext<FlightContextType>({
  scrollProgress: 0,
  setScrollProgress: () => undefined,
  scrollToProgress: () => undefined,
  scrollToStage: () => undefined,
  enquiryModalOpen: false,
  setEnquiryModalOpen: () => undefined,
  selectedStageForEnquiry: `Stage 01 — ${STAGES[0].title}`,
  setSelectedStageForEnquiry: () => undefined,
  activeFounder: null,
  setActiveFounder: () => undefined,
  activeTestimonial: null,
  setActiveTestimonial: () => undefined,
});

export function FlightProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedStageForEnquiry, setSelectedStageForEnquiry] = useState(
    `Stage 01 — ${STAGES[0].title}`,
  );
  const [activeFounder, setActiveFounder] = useState<FounderProfile | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);

  const scrollToProgress = useCallback((target: number) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: Math.min(1, Math.max(0, target)) * maxScroll, behavior: "smooth" });
  }, []);

  const scrollToStage = useCallback(
    (stageIndex: number) => {
      const index = Math.min(STAGES.length - 1, Math.max(0, stageIndex));
      const stage = document.getElementById(`stage-${STAGES[index].id}`);
      if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [],
  );

  const value = useMemo<FlightContextType>(
    () => ({
      scrollProgress,
      setScrollProgress,
      scrollToProgress,
      scrollToStage,
      enquiryModalOpen,
      setEnquiryModalOpen,
      selectedStageForEnquiry,
      setSelectedStageForEnquiry,
      activeFounder,
      setActiveFounder,
      activeTestimonial,
      setActiveTestimonial,
    }),
    [
      scrollProgress,
      scrollToProgress,
      scrollToStage,
      enquiryModalOpen,
      selectedStageForEnquiry,
      activeFounder,
      activeTestimonial,
    ],
  );

  return <FlightContext.Provider value={value}>{children}</FlightContext.Provider>;
}

export const useFlight = () => useContext(FlightContext);
