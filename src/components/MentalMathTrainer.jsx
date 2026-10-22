import React, { useState, useEffect } from 'react';

const R = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function MentalMathTrainer() {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const generateNewQuestion = () => {
    const t = R([10, 15, 20, 25, 30, 40, 45]);
    let qText = '';
    let ansVal = 0;

    if (Math.random() < 0.5) {
      const r = R([2, 3, 4, 5, 6, 7]);
      ansVal = t;
      qText = `Groundspeed ${r * 60} kt. How many minutes to fly ${r * t} NM?`;
    } else {
      const f = R([1200, 1800, 2400, 3000, 3600]);
      const m = R([10, 20, 30, 40, 45, 50]);
      ansVal = (f * m) / 60;
      qText = `Fuel flow ${f} kg/h. How many kg of fuel in ${m} minutes?`;
    }

    setQuestion(qText);
    setCorrectAnswer(ansVal);
    setUserInput('');
    setFeedback('');
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleCheckAnswer = () => {
    if (userInput.trim() === '') return;
    const numInput = Number(userInput);
    const newTotal = total + 1;
    setTotal(newTotal);

    if (numInput === correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(`Correct. ${newScore} of ${newTotal} right so far.`);
    } else {
      setFeedback(`Not quite. The answer is ${correctAnswer}. ${score} of ${newTotal} right so far.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheckAnswer();
    }
  };

  return (
    <div className="trainer">
      <h3>Try a pilot's mental maths</h3>
      <p>Skills in practice: estimate without a calculator, then check yourself.</p>
      <p className="q" aria-live="polite">
        {question}
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
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="chk" onClick={handleCheckAnswer}>
          Check answer
        </button>
        <button className="g" id="nx" onClick={generateNewQuestion}>
          New question
        </button>
      </div>

      {feedback && (
        <div id="fb" aria-live="polite">
          {feedback}
        </div>
      )}
    </div>
  );
}
