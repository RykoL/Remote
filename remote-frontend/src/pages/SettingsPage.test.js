import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConfigService from "../api/ConfigService";
import SettingsPage, {SLIDER_MIN, SLIDER_MAX} from "./SettingsPage";


jest.mock("../api/ConfigService");


describe("settings page", () => {

  const settings = {
    scrollSensitivity: 1,      
    mouseSensitivity: 1,
  };

  test("should render a back link", () => {
    render(<SettingsPage />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Back");
  });

  test.only("should retrieve initial config values from api", async () => {
    
    ConfigService.getConfig.mockResolvedValue(settings);

    render(<SettingsPage />);

    waitFor(ConfigService.getConfig);

    expect(await screen.getByLabelText(/Mouse sensitivity/i).value).toBe("1");
    expect(await screen.getByLabelText(/Scroll sensitivity/i).value).toBe("1");
  });

  test("should save the user applied settings", () => {

    render(<SettingsPage />);

    fireEvent.change(screen.getByLabelText(/Scroll sensitivity/i), {target: {value: "0.7"}})
    fireEvent.change(screen.getByLabelText(/Mouse sensitivity/i), {target: {value: "0.3"}})
    fireEvent.click(screen.getByRole("button"), {button: 0});

    const expected = {
      scrollSensitivity: 0.7,      
      mouseSensitivity: 0.3,
    };

    expect(ConfigService.saveConfig).toHaveBeenCalledWith(expected);
  });

  describe("Scroll sensitivity slider" , () => {
    test("should have a slider for scroll sensitivity with a max value of 5", () => {
      render(<SettingsPage />);
  
      expect(screen.getByLabelText(/Scroll sensitivity/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Scroll sensitivity/i).max).toBe(SLIDER_MAX.toString());
    });
  
    test("should set the scroll sensitivity when slider is moved", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Scroll sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "0.5"}});
  
      expect(scrollSlider.value).toBe("0.5");
    });
  
    test("should not set the scroll value over max", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Scroll sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "200"}});
  
      expect(scrollSlider.value).toBe(SLIDER_MAX.toString());
    });
  
    test("should not set the scroll value below 0", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Scroll sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "-200"}});
  
      expect(scrollSlider.value).toBe("0");
    });
  });

  describe("Mouse sensitivity slider" , () => {
    test("should have a slider for mouse sensitivity with a max value of 5", () => {
      render(<SettingsPage />);
  
      expect(screen.getByLabelText(/Mouse sensitivity/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Mouse sensitivity/i).max).toBe(SLIDER_MAX.toString());
    });
  
    test("should set the mouse sensitivity when slider is moved", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Mouse sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "0.5"}});
  
      expect(scrollSlider.value).toBe("0.5");
    });
  
    test("should not set the mouse value over max", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Mouse sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "200"}});
  
      expect(scrollSlider.value).toBe(SLIDER_MAX.toString());
    });
  
    test("should not set the mouse value below 0", () => {
      render(<SettingsPage />);
  
      const scrollSlider = screen.getByLabelText(/Mouse sensitivity/i);
      fireEvent.change(scrollSlider, {target: {value: "-200"}});
  
      expect(scrollSlider.value).toBe("0");
    });
  });
});
