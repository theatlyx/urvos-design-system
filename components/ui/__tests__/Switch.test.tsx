import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "../Switch";

describe("Switch Component", () => {
  it("renders correctly", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("can be toggled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByRole("switch");
    
    expect(switchEl).toHaveAttribute("data-state", "unchecked");
    
    fireEvent.click(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("can be disabled", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("applies size classes correctly", () => {
    render(<Switch size="lg" />);
    expect(screen.getByRole("switch")).toHaveClass("switch--lg");
  });
});
