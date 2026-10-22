export const ASK_DATA = {
  DGCA: {
    title: 'DGCA (India)',
    headers: ['Subject', 'Knowledge', 'Skills', 'Attitude'],
    rows: [
      ['Air Navigation', 'Charts, flight planning', 'Mental maths, time/fuel/distance', 'Decision making'],
      ['Meteorology', 'Weather theory', 'Weather interpretation', 'Threat awareness'],
      ['Air Law', 'Rules', 'Scenario judgement', 'Professional behaviour'],
      ['Technical General', 'Aircraft systems', 'Problem solving', 'SOP discipline'],
      ['RTR', 'Radio', 'Communication', 'CRM'],
      ['Performance', 'Calculations', 'Quick estimation', 'Safety mindset']
    ],
    focus: 'Mental arithmetic, scenario-based questions, Threat and Error Management, workload management and communication.'
  },
  FAA: {
    title: 'FAA (USA)',
    headers: ['FAA area', 'ASK skill developed'],
    rows: [
      ['Flight planning', 'Decision making'],
      ['Weather briefing', 'Situational awareness'],
      ['Oral exams', 'Communication'],
      ['Checkride', 'Application of knowledge'],
      ['Cross-country planning', 'Workload management'],
      ['Performance planning', 'Mental maths']
    ],
    focus: 'Real-world decision making, scenario training, practical application and pilot judgement.'
  },
  EASA: {
    title: 'EASA (Europe)',
    headers: ['EASA subject', 'ASK competency'],
    rows: [
      ['Flight planning', 'Problem solving'],
      ['General navigation', 'Mental maths'],
      ['Human performance', 'Situational awareness'],
      ['Operational procedures', 'TEM'],
      ['Communications', 'CRM'],
      ['Meteorology', 'Decision making']
    ],
    focus: 'KSA preparation (Area 100), scenario-based assessments, airline competency training, TEM and CRM.'
  }
};

export const COMMON_FAQS = [
  {
    q: 'Is ASK a separate subject?',
    a: 'No. ASK is a competency framework integrated into every subject and every licence, not a separate ATPL subject.'
  },
  {
    q: 'Is Area 100 KSA a standalone EASA exam?',
    a: 'No. Area 100 KSA is not examined as a standalone authority exam. It is assessed progressively during training.'
  },
  {
    q: 'Why is mental maths included?',
    a: 'Airline pilots routinely estimate fuel, time, distance and performance, cross-check automation and spot errors quickly.'
  },
  {
    q: 'How will I know how I am doing?',
    a: 'Through instructor observation, scenario exercises and progress reviews, graded as Standard achieved, Improvement recommended or Further development required.'
  }
];
