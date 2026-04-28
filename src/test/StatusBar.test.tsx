import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusBar from "../components/StatusBar";

describe("StatusBar", () => {
  it("displays all counts", () => {
    render(<StatusBar points={3} history={4} future={2} />);

    expect(screen.getByText(/points on canvas:\s*3/i)).toBeInTheDocument();
    expect(screen.getByText(/history states:\s*4/i)).toBeInTheDocument();
    expect(screen.getByText(/future states:\s*2/i)).toBeInTheDocument();
  });

  it("shows zeros when nothing added", () => {
    render(<StatusBar points={0} history={1} future={0} />);

    expect(screen.getByText(/points on canvas:\s*0/i)).toBeInTheDocument();
    expect(screen.getByText(/future states:\s*0/i)).toBeInTheDocument();
  });
});
