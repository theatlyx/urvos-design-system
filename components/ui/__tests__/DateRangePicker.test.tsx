import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateRangePicker } from "../DateRangePicker";

describe("DateRangePicker Component", () => {
  it("renders correctly with placeholder", () => {
    render(<DateRangePicker />);
    expect(screen.getByText("Pick a date range")).toBeInTheDocument();
  });
});
