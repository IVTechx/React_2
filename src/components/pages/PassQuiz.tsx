import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useQuizStore from "../../store/useQuizStore";
import styles from "./passQuiz.module.css";
import type { QuizResult } from "../../utils/types";

const PassQuiz: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quizId = searchParams.get("id");

  const quizzes = useQuizStore((state) => state.quizzes);
  const addResult = useQuizStore((state) => state.addResult);
  const quizResults = useQuizStore((state) => state.quizResults);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const quiz = useMemo(() => {
    if (!quizId) return null;
    return quizzes.find((q) => q.id === quizId) ?? null;
  }, [quizzes, quizId]);

  // Find result if it exists
  const result = useMemo(() => quizResults.find((r) => r.quizId === quizId), [quizResults, quizId]);

  // If a result already exists in the store, show the results UI immediately
  useEffect(() => {
    if (result) {
      setIsFinished(true);
    }
  }, [result]);

  if (!quiz) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>{quizId ? "Loading Quiz..." : "Missing quiz id."}</p>
      </div>
    );
  }

  const handleFinish = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedOptions[i] === q.correctAnswer) {
        calculatedScore++;
      }
    });

    const resultEntry: QuizResult = {
      quizId: quiz.id,
      score: calculatedScore,
      total: quiz.questions.length,
      percentage: Math.round((calculatedScore / quiz.questions.length) * 100),
      completedAt: new Date().toISOString(),
      answers: quiz.questions.map((_, i) => selectedOptions[i]),
    };

    addResult(resultEntry);
    setIsFinished(true); // Switch UI instead of navigating
  };

  // --- RESULTS UI ---
  // --- RESULTS UI ---
  if (isFinished && result) {
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          {/* Blue Checkmark Icon */}
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="22 4 12 14.01 9 11.01"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className={styles.resultTitle}>Quiz Complete!</h1>

          <div className={styles.bigScore}>{result.percentage}%</div>
          <p className={styles.scoreSubtext}>
            {result.score} out of {result.total} correct
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{result.score}</span>
              <span className={styles.statLabel}>Correct</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{result.total - result.score}</span>
              <span className={styles.statLabel}>Incorrect</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{quiz.difficulty}</span>
              <span className={styles.statLabel}>Difficulty</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => navigate("/")} className={styles.darkBtn}>
              Return Home
            </button>
            <button onClick={() => navigate(`/quiz?id=${quizId}`)} className={styles.outlineBtn}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ UI ---
  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          <span className={styles.backIcon} aria-hidden="true">
            &#8592;
          </span>
          Back to Home
        </button>
        <div className={styles.quizInfo}>
          <h1 className={styles.topicTitle}>{quiz.topic} Assessment</h1>
          <p className={styles.description}>{quiz.description}</p>
        </div>
      </header>

      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <main className={styles.questionCard}>
        <h2 className={styles.questionText}>{currentQuestion.question}</h2>
        <div className={styles.optionsGrid}>
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              className={`${styles.optionBtn} ${
                selectedOptions[currentIndex] === idx ? styles.selected : ""
              }`}
              onClick={() => setSelectedOptions({ ...selectedOptions, [currentIndex]: idx })}>
              <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
              <span className={styles.optionText}>{option}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <button
          className={styles.secondaryBtn}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((c) => c - 1)}>
          Previous
        </button>
        <button
          className={styles.primaryBtn}
          disabled={selectedOptions[currentIndex] === undefined}
          onClick={
            currentIndex === totalQuestions - 1 ? handleFinish : () => setCurrentIndex((c) => c + 1)
          }>
          {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
        </button>
      </footer>
    </div>
  );
};

export default PassQuiz;
