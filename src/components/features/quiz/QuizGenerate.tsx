import { GoogleGenerativeAI } from "@google/generative-ai";

type GenerateQuizFormData = {
  topic: string;
  language?: string;
  count: string | number;
  difficulty: string;
  specialRequirements?: string;
};

const geminiKey = import.meta.env.VITE_GEMINI_KEY as string | undefined;

const getJsonFromText = (text: string) => {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start)
      throw new Error("No JSON object found in model output.");
    return JSON.parse(trimmed.slice(start, end + 1));
  }
};

export const generateQuiz = async (formData: GenerateQuizFormData) => {
  if (!geminiKey) {
    throw new Error("Missing VITE_GEMINI_KEY.");
  }

  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // model: "gemini-2.5-flash-lite",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `
    Generate a quiz JSON object:
    Topic: ${formData.topic}
    Difficulty: ${formData.difficulty}
    Language: ${formData.language ?? "English"}
    Number of Questions: ${formData.count}
    Special Requirements: ${formData.specialRequirements ?? "None"}

    Structure:
    {
      "title": "string",
      "description": "string",
      "questions": [
        {
          "question": "string",
          "options": ["opt0", "opt1", "opt2", "opt3"],
          "correctAnswer": 0,
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const quizData = getJsonFromText(result.response.text());

    if (!quizData || typeof quizData !== "object") {
      throw new Error("Invalid quiz JSON returned from the model.");
    }
    if (!Array.isArray((quizData as any).questions)) {
      throw new Error("Quiz JSON must include a questions array.");
    }

    return {
      ...quizData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      difficulty: formData.difficulty,
      topic: formData.topic,
      language: formData.language ?? "English",
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate quiz content.");
  }
};
