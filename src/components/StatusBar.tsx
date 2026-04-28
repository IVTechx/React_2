import styles from "./drawingApp.module.css";

type Props = {
  points: number;
  history: number;
  future: number;
};

export default function StatusBar({ points, history, future }: Props) {
  return (
    <div className={styles.status}>
      <p>Points on canvas: {points}</p>
      <p>History states: {history}</p>
      <p>Future states: {future}</p>
    </div>
  );
}