import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log("API KEY:", process.env.OPENAI_API_KEY);

async function getQuestion(difficulty) {
  const prompt = `
Generate a trivia question.

Difficulty: ${difficulty} (1-10)

Return ONLY valid JSON. 
No text before or after.
Do not include markdown or explanations.

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


  console.log("KEY:", process.env.OPENAI_API_KEY);

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