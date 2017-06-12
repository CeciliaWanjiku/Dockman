import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore.js';
import { loadDocuments } from './actions/documentActions.js';
import Route from './routes.jsx';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadDocuments());


render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Route} />
  </Provider>,
    document.getElementById('app')
);

