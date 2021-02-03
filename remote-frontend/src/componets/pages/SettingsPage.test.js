import { render, screen } from "@testing-library/react";
import SettingsPage from "./SettingsPage";

describe("settings page", () => {
  test("should render a back link", () => {
    render(<SettingsPage />);

    expect(screen.getByRole("link")).toHaveTextContent("Back");
  });

  test("should have a slider for mouse sensitivity", () => {
    render(<SettingsPage />);

    expect(screen.getByLabelText(/Mouse sensitivity/i)).toBeInTheDocument();
  });

  test("should have a slider for mouse sensitivity", () => {
    render(<SettingsPage />);

    expect(screen.getByLabelText(/Scroll sensitivity/i)).toBeInTheDocument();
  });
});
