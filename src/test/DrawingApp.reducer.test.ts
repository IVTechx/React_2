import { describe, it, expect } from "vitest";
import type { State } from "../components/utils/types";
import { reducer } from "../components/utils/reducer";

const initialState: State = {
  history: [[]],
  future: [],
};

describe("reducer", () => {
  it("adds a point", () => {
    const state = reducer(initialState, {
      type: "ADD_POINT",
      x: 10,
      y: 20,
      colorIdx: 0,
    });

    expect(state.history.length).toBe(2);
    expect(state.history[1].length).toBe(1);
  });

  it("undo works", () => {
    let state = reducer(initialState, {
      type: "ADD_POINT",
      x: 1,
      y: 1,
      colorIdx: 0,
    });

    state = reducer(state, { type: "UNDO" });

    expect(state.history.length).toBe(1);
    expect(state.future.length).toBe(1);
  });

  it("redo works", () => {
    let state = reducer(initialState, {
      type: "ADD_POINT",
      x: 1,
      y: 1,
      colorIdx: 0,
    });

    state = reducer(state, { type: "UNDO" });
    state = reducer(state, { type: "REDO" });

    expect(state.history.length).toBe(2);
  });

  it("undo is a no-op on empty history", () => {
    const state = reducer(initialState, { type: "UNDO" });
    expect(state).toBe(initialState);
  });

  it("redo is a no-op when future is empty", () => {
    const state = reducer(initialState, { type: "REDO" });
    expect(state).toBe(initialState);
  });

  it("stores correct x, y, and color on ADD_POINT", () => {
    const state = reducer(initialState, {
      type: "ADD_POINT",
      x: 42,
      y: 77,
      colorIdx: 0,
    });

    const point = state.history[1][0];
    expect(point.x).toBe(42);
    expect(point.y).toBe(77);
    expect(point.color).toBe("#378ADD");
  });

  it("color index wraps around after 8 colors", () => {
    const stateIdx0 = reducer(initialState, { type: "ADD_POINT", x: 0, y: 0, colorIdx: 0 });
    const stateIdx8 = reducer(initialState, { type: "ADD_POINT", x: 0, y: 0, colorIdx: 8 });
    expect(stateIdx0.history[1][0].color).toBe(stateIdx8.history[1][0].color);
  });

  it("default case returns state unchanged", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = reducer(initialState, { type: "UNKNOWN" } as any);
    expect(state).toBe(initialState);
  });

  it("ADD_POINT clears future", () => {
    // undo first so future has an entry
    let state = reducer(initialState, { type: "ADD_POINT", x: 1, y: 1, colorIdx: 0 });
    state = reducer(state, { type: "UNDO" });
    expect(state.future.length).toBe(1);

    // adding a new point must wipe future
    state = reducer(state, { type: "ADD_POINT", x: 2, y: 2, colorIdx: 1 });
    expect(state.future.length).toBe(0);
  });

  it("undo clears future; redo restores history", () => {
    let state = reducer(initialState, { type: "ADD_POINT", x: 1, y: 1, colorIdx: 0 });
    state = reducer(state, { type: "ADD_POINT", x: 2, y: 2, colorIdx: 1 });
    state = reducer(state, { type: "UNDO" });
    expect(state.future.length).toBe(1);
    state = reducer(state, { type: "REDO" });
    expect(state.future.length).toBe(0);
    expect(state.history.length).toBe(3);
  });
});
