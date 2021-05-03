import { useEffect, useState } from "react";
import ConfigService from "../api/ConfigService";
import { RangeField } from "../components/SettingsPage/RangeField";
import Alert from '../components/commons/Alert';
import styles from './SettingsPage.module.css';

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 5;


const SettingsPage = () => {

  const [message, setMessage] = useState("");
  const [scrollSensitivity, setScrollSensitivity] = useState<number>(0);
  const [mouseSensitivity, setMouseSensitivity] = useState<number>(0);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const settings = await ConfigService.getConfig();
        if (settings) {
          setScrollSensitivity(settings.scrollSensitivity);
          setMouseSensitivity(settings.mouseSensitivity);
        }
      } catch (e) {
        setMessage("Couldn't retrieve settings from device.");
      }
    }

    fetchConfig();
  }, []);

  const onChangeScroll = (e: any) => {
    setScrollSensitivity(parseFloat(e.target.value));
  }

  const onChangeMouse = (e: any) => {
    setMouseSensitivity(parseFloat(e.target.value));
  }

  const saveSettings = () => {
    ConfigService.saveConfig({ mouseSensitivity, scrollSensitivity });
  }

  return (
    <article >
      <section>
        <a href="/">Back</a>
        <h1>Settings</h1>
      </section>
      <section className={styles.settingsSection}>
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
        <button className={styles.saveButton} onClick={saveSettings}>Save</button>
        {message && <Alert type="error">{message}</Alert>}
      </section>
    </article>
  );
};

export default SettingsPage;
