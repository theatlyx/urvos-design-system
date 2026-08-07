import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <Modal>
      <ModalTrigger className="btn btn--primary btn--md">Open Modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you absolutely sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose className="btn btn--secondary btn--md">Cancel</ModalClose>
          <button className="btn btn--danger btn--md">Delete</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
