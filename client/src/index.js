import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './reduxx/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="500901581894-0e8iavh60vme7uio9atabk2iumgn4c9j.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
