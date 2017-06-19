import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/home/homePage.jsx';
import AboutPage from './components/about/aboutPage.jsx';
import DocumentsPage from './components/document/documentsPage.jsx';
import ManageDocumentPage from './components/document/manageDocumentPage.jsx';
import ViewDocumentPage from './components/document/viewDocumentPage.jsx';
import DocumentForm from './components/document/documentForm.jsx';
import UsersPage from './components/user/usersPage.jsx';
import ManageUserPage from './components/user/manageUserPage.jsx';
import UserForm from './components/user/userForm.jsx';
import LogInPage from './components/user/userLogin.jsx';
import UserDocumentsPage from './components/document/userDocumentsPage.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="document" component={DocumentsPage} />
    <Route path="document/userdocuments" component={UserDocumentsPage} />
    <Route path="document/:id" component={ManageDocumentPage} />
    <Route path="document/view/:id" component={ViewDocumentPage} />
    <Route path="document/create" component={DocumentForm} />
    <Route path="user" component={UsersPage} />
    <Route path="user/:id" component={ManageUserPage} />
    <Route path="user/create" component={UserForm} />
    <Route path="userLogin" component={LogInPage} />

  </Route>
);
