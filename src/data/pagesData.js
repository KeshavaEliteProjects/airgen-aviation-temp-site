export const PAGES_DATA = {
  dgca: {
    key: 'dgca',
    title: 'DGCA + ASK',
    subtitle: 'India · DGCA',
    lead: 'DGCA ground training with Attitude, Skills and Knowledge built into every subject. These are exactly the competencies airlines test later.',
    heroImage: '/assets/photo-navigation-band.jpg',
    askPathway: 'DGCA',
    focusItems: [
      'Mental arithmetic',
      'Scenario-based questions',
      'Threat and Error Management',
      'Workload management',
      'Communication'
    ],
    featureImage: {
      src: '/assets/photo-flight-computer.jpg',
      alt: 'Hands using a flight computer beside a flight plan and headset',
      caption: 'Skills in practice: time, fuel and distance on the flight computer.'
    },
    ctaTitle: 'Ready to start DGCA?',
    ctaButton: 'Book a 15-min demo call',
    next: [
      { key: 'faa', label: 'FAA' },
      { key: 'easa', label: 'EASA' },
      { key: 'ask', label: 'The ASK model' }
    ]
  },
  faa: {
    key: 'faa',
    title: 'FAA + ASK',
    subtitle: 'USA · FAA',
    lead: 'FAA training is more practical and scenario-based, so ASK fits naturally.',
    heroImage: '/assets/photo-flight-computer.jpg',
    askPathway: 'FAA',
    focusItems: [
      'Real-world decision making',
      'Scenario training',
      'Practical application',
      'Pilot judgement'
    ],
    featureImage: {
      src: '/assets/photo-classroom.jpg',
      alt: 'Instructor teaching flight theory to student pilots in a classroom',
      caption: 'Live and recorded classes for DGCA, FAA and EASA aspirants · illustrative image'
    },
    ctaTitle: 'Ready to start FAA?',
    ctaButton: 'Book a 15-min demo call',
    next: [
      { key: 'dgca', label: 'DGCA' },
      { key: 'easa', label: 'EASA' },
      { key: 'ask', label: 'The ASK model' }
    ]
  },
  easa: {
    key: 'easa',
    title: 'EASA + ASK',
    subtitle: 'Europe · EASA',
    lead: 'EASA already uses the KSA (Knowledge, Skills, Attitude) concept, very similar to ASK.',
    heroImage: '/assets/photo-student-study.jpg',
    askPathway: 'EASA',
    focusItems: [
      'Area 100 KSA preparation',
      'Scenario-based assessments',
      'Airline competency training',
      'TEM and CRM'
    ],
    ksaCards: [
      {
        title: 'What it is',
        text: 'KSA stands for Knowledge, Skills and Attitudes. Area 100 is a competency framework embedded in EASA ATPL theory, not a technical subject like Air Law or Meteorology.'
      },
      {
        title: 'What it looks at',
        text: 'How you think, decide, communicate and manage workload, not what you can recall from a question bank.'
      },
      {
        title: 'How it is assessed',
        text: 'Progressively through the course, with instructor observation and structured assessments, on a developmental scale.'
      }
    ],
    note: 'Requirements are set by the authority and your approved training organisation. Confirm them before you enrol.',
    featureImage: {
      src: '/assets/photo-navigation-band.jpg',
      alt: 'Flight computer and charts',
      caption: 'Navigation: charts, headings and drift on the flight computer.'
    },
    showFaqs: true,
    ctaTitle: 'Ready to start EASA?',
    ctaButton: 'Book a 15-min demo call',
    next: [
      { key: 'dgca', label: 'DGCA' },
      { key: 'faa', label: 'FAA' },
      { key: 'ask', label: 'The ASK model' }
    ]
  },
  ask: {
    key: 'ask',
    title: 'The Airgen ASK model',
    subtitle: 'Competency framework',
    lead: 'ASK is not a subject. It is a competency system that turns exam students into airline-ready pilots. ASK bridges the gap between DGCA theory and airline reality.',
    heroImage: '/assets/photo-classroom.jpg',
    showVennBreakdown: true,
    assessmentSteps: [
      'Instructor observation',
      'Scenario exercises',
      'Mental arithmetic tests',
      'Progress reviews',
      'Structured assessments'
    ],
    grades: [
      {
        title: 'Standard achieved',
        desc: 'You are meeting the expected competency standard.'
      },
      {
        title: 'Improvement recommended',
        desc: 'You are progressing, with areas to strengthen.'
      },
      {
        title: 'Further development required',
        desc: 'You need more support before moving on.'
      }
    ],
    showFaqs: true,
    ctaTitle: 'See ASK in action',
    ctaButton: 'Book a 15-min demo call',
    next: [
      { key: 'dgca', label: 'DGCA' },
      { key: 'faa', label: 'FAA' },
      { key: 'easa', label: 'EASA' }
    ]
  },
  platform: {
    key: 'platform',
    title: 'Digital CBT & Virtual Campus',
    subtitle: 'Platform',
    lead: 'A technology-driven learning ecosystem that integrates live virtual classrooms, recorded learning modules, digital study resources, assessments, performance analytics and personalised mentorship.',
    heroImage: '/assets/photo-student-study.jpg',
    features: [
      { title: 'Live virtual classrooms', icon: 'M3 6h12v12H3z|M15 10l6-3v10l-6-3' },
      { title: 'Recorded modules', icon: 'M5 4l14 8-14 8z' },
      { title: 'CBT and test series', icon: 'M5 4h14v16H5z|M9 9h6|M9 13h6|M9 17h3' },
      { title: 'Study materials', icon: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z|M12 6v14' },
      { title: 'Performance analytics', icon: 'M4 20V10|M10 20V4|M16 20v-8|M22 20H2' },
      { title: 'Personalised mentorship', icon: 'M8 8a3 3 0 100-6 3 3 0 000 6z|M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2' }
    ],
    dashboardMetrics: [
      { name: 'Mental maths', value: '78%' },
      { name: 'Navigation', value: '64%' },
      { name: 'Meteorology', value: '86%' },
      { name: 'Air Law', value: '58%' }
    ],
    overviewParagraph: 'A specialised Learning Management System (LMS), Customer Relationship Management (CRM), mobile learning and business automation, combined in a single ecosystem designed specifically for aviation training organisations.',
    chips: ['LMS', 'CRM', 'Mobile learning', 'Business automation'],
    ctaTitle: 'Want a walkthrough?',
    ctaButton: 'Request a demo',
    next: [
      { key: 'dgca', label: 'DGCA' },
      { key: 'faa', label: 'FAA' },
      { key: 'easa', label: 'EASA' }
    ]
  }
};
