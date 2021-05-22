import { apiUrl, isErrorResponse } from "./base";
import { Settings } from "./types";

const SettingsService = {
  saveSettings: async (settings: Settings) => {
    const response = await fetch(apiUrl + "/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (isErrorResponse(response)) {
      return Promise.reject();
    }
  },

  getSettings: async (): Promise<Settings> => {
    const response = await fetch(`${apiUrl}/api/settings`);

    if (isErrorResponse(response)) {
      return Promise.reject();
    }

    return response.json();
  },
};

export default SettingsService;
