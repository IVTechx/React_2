import React, { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./results.module.css";
import useQuizStore from "../../../store/useQuizStore";

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quizId = searchParams.get("id");

  // Pull the raw arrays from the store
  const quizzes = useQuizStore((state) => state.quizzes);
  const quizResults = useQuizStore((state) => state.quizResults);

  // Find the data manually using useMemo
  const quiz = useMemo(() => quizzes.find((q) => q.id === quizId), [quizzes, quizId]);
  const result = useMemo(() => quizResults.find((r) => r.quizId === quizId), [quizResults, quizId]);

  if (!quiz || !result) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading results...</p>
          <button onClick={() => navigate("/")} className={styles.homeBtn}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <div className={styles.checkIcon}>&#10003;</div>
        </div>

        <h1 className={styles.title}>Quiz Completed!</h1>
        <p className={styles.subtitle}>
          Quiz: <strong>{quiz.title}</strong>
        </p>

        <div className={styles.scoreCircle}>
          <span className={styles.percentage}>{result.percentage}%</span>
          <span className={styles.scoreText}>
            {result.score} / {result.total} Correct
          </span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{result.score}</span>
            <span className={styles.statLabel}>Correct</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{result.total - result.score}</span>
            <span className={styles.statLabel}>Incorrect</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{quiz.difficulty}</span>
            <span className={styles.statLabel}>Difficulty</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={() => navigate("/")} className={styles.homeBtn}>
            Back to Home
          </button>
          <button onClick={() => navigate(`/quiz?id=${quizId}`)} className={styles.reviewBtn}>
            Review Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
