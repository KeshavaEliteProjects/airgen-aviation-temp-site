import React, { useState, useEffect } from 'react';
import { generateMathQuestion, spellPhonetic } from '../utils/askData';

export default function AskSection() {

  // Mental maths state
  const [mathQ, setMathQ] = useState({ q: '', expectedAns: 0 });
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  // Radiotelephony state
  const [callsign, setCallsign] = useState('Airgen');

  useEffect(() => {
    setMathQ(generateMathQuestion());
  }, []);

  const handleNewQuestion = () => {
    setMathQ(generateMathQuestion());
    setUserAns('');
    setFeedback('');
  };

  const handleCheckAnswer = () => {
    if (userAns.trim() === '') return;
    const newTot = totalAttempts + 1;
    setTotalAttempts(newTot);
    if (Number(userAns) === mathQ.expectedAns) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(`Correct. ${newScore} of ${newTot} right so far.`);
    } else {
      setFeedback(`Not quite. The answer is ${mathQ.expectedAns}. ${score} of ${newTot} right so far.`);
    }
  };

  return (
    <section className="ask" id="ask">
      <div className="wrap">
        <h2 className="askh">Try a pilot’s skills.</h2>
        {/* Mental Maths Trainer */}
        <div className="trainer">
          <h3>Try a pilot’s mental maths</h3>
          <p>Skills in practice: estimate without a calculator, then check yourself.</p>
          <p className="q" id="q" aria-live="polite">
            {mathQ.q}
          </p>
          <div className="row">
            <label className="sr" htmlFor="ans">
              Your answer
            </label>
            <input
              id="ans"
              type="number"
              inputMode="numeric"
              placeholder="Answer"
              value={userAns}
              onChange={e => setUserAns(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCheckAnswer();
              }}
            />
            <button id="chk" type="button" onClick={handleCheckAnswer}>
              Check answer
            </button>
            <button className="g" id="nx" type="button" onClick={handleNewQuestion}>
              New question
            </button>
          </div>
          <div id="fb" aria-live="polite">
            {feedback}
          </div>
        </div>

        {/* Say it like a pilot */}
        <div className="trainer" style={{ marginTop: '28px' }}>
          <h3>Say it like a pilot</h3>
          <p>Type your name or a call sign and see it spelled in the ICAO radiotelephony alphabet.</p>
          <div className="row">
            <label className="sr" htmlFor="ph">
              Name or call sign
            </label>
            <input
              id="ph"
              value={callsign}
              maxLength={24}
              autoComplete="off"
              style={{ width: '14em' }}
              onChange={e => setCallsign(e.target.value)}
            />
          </div>
          <p className="q" id="po" aria-live="polite">
            {spellPhonetic(callsign)}
          </p>
        </div>
      </div>
    </section>
  );
}
