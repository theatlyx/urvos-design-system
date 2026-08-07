import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MedicationList } from "../MedicationList";

describe("MedicationList Component", () => {
  it("renders empty state correctly", () => {
    render(<MedicationList medications={[]} />);
    expect(screen.getByText("No active medications found.")).toBeInTheDocument();
  });

  it("renders list of medications", () => {
    render(
      <MedicationList 
        medications={[{ 
          resourceType: "MedicationRequest", 
          intent: "order",
          status: "active",
          subject: { reference: "Patient/123" },
          medicationCodeableConcept: { text: "Aspirin 81mg" },
          dosageInstruction: [{ text: "Take daily" }]
        }]} 
      />
    );
    
    expect(screen.getByText("Aspirin 81mg")).toBeInTheDocument();
    expect(screen.getByText("Take daily")).toBeInTheDocument();
  });
});
