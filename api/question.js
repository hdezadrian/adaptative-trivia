import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getQuestion(difficulty) {
  const prompt = `
Generate a trivia question.

Difficulty: ${difficulty} (1-10)

Create fun, varied, and engaging trivia questions.

STRICT RULES:
- Max 15 words
- Exactly 4 options
- Each option 1-3 words
- Only one correct answer
- No explanations or extra text

TOPICS:
science, history, sports, technology, pop culture, nature, geography

DIFFICULTY:
1-3 easy common knowledge
4-6 medium difficulty
7-10 hard or obscure facts

AVOID:
- Obvious repeated quiz questions
- Overused trivia templates
- Questions about planets

OUTPUT RULES:
Return ONLY a JSON object.
You must respond in JSON format.
No text before or after.

{
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correct": "exact match of one option"
}
`;

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: prompt }
  ],
  response_format: { type: "json_object" }
});

const data = JSON.parse(response.choices[0].message.content);

return {
  question: data.question,
  options: data.options,
  correct: data.correct
};
}

  export default async function handler(req, res) {
    try {
      const difficulty = Number(req.query.difficulty || 3);
  
      const question = await getQuestion(difficulty);
  
      res.status(200).json(question);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }