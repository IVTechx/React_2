import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../../store/useQuizStore";
import styles from "./search.module.css";

const difficultyRank = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    case "expert":
      return 4;
    default:
      return 999;
  }
};

const SearchQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const quizzes = useQuizStore((state) => state.quizzes); // Getting quizzes from the single source of truth

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "difficulty" | "title">("newest");

  // Filter and Sort Logic
  const filteredQuizzes = quizzes
    .filter((q) => {
      const matchesSearch =
        q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiff = filterDifficulty === "All" || q.difficulty === filterDifficulty;
      return matchesSearch && matchesDiff;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "difficulty") {
        const diff = difficultyRank(a.difficulty) - difficultyRank(b.difficulty);
        if (diff !== 0) return diff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className={styles.searchPage}>
      <header className={styles.searchHeader}>
        <button onClick={() => navigate("/")} className={styles.backLink}>
          <span className={styles.backIcon} aria-hidden="true">
            &#8592;
          </span>
          Back to Home
        </button>
        <h1 className={styles.title}>Browse Quizzes</h1>
        <p className={styles.subtitle}>Discover and take quizzes from our library</p>
      </header>

      <div className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <div className={`${styles.selectWrapper} ${styles.withIcon}`}>
            <span className={styles.selectIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3m8-3v3M4.5 8.5h15" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M6.5 5.5h11A2 2 0 0 1 19.5 7.5v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="newest">Date Created</option>
              <option value="difficulty">Difficulty</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}>
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <p className={styles.showing}>
        Showing {filteredQuizzes.length} of {quizzes.length} quizzes
      </p>

      <div className={styles.resultsGrid}>
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={styles.quizCard}
              onClick={() => navigate(`/quiz?id=${quiz.id}`)}>
              <div className={styles.cardHeader}>
                <span className={`${styles.badge} ${styles[quiz.difficulty.toLowerCase()]}`}>
                  {quiz.difficulty}
                </span>
                <span className={styles.questionsCount}>{quiz.questions.length} questions</span>
              </div>
              <h3 className={styles.quizTitle}>{quiz.title}</h3>
              <p className={styles.quizDescription}>{quiz.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.quizMeta}>Topic: {quiz.topic}</span>
                <span className={styles.date}>{new Date(quiz.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No quizzes found</h3>
            <p className={styles.emptyText}>Try adjusting your search or filters.</p>
            <button onClick={() => navigate("/")} className={styles.createBtn}>
              Create Your First Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchQuizzes;
