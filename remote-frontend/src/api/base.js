import { getConfig } from "../config";

const { apiSchema, apiHost, apiPort } = getConfig();

export let apiUrl = "";
if (apiSchema && apiHost && apiPort) {
  apiUrl = `${apiSchema}://${apiHost}:${apiPort}`;
}

export const isErrorResponse = (resp) => {
  return resp.status >= 400;
};
