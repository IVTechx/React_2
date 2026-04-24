import Stats from "./Stats.tsx";
import styles from "./statSection.module.css";

const StatSection = () => {
  return (
    <section className={styles.stats}>
      <Stats statistics="10M+" title="Quizzes Created" />
      <Stats statistics="500K+" title="Active Users" />
      <Stats statistics="99.9%" title="Uptime SLA" />
    </section>
  );
};

export default StatSection;
