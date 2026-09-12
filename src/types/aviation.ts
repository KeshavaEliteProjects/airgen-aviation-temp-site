export interface TelemetryData {
  altitudeFeet: number;
  flightLevel: string;
  airspeedKnots: number;
  verticalSpeedFpm: number;
  headingDeg: number;
  pitchDeg: number;
  rollDeg: number;
  flightStatus: 'PARKED' | 'TAXI' | 'TAKEOFF' | 'CLIMB' | 'CRUISE' | 'COMMAND';
  stageIndex: number; // 0 to STAGES.length - 1
  scrollProgress: number; // 0 to 1
}

export interface StageRank {
  title: string;
  bars: number;
}

export interface StageModule {
  title: string;
  description: string;
}

export interface StageDefinition {
  id: string;
  number: string;
  title: string;
  /** Present participle used by the rail and the figure caption, e.g. "Thinking". */
  motion: string;
  flightLevel: string;
  question: string;
  summary: string;
  duration: string;
  entry: string;
  outcome: string;
  rankFrom: StageRank;
  rankTo: StageRank;
  gate: string;
  /** Which pilot figure this stage renders. One figure per stage. */
  figure: {
    src: string;
    persona: string;
    caption: string;
    /** Epaulette bars worn by this figure — 0 student, 2 first officer, 4 captain. */
    bars: number;
  };
  /** The ASK axis this stage leans on hardest. */
  ask: string;
  modules: StageModule[];
}

export interface FounderProfile {
  id: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  quote: string;
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  /** Where they trained, or what they fly now. */
  detail: string;
  pathway: string;
  quote: string;
  /** Longer statement shown in the popup beneath the player. */
  statement: string;
  video: string;
  poster: string;
  still: string;
  /** Clip runtime, shown on the tile. */
  length: string;
}

export interface Destination {
  id: string;
  country: string;
  city: string;
  regulator: string;
  aircraft: string;
  coordinates: [number, number]; // [x, y] on map coordinate system
}

export interface CoursePathway {
  id: string;
  regulator: string;
  region: string;
  tagline: string;
  description: string;
  highlights: string[];
}
