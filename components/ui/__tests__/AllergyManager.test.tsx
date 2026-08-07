import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AllergyManager } from "../AllergyManager";

describe("AllergyManager Component", () => {
  it("renders empty state correctly", () => {
    render(<AllergyManager allergies={[]} />);
    expect(screen.getByText("No known allergies recorded.")).toBeInTheDocument();
  });

  it("renders list and handles add/remove", () => {
    const onAdd = vi.fn();
    const onRemove = vi.fn();
    
    render(
      <AllergyManager 
        allergies={[{ resourceType: "AllergyIntolerance", id: "1", code: { text: "Peanuts" } }]} 
        onAddAllergy={onAdd}
        onRemoveAllergy={onRemove}
      />
    );
    
    expect(screen.getByText("Peanuts")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText("Add"));
    expect(onAdd).toHaveBeenCalled();
    
    // The button has aria-label "Remove allergy" or icon child
    const removeBtn = screen.getByRole("button", { name: "Remove allergy" });
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith("1");
  });
});
