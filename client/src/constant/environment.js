export const backendAPI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000';

export const googleClientId =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_OAUTH_CLIENT_ID
    : process.env.REACT_APP_OAUTH_CLIENT_ID;
