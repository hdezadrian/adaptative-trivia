import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log("API KEY:", process.env.OPENAI_API_KEY);

async function getQuestion(difficulty) {
  const prompt = `
Generate a trivia question.

Difficulty: ${difficulty} (1-10)

You are generating questions for an interactive quiz game.

IMPORTANT GOAL:
Create engaging, diverse, and high-quality trivia questions that feel natural, interesting, and not repetitive.

STRICT REQUIREMENTS:
- Question must be max 15 words
- Must have exactly 4 answer options
- Each option must be 1-3 words maximum
- Only one option can be correct
- No explanations, no commentary, no extra text

CONTENT GUIDELINES:
- Include a mix of topics: science, history, sports, technology, pop culture, nature, art, geography
- Geography questions ARE allowed (including capitals, countries, cities)
- Prefer well-known but not overly repetitive trivia facts
- Avoid extremely obvious or childish questions
- Avoid questions that are commonly repeated in quizzes (e.g., overly famous trivia like "What is the capital of France?" should be rare, not dominant)

QUALITY RULES:
- Questions should feel natural and human-made, not generic templates
- Avoid repeating similar wording or structures from typical trivia databases
- Ensure variety in phrasing and subject matter
- Do not generate nearly identical questions to common internet quizzes

DIFFICULTY RULES:
- 1-3: very easy general knowledge, widely known facts
- 4-6: medium difficulty, requires some thinking or less common knowledge
- 7-10: hard questions, obscure facts or trickier knowledge
- Higher difficulty should NOT mean longer questions, only more obscure or challenging knowledge

OUTPUT RULES:
No text before or after.
Do not include markdown or explanations.
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