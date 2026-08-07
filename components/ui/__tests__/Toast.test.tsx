import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toast, ToastProvider, ToastViewport, ToastTitle } from "../Toast";

describe("Toast Component", () => {
  it("renders correctly", () => {
    render(
      <ToastProvider>
        <Toast>
          <ToastTitle>Test Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText("Test Toast Title")).toBeInTheDocument();
  });
});
