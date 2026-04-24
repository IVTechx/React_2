export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  language?: string;
  questions: Question[];
  createdAt: string;
  createdBy?: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: (number | undefined)[];
}
