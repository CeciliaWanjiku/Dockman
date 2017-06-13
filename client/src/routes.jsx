import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/home/homePage.jsx';
import AboutPage from './components/about/aboutPage.jsx';
import DocumentsPage from './components/document/documentsPage.jsx';
import ManageDocumentPage from './components/document/manageDocumentPage.jsx';
import DocumentForm from './components/document/documentForm.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="document" component={DocumentsPage} />
    <Route path="document/:id" component={ManageDocumentPage} />
    <Route path="document/create" component={DocumentForm} />
  </Route>
);
