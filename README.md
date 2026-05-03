# adaptative-trivia
Adaptive Trivia is an AI-powered quiz game that dynamically adjusts question difficulty based on user performance in real time.

# What I built

I built a web-based trivia game that:

- Generates questions dynamically using AI
- Adjusts difficulty based on user performance
- Runs a full 10-question game session
- Tracks correct and incorrect answers
- Provides a final score screen

Each game session is unique because questions are generated in real time.

---

#How it uses OpenAI APIs

This project uses the OpenAI API to generate trivia questions dynamically.

For each question request:

- The frontend sends a difficulty level (1–10)
- The backend API calls OpenAI (`gpt-4o-mini`)
- The AI returns a structured JSON response containing:
  - question
  - 4 answer options
  - correct answer

The AI ensures:
- Infinite question generation
- Mixed topics (science, history, sports, tech, geography, pop culture)
- Difficulty adaptation
- No need for a static database of questions

---

#How to use

The project is fully deployed and does not require installation.

Simply open the live link:

https://adaptative-trivia.vercel.app/

---

# Project structure

- `api/question.js` → Backend API route that generates questions using OpenAI
- `app.js` → Frontend game logic (state management, scoring, difficulty system)
- `index.html` → UI structure

---

# Why AI was necessary

AI is the core of this project because it enables:

- Real-time generation of unlimited questions
- Dynamic difficulty adjustment
- A constantly changing experience for the user
- Elimination of the need for a fixed question database

---

# Screenshots

<img width="570" height="381" alt="image" src="https://github.com/user-attachments/assets/6fae43ee-372a-45a6-8b16-05f00eebcd82" />

<img width="547" height="216" alt="image" src="https://github.com/user-attachments/assets/00c53e30-5c9f-4f9a-8437-7cc54039c9e8" />


---

# Notes

- No API keys are exposed in this repository
- OpenAI API key is securely stored in environment variables
- Fully serverless deployment using Vercel
- Built for an AI development challenge
