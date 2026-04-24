import Card from "../ui/Card";
import styles from "./featureSection.module.css";

const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      <h2 className={styles.title}>Enterprise Features</h2>

      <div className={styles.featureGrid}>
        <Card
          icon="brain"
          title="AI-Powered"
          intro="Advanced AI generates contextual questions based on your specifications"
        />

        <Card
          icon="users"
          title="Multi-Language"
          intro="Create quizzes in multiple languages for global teams"
        />

        <Card
          icon="trophy"
          title="Performance Analytics"
          intro="Detailed insights and performance tracking for all assessments"
        />

        <Card
          icon="trendingUp"
          title="Scalable Platform"
          intro="Enterprise-grade infrastructure supporting unlimited users"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
