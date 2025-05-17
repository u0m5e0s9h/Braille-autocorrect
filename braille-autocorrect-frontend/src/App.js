import React, { useState, useEffect } from 'react';

const BRAILLE_KEYS = ['D', 'W', 'Q', 'K', 'O', 'P'];

function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('english');

  // Handle input change, only allow Braille keys and space/backspace
  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    // Filter out invalid characters except space
    const filtered = value.split('').filter(ch => BRAILLE_KEYS.includes(ch) || ch === ' ').join('');
    setInput(filtered);
  };

  // Fetch suggestions from backend
  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch('https://braille-autocorrect-backend.onrender.com/api/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input, language }),
        });
        const data = await response.json();
        if (response.ok) {
          setSuggestions(data.suggestions);
          setError(null);
        } else {
          setError(data.error || 'Error fetching suggestions');
          setSuggestions([]);
        }
      } catch (err) {
        setError('Network error');
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [input, language]);

  // Send learning data to backend when user selects a suggestion
  const handleSuggestionClick = async (word) => {
    setInput(word);
    setSuggestions([]);

    // Use Web Speech API to read out the corrected word
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }

    try {
      await fetch('https://braille-autocorrect-backend.onrender.com/api/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, language }),
      });
    } catch (err) {
      // Ignore learning errors
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Braille Auto-correct & Suggestion System</h1>
      <label>
        Select Language:{' '}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </label>
      <p>Type Braille dots using QWERTY keys: D, W, Q, K, O, P</p>
      <textarea
        rows={3}
        value={input}
        onChange={handleChange}
        placeholder="Type Braille dots here..."
        style={{ width: '100%', fontSize: '1.2rem', padding: '0.5rem' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {suggestions.length > 0 && (
        <div>
          <h3>Suggestions:</h3>
          <ul>
            {suggestions.map((word, idx) => (
              <li key={idx} onClick={() => handleSuggestionClick(word)} style={{ cursor: 'pointer' }}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
