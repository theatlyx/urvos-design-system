import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MultiSelect } from "../MultiSelect";

describe("MultiSelect Component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  it("renders correctly", () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows selected items", () => {
    render(<MultiSelect options={options} selected={["1"]} onChange={() => {}} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });
});
