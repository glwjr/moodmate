/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';

const app = createRoot(document.querySelector('#app'));

app.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
);
