import {apiUrl, isErrorResponse} from './base';

const ConfigService = {
    saveConfig: async (settings) => {
        const response = await fetch(apiUrl + "/api/config", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: settings,
          });

          if (isErrorResponse(response)) {
              return Promise.reject();
          }
    },

    getConfig: async () => {
        const response = await fetch(`${apiUrl}/api/config`);

        if (isErrorResponse(response)) {
            return Promise.reject();
        }

        return response.json();
    }
}

export default ConfigService;