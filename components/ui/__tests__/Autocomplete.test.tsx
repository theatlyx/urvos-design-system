import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Autocomplete } from "../Autocomplete";

describe("Autocomplete Component", () => {
  const options = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
  ];

  it("renders correctly", () => {
    render(<Autocomplete options={options} value="" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows selected item", () => {
    render(<Autocomplete options={options} value="A" onChange={() => {}} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });
});
