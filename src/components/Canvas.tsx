import styles from "./drawingApp.module.css";
import type { Point } from "./Utils/types";

type Props = {
  canvasRef: React.RefObject<HTMLDivElement>;
  points: Point[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Canvas({ canvasRef, points, onClick }: Props) {
  return (
    <div ref={canvasRef} className={styles.canvas} onClick={onClick}>
      {points.length === 0 && (
        <span className={styles.hint}>Click anywhere to add a point</span>
      )}

      {points.map((p) => (
        <div
          key={p.id}
          className={styles.point}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}