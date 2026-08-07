import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClinicalFlowsheet } from "../ClinicalFlowsheet";
import type { Observation } from "@medplum/fhirtypes";

describe("ClinicalFlowsheet Component", () => {
  it("renders correctly with observation data", () => {
    const timepoint = new Date("2023-01-01T12:00:00Z");
    const mockObservations: Observation[] = [
      {
        resourceType: "Observation",
        status: "final",
        code: { coding: [{ code: "8867-4", display: "Heart rate" }] },
        effectiveDateTime: "2023-01-01T12:00:00Z",
        valueQuantity: { value: 72, unit: "beats/min" }
      }
    ];

    render(
      <ClinicalFlowsheet 
        observations={mockObservations} 
        timepoints={[timepoint]} 
        codes={[{ code: "8867-4", display: "Heart Rate" }]} 
      />
    );
    expect(screen.getByText("Heart Rate")).toBeInTheDocument();
    expect(screen.getByText("72 beats/min")).toBeInTheDocument();
  });
});
