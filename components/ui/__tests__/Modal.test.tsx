import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalDescription } from "../Modal";

describe("Modal Component", () => {
  it("renders correctly", () => {
    render(
      <Modal>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>Test Title</ModalTitle>
          <ModalDescription>Test Description</ModalDescription>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});
