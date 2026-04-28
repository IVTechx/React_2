import type { Action, Point, State } from "./types";

const POINT_COLORS = ['#378ADD','#1D9E75','#D85A30','#ea0c56',
  '#7F77DD','#d79d4c','#84d71d','#b12020'];



export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_POINT": {
      const current = state.history[state.history.length - 1];

      const newPoint: Point = {
        id: Date.now(),
        x: action.x,
        y: action.y,
        color: POINT_COLORS[action.colorIdx % POINT_COLORS.length],
      };

      return {
        history: [...state.history, [...current, newPoint]],
        future: [],
      };
    }

    case "UNDO": {
      if (state.history.length <= 1) return state;

      const newHistory = state.history.slice(0, -1);
      const undone = state.history[state.history.length - 1];

      return {
        history: newHistory,
        future: [undone, ...state.future],
      };
    }

    case "REDO": {
      if (!state.future.length) return state;

      const [next, ...rest] = state.future;

      return {
        history: [...state.history, next],
        future: rest,
      };
    }

    default:
      return state;
  }
}
