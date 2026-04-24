import styles from "./heroSection.module.css";
import useAuthStore from "../../store/authStore";

const HeroSection = () => {
  const isLoggedIn = useAuthStore((state) => !!state.userProfile);
  const openAuth = useAuthStore((state) => state.openAuth);
  const openCreateQuiz = useAuthStore((state) => state.openCreateQuiz);

  const handleCreateClick = () => {
    if (isLoggedIn) {
      openCreateQuiz();
    } else {
      openAuth("signin", true);
    }
  };

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Enterprise AI Quiz Platform</h1>
      <p className={styles.description}>
        Harness the power of artificial intelligence to create, manage, and analyze professional
        quizzes. Built for enterprise-scale learning and assessment.
      </p>

      <button onClick={handleCreateClick} className={styles.btn}>
        + Create Quiz
      </button>
    </section>
  );
};

export default HeroSection;
