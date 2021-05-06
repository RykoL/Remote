import {apiUrl, isErrorResponse} from './base';
import {Settings} from './types'

const ConfigService = {
    saveConfig: async (settings: Settings) => {
        const response = await fetch(apiUrl + "/api/config", {
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

    getConfig: async (): Promise<Settings> => {
        const response = await fetch(`${apiUrl}/api/config`);

        if (isErrorResponse(response)) {
            return Promise.reject();
        }

        return response.json();
    }
}

export default ConfigService;
