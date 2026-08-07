import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ObservationTrend } from "../ObservationTrend";

describe("ObservationTrend Component", () => {
  it("renders empty state correctly", () => {
    render(<ObservationTrend title="Heart Rate" observations={[]} />);
    expect(screen.getByText("Heart Rate")).toBeInTheDocument();
    expect(screen.getByText("No data available for trend")).toBeInTheDocument();
  });

  // Note: Recharts relies on ResizeObserver which isn't available in standard jsdom without polyfills.
  // We just test basic rendering to ensure no crashes.
  it("renders with data without crashing", () => {
    const { container } = render(
      <ObservationTrend 
        title="Weight" 
        observations={[{ 
          resourceType: "Observation", 
          status: "final",
          code: { text: "Weight" },
          effectiveDateTime: "2023-01-01T10:00:00Z",
          valueQuantity: { value: 75, unit: "kg" }
        }]} 
      />
    );
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });
});
