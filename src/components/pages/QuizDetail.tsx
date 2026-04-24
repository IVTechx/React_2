import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useQuizStore from "../../store/useQuizStore";
import styles from "./quizDetails.module.css";

const QuizDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quizId = searchParams.get("id");

  // 1. Pull data from the Zustand Store
  const quizzes = useQuizStore((state) => state.quizzes);
  const quizResults = useQuizStore((state) => state.quizResults);

  // 2. Find the quiz and the specific result for this quiz
  const quiz = useMemo(() => quizzes.find((q) => q.id === quizId), [quizzes, quizId]);
  const result = useMemo(() => quizResults.find((r) => r.quizId === quizId), [quizResults, quizId]);

  if (!quiz) {
    return (
      <div className={styles.loading}>
        <p className={styles.loadingText}>Quiz not found...</p>
        <button onClick={() => navigate("/search")}>Return to Library</button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <button onClick={() => navigate("/search")} className={styles.backBtn}>
            <span className={styles.backIcon} aria-hidden="true">
              &#8592;
            </span>
            Back to Search
          </button>

          <div className={styles.titleRow}>
            <h1 className={styles.title}>{quiz.topic} Assessment</h1>
            <span
              className={`${styles.difficultyBadge} ${
                styles[quiz.difficulty.toLowerCase()] ?? ""
              }`}>
              {quiz.difficulty}
            </span>
          </div>

          <p className={styles.description}>{quiz.description}</p>

          <div className={`${styles.statsRow} ${result ? styles.statsRowWithScore : ""}`}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{quiz.questions.length}</div>
              <div className={styles.statLabel}>Questions</div>
            </div>
            <div className={styles.stat}>
              <div className={`${styles.statValue} ${styles.statValueSmall}`}>{quiz.topic}</div>
              <div className={styles.statLabel}>Topic</div>
            </div>
            <div className={styles.stat}>
              <div className={`${styles.statValue} ${styles.statValueSmall}`}>
                {new Date(quiz.createdAt).toLocaleDateString()}
              </div>
              <div className={styles.statLabel}>Created</div>
            </div>
            {result && (
              <div className={styles.stat}>
                <div className={`${styles.statValue} ${styles.scoreValue}`}>
                  {result.percentage}%
                </div>
                <div className={styles.statLabel}>Your Score</div>
              </div>
            )}
          </div>

          {!result && (
            <div className={styles.takeQuizRow}>
              <button
                className={styles.startBtn}
                onClick={() => navigate(`/passquiz?id=${quizId}`)}>
                Take Quiz
              </button>
            </div>
          )}
        </header>

        {/* Questions List */}
        <div className={styles.questionsStack}>
          {quiz.questions.map((q: any, qIdx: number) => {
            const userChoice = result?.answers[qIdx];
            const isCorrect = userChoice === q.correctAnswer;

            return (
              <div key={qIdx} className={styles.questionCard}>
                <div className={styles.qHeader}>
                  <span className={styles.qNumber}>{qIdx + 1}</span>
                  {result && (
                    <span className={isCorrect ? styles.tagCorrect : styles.tagWrong}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  )}
                </div>

                <h3 className={styles.questionText}>{q.question}</h3>

                <div className={styles.optionsGrid}>
                  {q.options.map((option: string, oIdx: number) => {
                    let optionStyle = styles.option;

                    if (result) {
                      if (oIdx === q.correctAnswer)
                        optionStyle = `${styles.option} ${styles.correct}`;
                      else if (oIdx === userChoice && !isCorrect)
                        optionStyle = `${styles.option} ${styles.wrong}`;
                      else optionStyle = `${styles.option} ${styles.dimmed}`;
                    }

                    return (
                      <div key={oIdx} className={optionStyle}>
                        <span className={styles.radioPlaceholder}>
                          {result && oIdx === q.correctAnswer && <span>&#10003;</span>}
                          {result && oIdx === userChoice && !isCorrect && <span>&#10005;</span>}
                        </span>
                        <span className={styles.optionText}>{option}</span>
                      </div>
                    );
                  })}
                </div>

                {result && (
                  <div className={styles.explanation}>
                    <strong className={styles.explanationTitle}>Explanation:</strong>
                    <p className={styles.explanationText}>
                      {q.explanation || "No explanation provided."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Your Performance Section (Only shows if completed) */}
        {result && (
          <section className={styles.performanceContainer}>
            <h2 className={styles.perfTitle}>Your Performance</h2>
            <div className={styles.perfGrid}>
              <div className={styles.perfItem}>
                <span className={styles.perfValue}>{result.percentage}%</span>
                <span className={styles.perfLabel}>Overall Score</span>
              </div>
              <div className={styles.perfItem}>
                <span className={[styles.perfValue, styles.tagCorrect].join(" ")}>
                  {result.score}
                </span>
                <span className={styles.perfLabel}>Correct</span>
              </div>
              <div className={styles.perfItem}>
                <span className={[styles.perfValue, styles.tagWrong].join(" ")}>
                  {result.total - result.score}
                </span>
                <span className={styles.perfLabel}>Incorrect</span>
              </div>
              <div className={styles.perfItem}>
                <span className={styles.perfValue}>{result.total}</span>
                <span className={styles.perfLabel}>Total Questions</span>
              </div>
            </div>
            <p className={styles.timestamp}>
              Completed on {new Date(result.completedAt).toLocaleString()}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;
