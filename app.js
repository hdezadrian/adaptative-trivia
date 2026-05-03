let state = {
    correct: 0,
    wrong: 0,
    total: 0,
    difficulty: 3,
    currentQuestion: null,
    locked: false
  };
  
  // Start game
  startGame();
  
  async function startGame() {
    await nextQuestion();
  }
  
  // Fetch and display next question
  async function nextQuestion() {
    if (state.total >= 10) {
      endGame();
      return;
    }

    const res = await fetch(`/api/question?difficulty=${state.difficulty}`);

    if (!res.ok) {
        console.error("API error");
        return;
      }

    const question = await res.json();

    if (!question.options) {
        console.error("Invalid question:", question);
        return;
      }
  
    state.currentQuestion = question;
  
    state.locked = false;
    renderQuestion(question);
  }
  
  // Process user's answer and update state
  function handleAnswer(selected) {
    if (!state.currentQuestion || state.locked) return;

    state.locked = true;

    const correct = state.currentQuestion.correct;
    state.currentQuestion = null;
  
    if (selected === correct) {
      state.correct++;
      state.difficulty = Math.min(state.difficulty + 1, 10);
    } else {
      state.wrong++;
      state.difficulty = Math.max(state.difficulty - 1, 1);
    }
  
    state.total++;
  
    nextQuestion();
  }
  
  // End game
  function endGame() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
      <h1>Game Over</h1>
      <p>Score: ${state.correct} / ${state.total}</p>
      <p>Wrong: ${state.wrong}</p>
      <button onclick="location.reload()">Play Again</button>
    `;
  }

// Render question and answer options in UI
function renderQuestion(q) {
    const app = document.getElementById("app")
  
    app.innerHTML = `
    <div class="stats">
      <span>Total: ${state.total}/10</span>
      <span>Correct: ${state.correct}</span>
      <span>Wrong: ${state.wrong}</span>
    </div>

    <h2>${state.total + 1}. ${q.question}</h2>

    ${q.options.map((opt, i) => `
      <button onclick="handleAnswer('${opt}')">
        ${String.fromCharCode(65 + i)}. ${opt}
      </button>
    `).join("")}
  `;
}