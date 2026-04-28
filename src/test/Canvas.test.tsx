import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Canvas from "../components/Canvas";

describe("Canvas", () => {
  it("shows hint when empty", () => {
    render(
      <Canvas
        canvasRef={{ current: document.createElement("div") }}
        points={[]}
        onClick={() => {}}
      />
    );

    expect(
      screen.getByText(/click anywhere to add a point/i)
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Canvas
        canvasRef={{ current: document.createElement("div") }}
        points={[]}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText(/click anywhere to add a point/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("hides hint when points exist", () => {
    const points = [{ id: 1, x: 10, y: 20, color: "#378ADD" }];

    render(
      <Canvas
        canvasRef={{ current: document.createElement("div") }}
        points={points}
        onClick={() => {}}
      />
    );

    expect(screen.queryByText(/click anywhere to add a point/i)).not.toBeInTheDocument();
  });

  it("renders one element per point", () => {
    const points = [
      { id: 1, x: 10, y: 20, color: "#378ADD" },
      { id: 2, x: 30, y: 40, color: "#1D9E75" },
    ];

    const { container } = render(
      <Canvas
        canvasRef={{ current: document.createElement("div") }}
        points={points}
        onClick={() => {}}
      />
    );

    // each point renders as a div.point child inside the canvas div
    const dots = container.querySelectorAll('[style*="background"]');
    expect(dots.length).toBe(2);
  });
});