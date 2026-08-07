import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from "../Drawer";

describe("Drawer Component", () => {
  it("renders correctly", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });
});
