/**
 * AirGen Aviation — single source of copy.
 *
 * Everything the site says lives here. Brand positioning, the ASK framework
 * and the three-stage journey are taken from the AirGen brand documents.
 *
 * ⚠️ Placeholders are marked `TODO(client)`. Search that token before launch.
 */

import type {
  CoursePathway,
  Destination,
  FounderProfile,
  StageDefinition,
  Testimonial,
} from '../types/aviation';

export const SITE = {
  name: 'AirGen Aviation',
  tagline: 'From aspiration to airline command',
  promise:
    'We don’t train students just to earn a licence. We develop aviators for a career — from their first decision to their future command.',
};

/* ------------------------------------------------------------------ */
/*  THE JOURNEY — three stages, one figure per stage                   */
/*                                                                     */
/*  Stage 01 shows the person before aviation. Stage 02 shows the      */
/*  cadet in uniform. Stage 03 shows the captain. The transformation    */
/*  is the argument, so each stage owns exactly one figure.             */
/*                                                                     */
/*  TODO(client): confirm durations and hour figures.                   */
/* ------------------------------------------------------------------ */

export const STAGES: StageDefinition[] = [
  {
    id: 'think',
    number: '01',
    title: 'Think',
    motion: 'Thinking',
    flightLevel: 'GND',
    question: 'Should I become a pilot?',
    summary:
      'Before a single rupee is spent, we establish whether aviation is the right career for you — and if it is, exactly what your route looks like, costed and dated.',
    duration: '2–6 weeks',
    entry: 'No prior aviation experience required (10+2 with Physics & Maths)',
    outcome: 'A costed roadmap with real dates and a DGCA computer number',
    rankFrom: { title: 'Student', bars: 0 },
    rankTo: { title: 'Cadet', bars: 1 },
    gate: 'Class 1 Medical + DGCA Computer Number',
    ask: 'Attitude',
    figure: {
      src: '/assets/pilot-01.png',
      bars: 0,
      persona: 'The aspirant',
      caption: 'Curiosity becomes commitment.',
    },
    modules: [
      {
        title: 'Career discovery',
        description:
          'An honest conversation about aptitude, temperament, circadian resilience and what the job is actually like day to day.',
      },
      {
        title: 'Eligibility & regulatory check',
        description:
          'Age, education and the mandatory 10+2 Physics and Maths equivalence, verified before you commit any money.',
      },
      {
        title: 'Class 1 medical guidance',
        description:
          'Step-by-step navigation of DGCA empanelled examiners and IAM/CME centres — the single most common point at which a plan collapses.',
      },
      {
        title: 'Costed operational roadmap',
        description:
          'Licence pathway, timeline, aircraft hourly rates, overseas living costs and total budget written down, with no hidden surcharges.',
      },
    ],
  },
  {
    id: 'train',
    number: '02',
    title: 'Train',
    motion: 'Training',
    flightLevel: 'FL240',
    question: 'How do I become competent?',
    summary:
      'Ground school, flight hours and the jet transition. Every subject runs through the ASK framework so theory becomes cockpit capability rather than exam recall.',
    duration: '12–18 months',
    entry: 'Class 1 medical and DGCA computer number in hand',
    outcome: 'CPL with multi-engine instrument rating, 200+ logged hours, MCC and JOC complete',
    rankFrom: { title: 'Cadet', bars: 1 },
    rankTo: { title: 'First officer', bars: 3 },
    gate: 'Theory papers cleared + CPL issued + MCC/JOC pass',
    ask: 'Knowledge · Skills',
    figure: {
      src: '/assets/pilot-02.png',
      bars: 2,
      persona: 'The first officer',
      caption: 'Training becomes capability.',
    },
    modules: [
      {
        title: 'Precision ground school',
        description:
          'Live masterclasses across Air Navigation, Meteorology, Air Regulations and Technical General, with mental maths and scenario work throughout.',
      },
      {
        title: 'CBT & adaptive test series',
        description:
          'Computer-based modules and question banks calibrated to real DGCA, FAA and EASA paper patterns — not memorisation shortcuts.',
      },
      {
        title: 'In-flight training abroad',
        description:
          'Hour building with a partner flying organisation in the US, South Africa or Australia. The flying that turns theory into handling.',
      },
      {
        title: 'MCC & jet orientation',
        description:
          'The transition from single-pilot habits to a two-crew flight deck: task sharing, swept-wing aerodynamics, FMS navigation and energy management.',
      },
      {
        title: 'SOP & checklist discipline',
        description:
          'Callouts, cockpit flow patterns and non-normal profiles mirroring scheduled carrier standards, so type rating starts from a professional baseline.',
      },
      {
        title: 'Airline-style progress review',
        description:
          'Graded the way airlines grade: standard achieved, improvement recommended, or further development required.',
      },
    ],
  },
  {
    id: 'command',
    number: '03',
    title: 'Command',
    motion: 'Commanding',
    flightLevel: 'FL390',
    question: 'How do I become a captain?',
    summary:
      'The stage most academies skip entirely. Airline selection, the right-hand seat, and then the leadership and judgement a command upgrade is actually assessed on.',
    duration: 'Career-long',
    entry: 'CPL holder preparing for a cadet or first officer vacancy',
    outcome: 'A line job, and a route to the left seat',
    rankFrom: { title: 'First officer', bars: 3 },
    rankTo: { title: 'Captain', bars: 4 },
    gate: 'Airline command upgrade board & ATPL viva',
    ask: 'Professional competency',
    figure: {
      src: '/assets/pilot-03.png',
      bars: 4,
      persona: 'The captain',
      caption: 'Capability becomes responsibility.',
    },
    modules: [
      {
        title: 'Airline readiness assessment',
        description:
          'Technical knowledge, communication, mental maths and decision making scored against real airline selection criteria.',
      },
      {
        title: 'Selection & assessment centre prep',
        description:
          'Technical and HR interviews, aptitude, numerical, verbal and spatial reasoning, group exercises and competency-based questions.',
      },
      {
        title: 'Simulator assessment preparation',
        description:
          'Raw-data ILS hand flying, engine failure at V1, steep turns and single-engine go-arounds on flight training devices.',
      },
      {
        title: 'First officer development',
        description:
          'Operational discipline, line-oriented thinking, CRM and threat & error management through the right-hand seat.',
      },
      {
        title: 'Command development',
        description:
          'Leadership, crew management, risk and operational judgement — including diversion and fuel strategy under pressure.',
      },
      {
        title: 'Mentoring the next generation',
        description:
          'Safety leadership on the flight deck, constructive feedback to junior first officers, and upholding institutional standards.',
      },
    ],
  },
];

/** The one-line promise attached to each stage transition, in order. */
export const STAGE_PROMISE = [
  'We help you decide to become a pilot.',
  'We train you to become a competent pilot.',
  'We help you become an airline captain.',
];

export const ASK_FRAMEWORK = {
  label: 'ASK @ AirGen',
  line: 'ASK is not a subject. It is the competency system that turns exam students into airline-ready pilots — and it runs through all three stages.',
  axes: [
    {
      key: 'A',
      title: 'Attitude',
      meaning: 'Professional mindset',
      detail: 'Discipline, communication and decision making under load.',
    },
    {
      key: 'S',
      title: 'Skills',
      meaning: 'Pilot thinking ability',
      detail: 'Mental maths, problem solving and situational awareness.',
    },
    {
      key: 'K',
      title: 'Knowledge',
      meaning: 'ATPL subjects',
      detail: 'DGCA, FAA and EASA theory taught to airline standard.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  ABOUT — from the AirGen brand document                             */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  lead:
    'AirGen Aviation is a next-generation aviation education company built for people who intend to make a career in the cockpit — not simply to pass an exam.',
  body: 'Expert instruction, industry-aligned curricula and a technology-driven learning ecosystem: live virtual classrooms, recorded modules, CBT, assessments, performance analytics and personal mentorship, across DGCA, FAA and EASA pathways.',
  mission:
    'To transform aviation education by developing technically proficient, safety-focused and globally competent aviation professionals.',
  vision:
    'To become one of the world’s most trusted aviation education ecosystems, empowering the next generation of pilots through excellence and innovation.',
  values: [
    { title: 'Safety first', detail: 'Every lesson and procedure is built around operational safety.' },
    { title: 'Technical excellence', detail: 'Deep theoretical knowledge and practical competence, not exam tricks.' },
    { title: 'Pilot-centric learning', detail: 'Courses and mentoring designed around the student’s journey.' },
    { title: 'Innovation', detail: 'AI-enabled classrooms, hybrid learning and modern teaching methodology.' },
    { title: 'Integrity', detail: 'Honesty, discipline, accountability and ethical decision making.' },
    { title: 'Global standards', detail: 'Training aligned to DGCA, FAA and EASA at international standard.' },
  ],
  stats: [
    { value: '03', label: 'Regulatory pathways' },
    { value: 'ASK', label: 'Competency framework' },
    { value: '09', label: 'Training destinations' },
  ],
};

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/*                                                                     */
/*  TODO(client): every name, role and quote below is placeholder copy */
/*  written to show the layout, and every clip in                      */
/*  public/assets/testimonials/ is a generated placeholder with a      */
/*  burned-in label. Replace both before launch — see the README in    */
/*  that folder.                                                        */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '01',
    name: 'Aarav Menon', // TODO(client)
    role: 'First Officer · A320',
    detail: 'Trained in Phoenix, Arizona',
    pathway: 'DGCA + FAA',
    quote: 'The mental maths drills were the reason I passed my airline interview.',
    statement:
      'I came in with a Class 1 medical and no idea what came next. What changed things was being graded like an airline grades you — I knew exactly where I stood every month instead of guessing.',
    video: '/assets/testimonials/01.mp4',
    poster: '/assets/testimonials/01-poster.jpg',
    still: '/assets/testimonials/01-still.jpg',
    length: '0:09',
  },
  {
    id: '02',
    name: 'Ishita Rao', // TODO(client)
    role: 'Cadet Pilot',
    detail: 'Ground school, Hyderabad',
    pathway: 'DGCA',
    quote: 'Nobody sold me a dream. They costed the whole thing on day one.',
    statement:
      'The roadmap session was uncomfortable in the best way — total cost, real timelines, and an honest read on whether I was suited to it. That is why I trusted everything that came after.',
    video: '/assets/testimonials/02.mp4',
    poster: '/assets/testimonials/02-poster.jpg',
    still: '/assets/testimonials/02-still.jpg',
    length: '0:09',
  },
  {
    id: '03',
    name: 'Kabir Sethi', // TODO(client)
    role: 'Commercial Pilot',
    detail: 'Hour building, Johannesburg',
    pathway: 'DGCA + SACAA',
    quote: 'Ground school here made the flying abroad feel like revision.',
    statement:
      'By the time I got to South Africa the theory was already instinct. My instructors there kept asking where I had trained, because I was not thinking about the numbers any more — just flying the aircraft.',
    video: '/assets/testimonials/03.mp4',
    poster: '/assets/testimonials/03-poster.jpg',
    still: '/assets/testimonials/03-still.jpg',
    length: '0:09',
  },
  {
    id: '04',
    name: 'Meera Nair', // TODO(client)
    role: 'Senior First Officer',
    detail: 'EASA ATPL theory',
    pathway: 'EASA',
    quote: 'Area 100 KSA was the easiest part, because ASK had already covered it.',
    statement:
      'The competency framework maps almost one to one onto what EASA assesses. I had been practising those exact behaviours for a year without realising it was preparation for the assessment.',
    video: '/assets/testimonials/04.mp4',
    poster: '/assets/testimonials/04-poster.jpg',
    still: '/assets/testimonials/04-still.jpg',
    length: '0:09',
  },
  {
    id: '05',
    name: 'Rohan Iyer', // TODO(client)
    role: 'Captain · B737',
    detail: 'Command upgrade, 2024',
    pathway: 'DGCA',
    quote: 'The command prep was about judgement, not questions.',
    statement:
      'Most upgrade coaching is a question bank. The sessions here were diversion calls, fuel strategy and crew management with a training captain pushing back on every decision I made.',
    video: '/assets/testimonials/05.mp4',
    poster: '/assets/testimonials/05-poster.jpg',
    still: '/assets/testimonials/05-still.jpg',
    length: '0:09',
  },
  {
    id: '06',
    name: 'Tanya Bhatt', // TODO(client)
    role: 'Cadet Pilot',
    detail: 'Class 1 medical cleared',
    pathway: 'FAA',
    quote: 'They walked me through the medical, which is where I nearly gave up.',
    statement:
      'I was told by two other academies that my paperwork was my problem. Here somebody sat with me through the empanelled examiner process until it was cleared. That is the whole reason I am flying.',
    video: '/assets/testimonials/06.mp4',
    poster: '/assets/testimonials/06-poster.jpg',
    still: '/assets/testimonials/06-still.jpg',
    length: '0:09',
  },
];

/* ------------------------------------------------------------------ */
/*  FOUNDERS                                                           */
/*  TODO(client): confirm every credential claimed below.              */
/* ------------------------------------------------------------------ */

export const FOUNDERS: FounderProfile[] = [
  {
    id: 'prudhvi-teja-m',
    initials: 'PT',
    name: 'Prudhvi Teja M',
    role: 'Co-founder',
    focus: 'Training & curriculum',
    bio: 'Prudhvi leads how AirGen teaches: curriculum design, instructor standards, and the mapping between the DGCA, FAA and EASA syllabi and the ASK competencies airlines assess at selection.',
    quote: 'Most academies teach subjects. We train competencies.',
    achievements: [
      'Designed the AirGen ASK integrated pilot curriculum',
      'Owns instructor standards and lesson review',
      'Built the structured assessment and grading cadence',
    ],
  },
  {
    id: 'srujan-kumar-vemula',
    initials: 'SV',
    name: 'Srujan Kumar Vemula',
    role: 'Co-founder',
    focus: 'Operations & student success',
    bio: 'Srujan owns everything between a first enquiry and a cadet stepping into a cockpit overseas — eligibility, Class 1 medical guidance, computer number formalities, visas and placement with partner flying organisations.',
    quote: 'Paperwork should never be the reason someone doesn’t fly.',
    achievements: [
      'Placement pipelines with partner flying schools in nine countries',
      'DGCA computer number and medical process ownership',
      'Cadet mentorship and resilience support protocols',
    ],
  },
  {
    id: 'manas-teja-rachagarla',
    initials: 'MR',
    name: 'Manas Teja Rachagarla',
    role: 'Co-founder',
    focus: 'Technology & learning platform',
    bio: 'Manas builds the systems AirGen runs on: the learning platform, CBT modules, test engine and the analytics that surface a weak subject months before an exam rather than after it.',
    quote: 'If you can’t measure a cadet’s progress, you can’t improve it.',
    achievements: [
      'Architected the AirGen CBT and live scenario testing platform',
      'Question analytics calibrated to real DGCA papers',
      'Pilot aptitude evaluation tooling',
    ],
  },
];

export const DESTINATIONS: Destination[] = [
  { id: 'us', country: 'United States', city: 'Phoenix, Arizona', regulator: 'FAA', aircraft: 'Piper Archer / Cessna 172', coordinates: [188, 140] },
  { id: 'ca', country: 'Canada', city: 'Toronto, Ontario', regulator: 'TCCA', aircraft: 'Diamond DA20 / DA42', coordinates: [280, 112] },
  { id: 'za', country: 'South Africa', city: 'Johannesburg', regulator: 'SACAA', aircraft: 'Cessna 172 / Seneca III', coordinates: [578, 306] },
  { id: 'au', country: 'Australia', city: 'Melbourne, Victoria', regulator: 'CASA', aircraft: 'Diamond DA40 / Piper Seminole', coordinates: [902, 338] },
  { id: 'nz', country: 'New Zealand', city: 'Christchurch', regulator: 'CAANZ', aircraft: 'Cessna 172SP / Tecnam P2006T', coordinates: [980, 354] },
  { id: 'uk', country: 'United Kingdom', city: 'Oxford', regulator: 'UK CAA', aircraft: 'Piper PA-28 / DA42 Twin Star', coordinates: [496, 90] },
  { id: 'es', country: 'Spain', city: 'Madrid', regulator: 'EASA', aircraft: 'Diamond DA42NG', coordinates: [490, 121] },
  { id: 'ae', country: 'United Arab Emirates', city: 'Dubai', regulator: 'GCAA', aircraft: 'Diamond DA40 / DA42', coordinates: [654, 163] },
  { id: 'ph', country: 'Philippines', city: 'Manila', regulator: 'CAAP', aircraft: 'Cessna 152 / 172', coordinates: [836, 193] },
];

export const COURSES: CoursePathway[] = [
  {
    id: 'dgca',
    regulator: 'DGCA',
    region: 'India',
    tagline: 'Domestic airline pathway',
    description:
      'Full ATPL and CPL subject coverage designed for Indian airline recruitment, with the mental maths, radio telephony and scenario work selection actually rewards.',
    highlights: [
      'Air Navigation & Flight Planning',
      'Aviation Meteorology & radar interpretation',
      'Air Regulations & ICAO annexes',
      'Technical General & aircraft systems',
      'RTR(A) radio telephony exam preparation',
    ],
  },
  {
    id: 'faa',
    regulator: 'FAA',
    region: 'United States',
    tagline: 'Global fast-track pathway',
    description:
      'Scenario-led training built around the FAA Airman Certification Standards, for rapid hour building in high-density US airspace.',
    highlights: [
      'Private pilot ground & flight preparation',
      'Instrument rating under actual IMC',
      'Commercial multi-engine (CPL-ME)',
      'Oral exam & checkride scenario drills',
      'DGCA licence conversion protocol',
    ],
  },
  {
    id: 'easa',
    regulator: 'EASA',
    region: 'Europe',
    tagline: 'Gold standard theory pathway',
    description:
      'Rigorous 13-subject ATPL theory integrated with Area 100 KSA, which maps directly onto the ASK framework.',
    highlights: [
      '13 EASA ATPL theoretical subjects',
      'Area 100 KSA competency assessments',
      'Advanced high-altitude aerodynamics',
      'Performance-based navigation (PBN)',
      'Assessment centre preparation',
    ],
  },
];

export const INCLUDED_FEATURES = [
  'Live interactive virtual classrooms',
  '24/7 access to recorded modules & notes',
  'Adaptive CBT question bank engine',
  'Mock examinations matching real patterns',
  'Real-time weak-area performance analytics',
  '1-on-1 mentorship with active airline pilots',
  'DGCA Class 1 & 2 medical appointment guidance',
  'DGCA computer number processing support',
];

/** Editorial strip beneath the About section. */
export const VISUAL_STORY = [
  { src: '/assets/imagery/simulator-student.webp', tag: 'Simulator', title: 'Practise the non-normal.' },
  { src: '/assets/imagery/glass-cockpit.webp', tag: 'Flight deck', title: 'Operate to standard.' },
  { src: '/assets/imagery/hands-on-controls.webp', tag: 'Handling', title: 'Build the instinct.' },
  { src: '/assets/imagery/instrument-panel.webp', tag: 'Navigation', title: 'Read the route.' },
  { src: '/assets/imagery/takeoff-dusk.webp', tag: 'Departure', title: 'Commit to the climb.' },
];
