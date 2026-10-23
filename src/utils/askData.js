export const ASK = {
  DGCA: {
    h: ['Subject', 'Knowledge', 'Skills', 'Attitude'],
    r: [
      ['Air Navigation', 'Charts, flight planning', 'Mental maths, time/fuel/distance', 'Decision making'],
      ['Meteorology', 'Weather theory', 'Weather interpretation', 'Threat awareness'],
      ['Air Law', 'Rules', 'Scenario judgement', 'Professional behaviour'],
      ['Technical General', 'Aircraft systems', 'Problem solving', 'SOP discipline'],
      ['RTR', 'Radio', 'Communication', 'CRM'],
      ['Performance', 'Calculations', 'Quick estimation', 'Safety mindset']
    ],
    f: 'Mental arithmetic, scenario-based questions, Threat and Error Management, workload management and communication.'
  }
};

const R = arr => arr[Math.floor(Math.random() * arr.length)];

export function generateMathQuestion() {
  const t = R([10, 15, 20, 25, 30, 40, 45]);
  let q, expectedAns;
  if (Math.random() < 0.5) {
    const r = R([2, 3, 4, 5, 6, 7]);
    expectedAns = t;
    q = `Groundspeed ${r * 60} kt. How many minutes to fly ${r * t} NM?`;
  } else {
    const f = R([1200, 1800, 2400, 3000, 3600]);
    const m = R([10, 20, 30, 40, 45, 50]);
    expectedAns = (f * m) / 60;
    q = `Fuel flow ${f} kg/h. How many kg of fuel in ${m} minutes?`;
  }
  return { q, expectedAns };
}

const AL = 'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu'.split(' ');
const DG = 'Zero Wun Too Tree Fower Fife Six Seven Eight Niner'.split(' ');

export function spellPhonetic(str) {
  const result = [...str.toLowerCase()]
    .map(c => {
      const k = c.charCodeAt(0);
      return k >= 97 && k <= 122 ? AL[k - 97] : k >= 48 && k <= 57 ? DG[k - 48] : null;
    })
    .filter(Boolean);
  return result.length > 0 ? result.join(' · ') : 'Type letters or numbers';
}
