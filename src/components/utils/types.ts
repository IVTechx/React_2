export type Point = {
  id: number;
  x: number;
  y: number;
  color: string;
};

export type State = {
  history: Point[][];
  future: Point[][];
};

export type Action =
  | { type: "ADD_POINT"; x: number; y: number; colorIdx: number }
  | { type: "UNDO" }
  | { type: "REDO" };