import { useReducer, useRef } from "react";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import StatusBar from "./StatusBar";
import styles from "./drawingApp.module.css";
import { reducer } from "./Utils/reducer";
import type { State } from "./Utils/types";

const initialState: State = {
  history: [[]],
  future: [],
};

export default function DrawingApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<number>(0);

  const points = state.history[state.history.length - 1];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    dispatch({
      type: "ADD_POINT",
      x,
      y,
      colorIdx: colorRef.current++,
    });
  };

  return (
    <div className={styles.container}>
      <h2>Drawing App with Undo/Redo</h2>
      <p className={styles.subtitle}>
        Click anywhere on the canvas below to add points. Use the undo/redo
        buttons to navigate through your drawing history.
      </p>

      <Toolbar
        onUndo={() => dispatch({ type: "UNDO" })}
        onRedo={() => dispatch({ type: "REDO" })}
        canUndo={state.history.length > 1}
        canRedo={state.future.length > 0}
        undoCount={state.history.length - 1}
        redoCount={state.future.length}
      />

      <Canvas
        canvasRef={canvasRef}
        points={points}
        onClick={handleClick}
      />

      <StatusBar
        points={points.length}
        history={state.history.length}
        future={state.future.length}
      />
    </div>
  );
}