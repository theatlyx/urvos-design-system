import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../Textarea";

describe("Textarea Component", () => {
  it("renders correctly", () => {
    render(<Textarea placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  it("can be typed in", () => {
    render(<Textarea placeholder="Test" />);
    const textarea = screen.getByPlaceholderText("Test");
    
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    expect(textarea).toHaveValue("Hello world");
  });

  it("can be disabled", () => {
    render(<Textarea disabled placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeDisabled();
  });

  it("applies state classes correctly", () => {
    render(<Textarea state="error" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("data-state", "error");
  });
});
