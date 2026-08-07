import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FileUpload } from "../FileUpload";

describe("FileUpload Component", () => {
  it("renders correctly", () => {
    render(<FileUpload label="Test Upload" />);
    expect(screen.getByText("Test Upload")).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop files or/i)).toBeInTheDocument();
  });
});
