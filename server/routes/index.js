const userController = require('../controllers').user;
const documentController = require('../controllers').document;
const authenticate = require('../middleware/authenticate');
const restbac = require('rest-bac');

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.post('/api/users/login', userController.login);
  // app.use('/api', authenticate.token);
  app.get('/api/users/:userId', userController.findOneUser);
  app.get('/users/:userId/documents', userController.userDocuments);
  app.delete('/api/users/:userId', userController.delete);
  app.put('/api/users/:userId', userController.UpdateUser);
  app.get('/api/users/', userController.paginatedUsers);
  app.get('/api/search/users/', userController.searchUser);
  // documents routes
  app.post('/api/documents', documentController.create);
  app.get('/api/documents/', documentController.FindDocument);
  app.get('/api/documents/:documentId', documentController.FindOneDocument);
  app.get('/api/search/documents', documentController.searchDocument);
  app.delete('/api/documents/:documentId', documentController.delete);
  app.put('/api/documents/:documentId', documentController.UpdateDocument);
};
