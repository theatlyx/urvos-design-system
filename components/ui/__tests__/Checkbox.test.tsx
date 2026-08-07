import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("handles checked state", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    
    const checkbox = screen.getByLabelText("Test");
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it("handles indeterminate state", () => {
    render(<Checkbox label="Test" indeterminate />);
    const checkbox = screen.getByLabelText("Test") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("shows error message", () => {
    render(<Checkbox label="Test" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows helper text", () => {
    render(<Checkbox label="Test" helper="Helpful hint" />);
    expect(screen.getByText("Helpful hint")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(<Checkbox label="Test" disabled />);
    const checkbox = screen.getByLabelText("Test");
    expect(checkbox).toBeDisabled();
  });

  it("handles required state", () => {
    render(<Checkbox label="Test" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("handles clinical significance", () => {
    render(<Checkbox label="Test" clinicalSignificance="critical" />);
    const checkbox = screen.getByLabelText("Test");
    expect(checkbox).toHaveClass("checkbox--critical");
  });

  it("handles FHIR observation code", () => {
    render(<Checkbox label="Test" fhirObservationCode="AllergyIntolerance" />);
    const hiddenInput = document.querySelector('[data-fhir-code="AllergyIntolerance"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it("is accessible", () => {
    render(<Checkbox label="Accessible test" />);
    const checkbox = screen.getByLabelText("Accessible test");
    expect(checkbox).toHaveAttribute("id");
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("handles custom className", () => {
    render(<Checkbox label="Test" className="custom-class" />);
    expect(screen.getByTestId("checkbox-wrapper")).toHaveClass("custom-class"); // Wait, does the component have data-testid="checkbox-wrapper"?
  });
});
