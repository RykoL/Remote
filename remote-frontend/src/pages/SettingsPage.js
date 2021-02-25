import { useEffect, useState } from "react";
import ConfigService from "../api/ConfigService";
import { RangeField } from "../components/SettingsPage/RangeField";
import Alert from '../components/commons/Alert';
import './SettingsPage.css';

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 5;


const SettingsPage = () => {

  const [message, setMessage] = useState("");
  const [scrollSensitivity, setScrollSensitivity] = useState(0);
  const [mouseSensitivity, setMouseSensitivity] = useState(0);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const settings = await ConfigService.getConfig();
        if (settings) {
          setScrollSensitivity(settings.scrollSensitivity.toString());
          setMouseSensitivity(settings.mouseSensitivity.toString());
        }
      } catch (e) {
        setMessage("Couldn't retrieve settings from device.");
      }
    }

    fetchConfig();
  }, []);

  const onChangeScroll = (e) => {
    setScrollSensitivity(parseFloat(e.target.value));
  }

  const onChangeMouse = (e) => {
    setMouseSensitivity(parseFloat(e.target.value));
  }

  const saveSettings = () => {
    ConfigService.saveConfig({ mouseSensitivity, scrollSensitivity });
  }

  return (
    <main>
      <a href="/">Back</a>
      <h1>Settings</h1>
      <section id="settings-form">
        <RangeField
          label="Mouse sensitivity"
          onValueChange={onChangeMouse}
          value={mouseSensitivity}
          minimum={SLIDER_MIN}
          maximum={SLIDER_MAX}
        />
        <RangeField
          label="Scroll sensitivity"
          onValueChange={onChangeScroll}
          value={scrollSensitivity}
          minimum={SLIDER_MIN}
          maximum={SLIDER_MAX}
        />
        <button onClick={saveSettings}>Save</button>
        <Alert type="error">{message}</Alert>
      </section>
    </main>
  );
};

export default SettingsPage;
