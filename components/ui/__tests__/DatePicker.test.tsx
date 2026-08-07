import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatePicker } from "../DatePicker";

describe("DatePicker Component", () => {
  it("renders correctly with placeholder", () => {
    render(<DatePicker />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });
});
