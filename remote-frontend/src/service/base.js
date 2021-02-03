import { getConfig } from "../config";

const { apiSchema, apiHost, apiPort } = getConfig();
export const apiUrl = `${apiSchema}://${apiHost}:${apiPort}`;
