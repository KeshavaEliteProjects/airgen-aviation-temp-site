import React, { useState } from 'react';

const AL = 'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu'.split(' ');
const DG = 'Zero Wun Too Tree Fower Fife Six Seven Eight Niner'.split(' ');

function spellPhonetic(text) {
  const result = [...text.toLowerCase()]
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 97 && code <= 122) return AL[code - 97];
      if (code >= 48 && code <= 57) return DG[code - 48];
      return null;
    })
    .filter(Boolean)
    .join(' · ');

  return result || 'Type letters or numbers';
}

export default function PhoneticTool() {
  const [inputText, setInputText] = useState('Airgen');

  return (
    <div className="trainer" style={{ marginTop: '28px' }}>
      <h3>Say it like a pilot</h3>
      <p>Type your name or a call sign and see it spelled in the ICAO radiotelephony alphabet.</p>

      <div className="row">
        <label className="sr" htmlFor="ph">
          Name or call sign
        </label>
        <input
          id="ph"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          maxLength={24}
          autoComplete="off"
          style={{ width: '14em' }}
        />
      </div>

      <p className="q" aria-live="polite">
        {spellPhonetic(inputText)}
      </p>
    </div>
  );
}
