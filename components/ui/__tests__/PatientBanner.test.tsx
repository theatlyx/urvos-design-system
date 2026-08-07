import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PatientBanner } from "../PatientBanner";
import type { Patient } from "@medplum/fhirtypes";

describe("PatientBanner Component", () => {
  it("renders correctly with patient data", () => {
    const mockPatient: Patient = {
      resourceType: "Patient",
      name: [{ given: ["John"], family: "Smith" }],
      birthDate: "1990-01-01",
      gender: "male"
    };

    render(<PatientBanner patient={mockPatient} />);
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Male", { exact: false })).toBeInTheDocument();
  });
});
