import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getQuestion(difficulty) {
  const prompt = `
Generate a trivia question.

Difficulty: ${difficulty} (1-10)

Rules:
- Question must be max 15 words
- 4 options
- options must be short (1-3 words)
- only one correct answer
- no explanations

Difficulty guide:
1-3 easy general knowledge
4-6 medium difficulty
7-10 hard/tricky knowledge

Return ONLY valid JSON:
{
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correct": "exact match of one option"
}
`;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });

  const text =
  response.output_text ||
  response.output?.[0]?.content?.[0]?.text;

  try {
    return JSON.parse(text);
  } catch (e) {
    return {
      question: "Fallback question",
      options: ["A", "B", "C", "D"],
      correct: "A"
    };
  }
}

export default async function handler(req, res) {
  try {
    const difficulty = Number(req.query.difficulty || 3);

    const question = await getQuestion(difficulty);

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate question" });
  }
}