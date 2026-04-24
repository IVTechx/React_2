import styles from "./stats.module.css";

interface type {
  statistics: string;
  title: string;
}

const Stats = ({ statistics, title }: type) => {
  return (
    <div className={styles.stat}>
      <h3 className={styles.value}>{statistics}</h3>
      <p className={styles.label}>{title}</p>
    </div>
  );
};

export default Stats;
