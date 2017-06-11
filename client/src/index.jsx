import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Route from './routes.jsx';
import './styles/styles.css';

const store = configureStore();


render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Route} />
  </Provider>,
    document.getElementById('app')
);

