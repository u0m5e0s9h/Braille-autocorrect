# Braille Auto-correct and Suggestion System

## Overview

This project implements an auto-correct and suggestion system tailored for Braille input typed via a standard QWERTY keyboard using the six-key entry method. It supports multiple languages, handles typos and errors efficiently, and includes a learning mechanism to improve suggestions based on user inputs. Additionally, it features Web Speech API integration to read out corrected words for visually impaired users.
##Live
```
https://braille-autocorrect-frontend.onrender.com/
```
## Features

- **Braille Input via QWERTY Keyboard:** Users can type Braille dots using keys D, W, Q, K, O, P corresponding to Braille dots 1-6.
- **Auto-correct and Suggestions:** Suggests the closest possible word based on the entered Braille pattern using Levenshtein distance.
- **Error Handling:** Efficiently handles typos, missing, or extra inputs.
- **Multi-language Support:** Supports English and Spanish dictionaries.
- **Braille Contractions:** Includes common English Braille contractions in the dictionary.
- **Learning Mechanism:** Improves suggestion ranking based on previous user selections.
- **Web Speech API Integration:** Reads out the corrected word after a suggestion is made to assist visually impaired users.
- **Real-time Suggestions:** Provides instant feedback as users type.
- **Input Validation:** Accepts only valid Braille keys and spaces.
- **Responsive UI:** User-friendly React frontend with language selection.

## Project Structure

- `braille-autocorrect-backend/`: Node.js Express backend server.
- `braille-autocorrect-frontend/`: React frontend application.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Running the Backend

To Clone Projec
```
git clone https://github.com/u0m5e0s9h/Braille-autocorrect.git
```

1. Navigate to the backend directory:

   ```bash
   cd braille-autocorrect-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

### Running the Frontend

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd braille-autocorrect-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The frontend app will open automatically in your default browser at `http://localhost:3000`.

## Usage

- Select the desired language (English or Spanish) from the dropdown.
- Type Braille dots using the keys D, W, Q, K, O, P.
- View real-time suggestions below the input area.
- Click on a suggestion to select it; the word will be read aloud using the Web Speech API.
- The system learns from your selections to improve future suggestions.

## Testing

- Test backend API endpoints `/api/suggest` and `/api/learn` using tools like curl or Postman.
- Test frontend by interacting with the UI, changing languages, typing inputs, and selecting suggestions.
- Verify Web Speech API reads out suggestions upon selection.

## Future Enhancements

- Add support for more languages and Braille contractions.
- Persist learning data in a database.
- Improve performance with Trie-based search or other algorithms.
- Add user authentication and personalized learning profiles.

## License

This project is open source and available under the MIT License.
