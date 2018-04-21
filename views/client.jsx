import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import store from './store/store.js';
import { toAuthForm } from './actions/actions.js';

const root = document.getElementById('root');

ReactDOM.hydrate(
  <Provider store={store} >
    <App />
  </Provider>, 
  root
);