import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stepper } from "../Stepper";

describe("Stepper Component", () => {
  it("renders correctly with steps", () => {
    const steps = [
      { id: "1", title: "First Step" },
      { id: "2", title: "Second Step" },
    ];
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText("First Step")).toBeInTheDocument();
    expect(screen.getByText("Second Step")).toBeInTheDocument();
  });
});
