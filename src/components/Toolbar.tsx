import styles from "./drawingApp.module.css";

type Props = {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
  redoCount: number;
};

export default function Toolbar({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  undoCount,
  redoCount,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo ({undoCount})
      </button>

      <button onClick={onRedo} disabled={!canRedo}>
        Redo ({redoCount})
      </button>
    </div>
  );
}