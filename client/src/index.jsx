import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { loadDocuments } from './actions/documentActions.js';
import { loadUsers } from './actions/userActions.js';
import Route from './routes.jsx';
import './styles/styles.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
injectTapEventPlugin();
const store = configureStore();
// store.dispatch(loadDocuments());
store.dispatch(loadUsers());


render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={Route} />
    </MuiThemeProvider>
  </Provider>,
    document.getElementById('app')
);

