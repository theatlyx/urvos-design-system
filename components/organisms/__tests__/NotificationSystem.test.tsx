import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NotificationProvider, NotificationCenter, NotificationSettings } from "../NotificationSystem";

describe("NotificationSystem", () => {
  it("renders NotificationCenter with notifications", () => {
    const mockNotifs = [
      { id: "1", title: "Test Notif", message: "Test Message", type: "info" as const, createdAt: new Date(), read: false }
    ];
    
    render(
      <NotificationProvider initialNotifications={mockNotifs}>
        <NotificationCenter />
      </NotificationProvider>
    );

    expect(screen.getByText("Test Notif")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByText("You have 1 unread messages.")).toBeInTheDocument();
  });

  it("renders NotificationSettings", () => {
    render(<NotificationSettings />);
    expect(screen.getByText("Notification Preferences")).toBeInTheDocument();
    expect(screen.getByText("Push Notifications")).toBeInTheDocument();
  });
});
