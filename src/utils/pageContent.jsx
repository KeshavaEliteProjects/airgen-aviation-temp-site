import React, { useState } from 'react';
import { ASK } from './askData';
import { AIRGEN_CONFIG } from './config';
import { TEAM } from './teamData';
import { SvgIcon, SI } from './icons';
import NewsPage from '../components/NewsPage';

const JP = (
  <>
    <path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z" />
    <path d="M10 17L2 4L16 4L26 17Z" />
    <path d="M52 24L84 24L66 36L56 36Z" />
  </>
);

const IMAGES = {
  fc: '/assets/photo-flight-computer.jpg',
  nav: '/assets/photo-navigation-band.jpg',
  cls: '/assets/photo-classroom.jpg',
  stu: '/assets/photo-student-study.jpg'
};

export const PAGE_NAMES = {
  dgca: 'DGCA ground class',
  ask: 'ASK framework',
  team: 'Our team',
  news: 'Latest news',
  platform: 'Platform',
  attitude: 'Attitude',
  skills: 'Skills',
  knowledge: 'Knowledge',
  atpl: 'ATPL ground class',
  typerating: 'Type rating',
  licence: 'Licence',
  nios: 'NIOS',
  visa: 'VISA',
  complementary: 'Complementary services',
  conversion: 'Conversion',
  medicals: 'Medicals'
};

function PageHero({ img, pill, title, intro }) {
  return (
    <div className="phero">
      <div className="pbg">
        <img src={img} alt="" />
      </div>
      <div className="pov" />
      <svg className="pjet" viewBox="0 0 120 40" aria-hidden="true">
        {JP}
      </svg>
      <div className="pht">
        <div className="ppill">{pill}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </div>
  );
}

function PageCta({ title, buttonText, onDemo }) {
  return (
    <div className="pcta rv">
      <div>
        <h2>{title}</h2>
        <p>Talk to a pilot mentor about your pathway, medical and budget.</p>
      </div>
      <button className="btn pri" onClick={onDemo}>
        {buttonText || 'Book a 15-min demo call'}
      </button>
    </div>
  );
}

function NextExplore({ items, onNavigate }) {
  return (
    <div className="pnext rv">
      <span>Explore next:</span>
      {items.map(([key, label]) => (
        <button
          key={key}
          className="lnk"
          onClick={() => onNavigate(key)}
        >
          {label} &rarr;
        </button>
      ))}
    </div>
  );
}

function AskCards({ k = 'DGCA' }) {
  const d = ASK[k];
  return (
    <div className="sg">
      {d.r.map((row, idx) => (
        <div key={idx} className="sc rv">
          <span className="idx">{String(idx + 1).padStart(2, '0')}</span>
          <div className="sct">{row[0]}</div>
          {row.length === 4 ? (
            <>
              <div className="chp k">
                <b>Knowledge</b>
                {row[1]}
              </div>
              <div className="chp s">
                <b>Skills</b>
                {row[2]}
              </div>
              <div className="chp a">
                <b>Attitude</b>
                {row[3]}
              </div>
            </>
          ) : (
            <div className="chp s">
              <b>{d.h[1]}</b>
              {row[1]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LearnSection() {
  const LI = [
    ['Live virtual classes', SI[0]],
    ['Recorded modules', 'M5 4l14 8-14 8z'],
    ['CBT learning and test series', SI[1]],
    ['Study materials', SI[2]],
    ['Personal mentorship', SI[3]]
  ];

  return (
    <>
      <h2 className="rv">How you learn</h2>
      <div className="lt">
        {LI.map(([title, iconPath], idx) => (
          <div key={idx} className="lg rv">
            <SvgIcon d={iconPath} />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </>
  );
}


// ---------- Enquiry form shown inside pages (opens WhatsApp with details prefilled) ----------
function EnquiryForm({ topic }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setMsg('Please add your name and phone number.');
      return;
    }
    const text = `Enquiry: ${topic}. Name: ${name.trim()}, phone: ${phone.trim()}${note.trim() ? ', note: ' + note.trim() : ''}`;
    if (AIRGEN_CONFIG.whatsapp) {
      window.open(`https://wa.me/${AIRGEN_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setMsg('WhatsApp opened with your details. Press send there to reach us.');
    } else if (AIRGEN_CONFIG.email) {
      window.location.href = `mailto:${AIRGEN_CONFIG.email}?subject=${encodeURIComponent('Enquiry: ' + topic)}&body=${encodeURIComponent(text)}`;
    } else {
      setMsg('Thank you. We will be in touch.');
    }
  };

  return (
    <form className="qform rv" onSubmit={submit} noValidate>
      <h2>Enquire about {topic}</h2>
      <p>Leave your details and a pilot mentor will get back to you.</p>
      <div className="qrow">
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
        </label>
        <label>
          Phone
          <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        Your questions (optional)
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} />
      </label>
      <button className="btn pri" type="submit">
        Send enquiry
      </button>
      <div className="qmsg" aria-live="polite">
        {msg}
      </div>
    </form>
  );
}

// ---------- ASK pillar pages ----------
const ASK_PILLARS = {
  attitude: {
    col: 3,
    pill: 'The ASK framework',
    title: 'Attitude',
    intro:
      'Developing professional judgment, open communication, situational awareness, and proactive threat and error management (TEM).',
    lead: 'Attitude is how you behave when the checklist runs out. Airlines test it in interviews and simulators, so we build it inside every subject from day one.'
  },
  skills: {
    col: 2,
    pill: 'The ASK framework',
    title: 'Skills',
    intro:
      'Building numerical reasoning, rapid mental arithmetic (estimating fuel, time, and performance without calculators), and real-time decision-making.',
    lead: 'Skills are what you can do under time pressure. They are practised in every subject, not saved for the end.'
  },
  knowledge: {
    col: 1,
    pill: 'The ASK framework',
    title: 'Knowledge',
    intro:
      'Deep conceptual understanding of DGCA theory, moving beyond rote memorization to practical operational application.',
    lead: 'Knowledge is the DGCA theory itself, understood well enough to apply in real operations rather than only to pass an exam.'
  }
};

function renderAskPillar(key, { onNavigate, onDemo }) {
  const c = ASK_PILLARS[key];
  const others = ['attitude', 'skills', 'knowledge'].filter(k => k !== key);
  return (
    <>
      <PageHero img={IMAGES.cls} pill={c.pill} title={c.title} intro={c.intro} />
      <div className="pgc">
        <p className="rv leadp">{c.lead}</p>
        <h2 className="rv">How {c.title} shows up in each subject</h2>
        <div className="sg">
          {ASK.DGCA.r.map((row, idx) => (
            <div key={idx} className="sc rv">
              <span className="idx">{String(idx + 1).padStart(2, '0')}</span>
              <div className="sct">{row[0]}</div>
              <div className="chp s">
                <b>{c.title}</b>
                {row[c.col]}
              </div>
            </div>
          ))}
        </div>
        <PageCta title="See the framework in action" buttonText="Enquire now" onDemo={onDemo} />
        <NextExplore
          items={[
            ['ask', 'The full ASK framework'],
            [others[0], ASK_PILLARS[others[0]].title],
            [others[1], ASK_PILLARS[others[1]].title]
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </>
  );
}

// ---------- Course and service pages ----------
// General guidance only. Exact fees, dates and availability are confirmed by a mentor.
const INFO_PAGES = {
  typerating: {
    img: 'nav',
    pill: 'Courses',
    title: 'Type rating',
    intro:
      'A type rating qualifies you to fly one specific aircraft type. Most airlines expect pilots to arrive ready for it, with the right mindset and fundamentals.',
    h1: 'What a type rating involves',
    cards: [
      ['Aircraft systems', 'Detailed study of the systems of the aircraft type you will fly.'],
      ['Simulator training', 'Procedures, normal and abnormal situations practised in a full-flight simulator.'],
      ['Assessment', 'Structured checks that confirm you can operate the aircraft to the required standard.'],
      ['Airline readiness', 'Cockpit discipline, SOP use and CRM, the habits airlines look for.']
    ],
    h2: 'Before you start',
    chips: ['Commercial licence', 'Valid medical', 'Strong systems fundamentals', 'SOP and checklist discipline', 'CRM and TEM awareness'],
    note: 'Where the type rating is done and what it costs depends on the aircraft and the training provider. A mentor can walk you through the options.',
    cta: 'Talk about your type rating',
    next: [['licence', 'Licence'], ['atpl', 'ATPL ground class'], ['ask', 'The ASK framework']]
  },
  licence: {
    img: 'cls',
    pill: 'Courses',
    title: 'Licence',
    intro: 'The route from your first lesson to a commercial pilot licence, step by step.',
    h1: 'Your licence pathway',
    steps: [
      ['Eligibility and medical', 'Confirm education and age requirements and complete the DGCA medical.'],
      ['DGCA ground subjects', 'Air Navigation, Meteorology, Air Regulations, Technical General and RTR(A).'],
      ['Flying training', 'Build the flying experience and skills the licence requires.'],
      ['Commercial licence', 'Complete the requirements and tests for the licence.'],
      ['Type rating and airline', 'Train on an aircraft type and prepare for airline selection.']
    ],
    note: 'Airgen supports you through the ground-training and airline-readiness parts of this pathway. Requirements change, so confirm the latest DGCA rules with a mentor.',
    cta: 'Plan your licence pathway',
    next: [['dgca', 'DGCA ground class'], ['typerating', 'Type rating'], ['medicals', 'Medicals']]
  },
  atpl: {
    img: 'stu',
    pill: 'Courses',
    title: 'ATPL ground class',
    intro: 'Advanced ground training for pilots working toward airline transport level knowledge, with ASK built into every subject.',
    h1: 'What the class focuses on',
    chips: ['Advanced theory', 'Scenario-based questions', 'Mental arithmetic', 'Test series', 'Progress reviews', 'Personal mentorship'],
    note: 'Class schedule, syllabus details and fees are confirmed by a mentor when you enquire.',
    form: true,
    cta: 'Ready to start ATPL ground class?',
    next: [['dgca', 'DGCA ground class'], ['ask', 'The ASK framework'], ['platform', 'Platform']]
  },
  nios: {
    img: 'stu',
    pill: 'Services',
    title: 'NIOS',
    intro:
      'The National Institute of Open Schooling offers a flexible route to complete the Class 12 subjects that pilot training commonly requires, such as Physics and Mathematics.',
    h1: 'How we can help',
    chips: ['Understanding if NIOS suits you', 'Subject selection guidance', 'Planning around your training', 'Mentor support'],
    note: 'Check the latest DGCA and NIOS requirements before enrolling. A mentor can help you confirm.',
    cta: 'Ask about NIOS',
    next: [['licence', 'Licence'], ['dgca', 'DGCA ground class'], ['medicals', 'Medicals']]
  },
  visa: {
    img: 'nav',
    pill: 'Services',
    title: 'VISA',
    intro: 'Guidance for students who plan to train or work overseas and need to understand the documentation involved.',
    h1: 'How we can help',
    chips: ['Understanding the process', 'Document checklist guidance', 'Planning your timeline', 'Mentor support'],
    note: 'Visa decisions are made by the relevant authorities. We offer guidance and do not guarantee outcomes.',
    cta: 'Ask about VISA',
    next: [['conversion', 'Conversion'], ['licence', 'Licence'], ['complementary', 'Complementary services']]
  },
  complementary: {
    img: 'cls',
    pill: 'Services',
    title: 'Complementary services',
    intro: 'Support around your training that helps you stay on track, from preparation to professional development.',
    h1: 'What this includes',
    chips: ['Personal mentorship', 'Interview preparation', 'Airline competency preparation', 'Progress reviews', 'Study materials'],
    note: 'Ask a mentor which services apply to your pathway.',
    cta: 'Ask about these services',
    next: [['platform', 'Platform'], ['ask', 'The ASK framework'], ['team', 'Our team']]
  },
  conversion: {
    img: 'fc',
    pill: 'Services',
    title: 'Conversion',
    intro: 'For pilots who hold a licence from another country and want to understand how to convert it for use in India.',
    h1: 'How we can help',
    chips: ['Understanding the conversion process', 'Preparing for DGCA exams', 'Document guidance', 'Mentor support'],
    note: 'Conversion rules depend on your licence and country. Confirm requirements with DGCA and ask a mentor to guide you.',
    cta: 'Ask about conversion',
    next: [['dgca', 'DGCA ground class'], ['visa', 'VISA'], ['licence', 'Licence']]
  },
  medicals: {
    img: 'fc',
    pill: 'Services',
    title: 'Medicals',
    intro: 'Medical fitness is a requirement for a pilot licence. Understand it early so training money is never spent before you know where you stand.',
    h1: 'How we can help',
    chips: ['What to expect', 'Medical classes explained', 'Preparing for the assessment', 'Finding an approved examiner'],
    note: 'Medical assessments are done by DGCA-approved examiners. We give guidance and do not provide medical advice.',
    cta: 'Ask about medicals',
    next: [['licence', 'Licence'], ['nios', 'NIOS'], ['dgca', 'DGCA ground class']]
  }
};

function renderInfoPage(key, { onNavigate, onDemo }) {
  const c = INFO_PAGES[key];
  return (
    <>
      <PageHero img={IMAGES[c.img]} pill={c.pill} title={c.title} intro={c.intro} />
      <div className="pgc">
        <h2 className="rv">{c.h1}</h2>
        {c.cards && (
          <div className="sg">
            {c.cards.map((card, idx) => (
              <div key={idx} className="sc rv">
                <span className="idx">{String(idx + 1).padStart(2, '0')}</span>
                <div className="sct">{card[0]}</div>
                <p className="cardp">{card[1]}</p>
              </div>
            ))}
          </div>
        )}
        {c.steps && (
          <ol className="pstp">
            {c.steps.map((st, idx) => (
              <li key={idx} className="rv">
                <b>{st[0]}</b>
                <span>{st[1]}</span>
              </li>
            ))}
          </ol>
        )}
        {c.h2 && <h2 className="rv">{c.h2}</h2>}
        {c.chips && (
          <div className="fch rv">
            {c.chips.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        )}
        {c.note && (
          <p className="rv pnote">{c.note}</p>
        )}
        {c.form && <EnquiryForm topic={c.title} />}
        <PageCta title={c.cta} buttonText="Enquire now" onDemo={onDemo} />
        <NextExplore items={c.next} onNavigate={onNavigate} />
      </div>
    </>
  );
}


// ---------- Aircraft-window team gallery (faces reveal top to bottom as you scroll) ----------
function TeamWindows() {
  return (
    <>
      <h2 className="rv">Meet the faculty</h2>
      <div className="wgrid">
        {TEAM.map((m, idx) => (
          <figure key={idx} className="wincard rv" style={{ '--i': idx % 4 }}>
            <div className="wout">
              <div className="wfr">
                {m.img ? (
                  <img src={m.img} alt={m.name} loading="lazy" />
                ) : (
                  <svg className="wph" viewBox="0 0 100 140" aria-hidden="true">
                    <circle cx="50" cy="52" r="20" />
                    <path d="M8 140c0-34 18-52 42-52s42 18 42 52z" />
                  </svg>
                )}
              </div>
            </div>
            <figcaption>
              <b>{m.name}</b>
              <span>{m.role}</span>
              {m.tag && <small>{m.tag}</small>}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export function renderPageContent(pageKey, { onNavigate, onDemo }) {
  switch (pageKey) {
    case 'dgca':
      return (
        <>
          <PageHero
            img={IMAGES.nav}
            pill="Courses"
            title="DGCA ground class"
            intro="DGCA ground training with Attitude, Skills and Knowledge built into every subject. These are exactly the competencies airlines test later."
          />
          <div className="pgc">
            <h2 className="rv">What you study with ASK</h2>
            <AskCards k="DGCA" />
            <h2 className="rv">Where we focus</h2>
            <div className="fch rv">
              {['Mental arithmetic', 'Scenario-based questions', 'Threat and Error Management', 'Workload management', 'Communication'].map(
                (item, idx) => (
                  <span key={idx}>{item}</span>
                )
              )}
            </div>
            <figure className="pimg rv">
              <img
                src={IMAGES.fc}
                alt="Hands using a flight computer beside a flight plan and headset"
                loading="lazy"
              />
              <figcaption>Skills in practice: time, fuel and distance on the flight computer.</figcaption>
            </figure>
            <LearnSection />
            <PageCta
              title="Ready to start DGCA ground class?"
              buttonText="Enquire now"
              onDemo={onDemo}
            />
            <NextExplore
              items={[
                ['ask', 'The ASK framework'],
                ['team', 'Our team'],
                ['platform', 'Platform']
              ]}
              onNavigate={onNavigate}
            />
          </div>
        </>
      );

    case 'ask':
      return (
        <>
          <PageHero
            img={IMAGES.cls}
            pill="About us"
            title="The ASK Framework"
            intro="Operationally Ready, Not Just Exam-Qualified"
          />
          <div className="pgc">
            <p className="rv leadp">
              Modern airlines demand first officers who can make sound decisions under pressure, manage workload, and cross-check automation effectively. We build these competencies from day one:
            </p>
            <div className="askg rv">
              <svg
                className="venn vn2"
                viewBox="0 0 520 430"
                aria-label="Attitude, Skills and Knowledge diagram"
              >
                <circle cx="260" cy="140" r="130" fill="#F2A33A" opacity=".5" />
                <circle cx="170" cy="275" r="130" fill="#3E8BD0" opacity=".5" />
                <circle cx="350" cy="275" r="130" fill="#8FA4BA" opacity=".55" />
                <text x="260" y="95">Attitude</text>
                <text x="110" y="320">Skills</text>
                <text x="410" y="320">Knowledge</text>
                <text className="s" x="260" y="226">Airline-ready</text>
                <text className="s" x="260" y="246">pilot</text>
              </svg>
              <div className="cmp">
                <div>
                  <b>Attitude</b>
                  <span>Developing professional judgment, open communication, situational awareness, and proactive threat and error management (TEM).</span>
                </div>
                <div>
                  <b>Skills</b>
                  <span>Building numerical reasoning, rapid mental arithmetic (estimating fuel, time, and performance without calculators), and real-time decision-making.</span>
                </div>
                <div>
                  <b>Knowledge</b>
                  <span>Deep conceptual understanding of DGCA theory, moving beyond rote memorization to practical operational application.</span>
                </div>
              </div>
            </div>
            <PageCta
              title="See the framework in action"
              buttonText="Enquire now"
              onDemo={onDemo}
            />
            <NextExplore
              items={[
                ['dgca', 'DGCA ground class'],
                ['team', 'Our team'],
                ['platform', 'Platform']
              ]}
              onNavigate={onNavigate}
            />
          </div>
        </>
      );

    case 'team':
      return (
        <>
          <PageHero
            img={IMAGES.cls}
            pill="About us"
            title="Our team"
            intro="Our faculty consists of over 30 seasoned airline captains, ground evaluators, and subject matter experts chosen for their practical industry experience."
          />
          <div className="pgc">
            <div className="big rv">
              <b>30+</b>
              <span>industry-expert instructors</span>
            </div>
            <div className="kcards">
              <div className="kc rv">
                <b>Scenario-based teaching</b>
                <p>
                  Complex theoretical topics in Air Navigation, Air Meteorology, Air Regulations, and Aircraft Technical General are brought to life through real-world operational scenarios.
                </p>
              </div>
              <div className="kc rv">
                <b>Progressive competency evaluations</b>
                <p>
                  Continuous formative assessments and structured progress reviews ensure early developmental feedback rather than late failure.
                </p>
              </div>
            </div>
            <TeamWindows />
            <figure className="pimg rv">
              <img
                src={IMAGES.fc}
                alt="Hands using a flight computer beside a flight plan and headset"
                loading="lazy"
              />
              <figcaption>Practical, scenario-led teaching.</figcaption>
            </figure>
            <PageCta
              title="Meet the team in person"
              buttonText="Enquire now"
              onDemo={onDemo}
            />
            <NextExplore
              items={[
                ['ask', 'The ASK framework'],
                ['dgca', 'DGCA ground class'],
                ['news', 'Latest news']
              ]}
              onNavigate={onNavigate}
            />
          </div>
        </>
      );

    case 'news':
      return (
        <>
          <PageHero
            img={IMAGES.fc}
            pill="About us"
            title="Latest news"
            intro="Announcements, events and guides from Airgen Aviation: DGCA requirements, RTR (A) preparation and pilot recruitment trends."
          />
          <div className="pgc">
            <NewsPage />
            <PageCta
              title="Have a question in the meantime?"
              buttonText="Enquire now"
              onDemo={onDemo}
            />
            <NextExplore
              items={[
                ['team', 'Our team'],
                ['ask', 'The ASK framework'],
                ['dgca', 'DGCA ground class']
              ]}
              onNavigate={onNavigate}
            />
          </div>
        </>
      );

    case 'platform':
      return (
        <>
          <PageHero
            img={IMAGES.stu}
            pill="Platform"
            title="Digital CBT & Virtual Campus"
            intro="A technology-driven learning ecosystem that integrates live virtual classrooms, recorded learning modules, digital study resources, assessments, performance analytics and personalised mentorship."
          />
          <div className="pgc">
            <h2 className="rv">Everything in one campus</h2>
            <div className="lt">
              {[
                ['Live virtual classrooms', SI[0]],
                ['Recorded modules', 'M5 4l14 8-14 8z'],
                ['CBT and test series', SI[1]],
                ['Study materials', SI[2]],
                ['Performance analytics', 'M4 20V10|M10 20V4|M16 20v-8|M22 20H2'],
                ['Personalised mentorship', SI[3]]
              ].map(([name, iconD], idx) => (
                <div key={idx} className="lg rv">
                  <SvgIcon d={iconD} />
                  <span>{name}</span>
                </div>
              ))}
            </div>

            <h2 className="rv">See progress at a glance</h2>
            <div className="dash rv">
              <small>Sample view, illustrative only (not real student data)</small>
              {[
                ['Mental maths', '78%'],
                ['Navigation', '64%'],
                ['Meteorology', '86%'],
                ['Air Law', '58%']
              ].map(([subject, percent], idx) => (
                <div key={idx} className="bar">
                  <span>{subject}</span>
                  <i style={{ '--w': percent }} />
                </div>
              ))}
            </div>

            <h2 className="rv">Built for aviation training organisations</h2>
            <p className="rv">
              A specialised Learning Management System (LMS), Customer Relationship Management (CRM), mobile learning and business automation, combined in a single ecosystem designed specifically for aviation training organisations.
            </p>
            <div className="fch rv">
              <span>LMS</span>
              <span>CRM</span>
              <span>Mobile learning</span>
              <span>Business automation</span>
            </div>

            <PageCta
              title="Want a walkthrough?"
              buttonText="Request a demo"
              onDemo={onDemo}
            />
            <NextExplore
              items={[
                ['dgca', 'DGCA ground class'],
                ['ask', 'The ASK framework'],
                ['team', 'Our team']
              ]}
              onNavigate={onNavigate}
            />
          </div>
        </>
      );

    case 'attitude':
    case 'skills':
    case 'knowledge':
      return renderAskPillar(pageKey, { onNavigate, onDemo });

    default:
      if (INFO_PAGES[pageKey]) return renderInfoPage(pageKey, { onNavigate, onDemo });
      return null;
  }
}
