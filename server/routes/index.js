const userController = require('../controllers').user;
const documentController = require('../controllers').document;
const authenticate = require('../middleware/authenticate');
const restbac = require('rest-bac');
const roles = require('../config/roles.json');

module.exports = (app) => {
  app.get('/api/documents/public', documentController.FindPublicDocuments);
  app.post('/api/users', userController.create);
  app.post('/api/users/login', userController.login);
  app.post('/api/users/logout', userController.logout);
  app.get('/api/search/documents', documentController.searchDocument);
  app.get('/api/search/users/', userController.searchUser);
  app.use('/api', authenticate.token);
  restbac(app, roles, '/api');
  app.get('/api/users/:userId', userController.findOneUser);
  app.delete('/api/users/:userId', userController.delete);
  app.put('/api/users/:userId', userController.UpdateUser);
  app.get('/api/users/', userController.paginatedUsers);
  app.get('/api/search/users/', userController.searchUser);
  // documents routes
  app.post('/api/documents', documentController.create);
  app.get('/users/:userId/documents', documentController.userDocuments);
  app.get('/api/documents/', documentController.FindDocument);
  app.get('/api/documents/:documentId', documentController.FindOneDocument);
  app.delete('/api/documents/:documentId', documentController.delete);
  app.put('/api/documents/:documentId', documentController.UpdateDocument);
  // Error handler
  app.use((err, req, res, next) => {
    // rest-bac authorization error propagate an Error object with a 401 status code
    res.status(err.status || 500)
      .json({
        message: err.message
      });
  });
};
