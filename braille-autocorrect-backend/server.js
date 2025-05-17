const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample dictionaries for demonstration
const dictionaries = {
  english: [
    'cat',
    'bat',
    'rat',
    'car',
    'bar',
    'cart',
    'batman',
    'carton',
    'carbon',
    // Common English Braille contractions
    'and',
    'for',
    'the',
    'with',
    'of',
    'to',
    'in',
  ],
  spanish: [
    'gato',
    'perro',
    'raton',
    'casa',
    'barco',
    'carro',
    'barman',
    'carton',
    'carbon',
  ],
};

// Learning data to store user inputs frequency
const learningData = {
  english: {},
  spanish: {},
};

// Function to calculate Levenshtein distance
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// API endpoint to get suggestions based on input and language
app.post('/api/suggest', (req, res) => {
  const { input, language = 'english' } = req.body;
  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }
  if (!dictionaries[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const dict = dictionaries[language];
  const learnData = learningData[language];

  // Find closest word(s) based on Levenshtein distance
  let minDistance = Infinity;
  let suggestions = [];

  dict.forEach(word => {
    const dist = levenshteinDistance(input, word);
    if (dist < minDistance) {
      minDistance = dist;
      suggestions = [word];
    } else if (dist === minDistance) {
      suggestions.push(word);
    }
  });

  // Sort suggestions by learning frequency (descending)
  suggestions.sort((a, b) => (learnData[b] || 0) - (learnData[a] || 0));

  res.json({ suggestions, distance: minDistance });
});

// API endpoint to learn user input
app.post('/api/learn', (req, res) => {
  const { word, language = 'english' } = req.body;
  if (!word) {
    return res.status(400).json({ error: 'Word is required for learning' });
  }
  if (!dictionaries[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  if (!learningData[language][word]) {
    learningData[language][word] = 0;
  }
  learningData[language][word] += 1;

  res.json({ message: 'Learning updated', word, language, count: learningData[language][word] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
