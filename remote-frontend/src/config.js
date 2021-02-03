export const getConfig = () => {
  return {
    apiSchema: process.env.REACT_APP_API_SCHEMA,
    apiPort: process.env.REACT_APP_API_PORT,
    apiHost: process.env.REACT_APP_API_HOST,
  };
};
