import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimePicker } from "../TimePicker";

describe("TimePicker Component", () => {
  it("renders correctly", () => {
    render(<TimePicker />);
    // Testing the default layout presence, like the hours/minutes/seconds labels
    expect(screen.getByText("Hours")).toBeInTheDocument();
  });
});
