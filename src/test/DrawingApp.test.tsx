import { render, screen, fireEvent } from "@testing-library/react";
import DrawingApp from "../components/DrawingApp";
import { describe, it, expect, vi } from "vitest";

describe("DrawingApp", () => {
  it("undo/redo disabled initially", () => {
    render(<DrawingApp />);

    const undoBtn = screen.getByRole("button", { name: /undo/i });
    const redoBtn = screen.getByRole("button", { name: /redo/i });

    expect(undoBtn).toBeDisabled();
    expect(redoBtn).toBeDisabled();
  });

  it("renders the canvas hint initially", () => {
    render(<DrawingApp />);
    expect(screen.getByText(/click anywhere to add a point/i)).toBeInTheDocument();
  });

  it("renders the status bar with zero points initially", () => {
    render(<DrawingApp />);
    expect(screen.getByText(/points on canvas:\s*0/i)).toBeInTheDocument();
  });

  it("adds a point when canvas is clicked", () => {
    render(<DrawingApp />);

    const canvas = document.querySelector('[class*="canvas"]') as HTMLElement;
    canvas.getBoundingClientRect = vi.fn(() => ({
      left: 0, top: 0, width: 100, height: 100,
      right: 100, bottom: 100, x: 0, y: 0, toJSON: () => {},
    }));

    fireEvent.click(canvas, { clientX: 50, clientY: 50 });

    expect(screen.getByText(/points on canvas:\s*1/i)).toBeInTheDocument();
  });

  it("undo button removes a point; redo restores it", () => {
    render(<DrawingApp />);

    const canvas = document.querySelector('[class*="canvas"]') as HTMLElement;
    canvas.getBoundingClientRect = vi.fn(() => ({
      left: 0, top: 0, width: 100, height: 100,
      right: 100, bottom: 100, x: 0, y: 0, toJSON: () => {},
    }));

    fireEvent.click(canvas, { clientX: 50, clientY: 50 });
    expect(screen.getByText(/points on canvas:\s*1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /undo/i }));
    expect(screen.getByText(/points on canvas:\s*0/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /redo/i }));
    expect(screen.getByText(/points on canvas:\s*1/i)).toBeInTheDocument();
  });
});