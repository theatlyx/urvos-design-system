import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EncounterForm } from "../EncounterForm";

describe("EncounterForm Component", () => {
  it("renders form fields and handles submission", () => {
    const handleSubmit = vi.fn();
    render(<EncounterForm onSubmitEncounter={handleSubmit} />);
    
    expect(screen.getByLabelText("Chief Complaint")).toBeInTheDocument();
    
    const submitBtn = screen.getByText("Sign & Save Encounter");
    fireEvent.click(submitBtn);
    
    expect(handleSubmit).toHaveBeenCalled();
  });
});
