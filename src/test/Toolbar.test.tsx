import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Toolbar from "../components/Toolbar";

describe("Toolbar", () => {
  it("disables buttons correctly", () => {
    render(
      <Toolbar
        onUndo={() => {}}
        onRedo={() => {}}
        canUndo={false}
        canRedo={false}
        undoCount={0}
        redoCount={0}
      />
    );

    expect(screen.getByText(/undo/i)).toBeDisabled();
    expect(screen.getByText(/redo/i)).toBeDisabled();
  });

  it("calls undo/redo", () => {
    const undo = vi.fn();
    const redo = vi.fn();

    render(
      <Toolbar
        onUndo={undo}
        onRedo={redo}
        canUndo={true}
        canRedo={true}
        undoCount={1}
        redoCount={1}
      />
    );

    fireEvent.click(screen.getByText(/undo/i));
    fireEvent.click(screen.getByText(/redo/i));

    expect(undo).toHaveBeenCalled();
    expect(redo).toHaveBeenCalled();
  });

  it("shows correct counts in button labels", () => {
    render(
      <Toolbar
        onUndo={() => {}}
        onRedo={() => {}}
        canUndo={true}
        canRedo={true}
        undoCount={3}
        redoCount={2}
      />
    );

    expect(screen.getByText(/undo \(3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/redo \(2\)/i)).toBeInTheDocument();
  });
});