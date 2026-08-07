import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <Drawer>
      <DrawerTrigger className="btn btn--primary btn--md">Open Drawer</DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Manage your preferences here.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-6">
          <p>Drawer content goes here...</p>
        </div>
        <DrawerFooter>
          <DrawerClose className="btn btn--secondary btn--md w-full">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
