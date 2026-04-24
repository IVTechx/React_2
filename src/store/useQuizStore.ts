import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Quiz, QuizResult } from "../utils/types";

interface QuizState {
  quizzes: Quiz[];
  quizResults: QuizResult[];
  defaultsLoaded: boolean;
  addQuiz: (newQuiz: Quiz) => void;
  addResult: (result: QuizResult) => void;
  clearForLogout: () => void;
  loadDefaultQuizzes: () => Promise<void>;
}

const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizzes: [],
      quizResults: [],
      defaultsLoaded: false,

      addQuiz: (newQuiz) =>
        set((state) => ({
          quizzes: [newQuiz, ...state.quizzes],
        })),

      addResult: (result) =>
        set((state) => ({
          quizResults: [...state.quizResults, result],
        })),

      clearForLogout: () =>
        set((state) => {
          const defaultQuizzes = state.quizzes.filter((q) => q.id.startsWith("quiz-"));
          return {
            quizzes: defaultQuizzes,
            quizResults: [],
            defaultsLoaded: defaultQuizzes.length > 0,
          };
        }),

      loadDefaultQuizzes: async () => {
        if (get().defaultsLoaded) return;

        try {
          const response = await fetch(`${import.meta.env.BASE_URL}quizzes.json`);
          if (!response.ok) throw new Error("Failed to fetch defaults");
          const data = (await response.json()) as Quiz[];
          if (!Array.isArray(data)) throw new Error("Defaults must be an array");

          const existing = get().quizzes;
          const existingIds = new Set(existing.map((q) => q.id));
          const merged = [...existing, ...data.filter((q) => !existingIds.has(q.id))];

          set({ quizzes: merged, defaultsLoaded: true });
        } catch (error) {
          console.error("Error loading default quizzes:", error);
        }
      },
    }),
    { name: "quiz-storage" },
  ),
);

export default useQuizStore;
