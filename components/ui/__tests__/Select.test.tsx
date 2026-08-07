import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../Select";

describe("Select Component", () => {
  it("renders correctly", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });
});
