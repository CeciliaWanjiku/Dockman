const userController = require('../controllers').user;
const documentController = require('../controllers').document;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the user api',
  }));
    // login//

    // middware (req,res)


  app.post('/api/users', userController.create);
  app.post('/api/users/login', userController.login);
  app.get('/api/users/:userId', userController.findOneUser);
  app.delete('/api/users/:userId', userController.delete);
  app.put('/api/users/:userId', userController.UpdateUser);
  app.get('/api/users/', userController.paginatedUsers);
  app.get('/api/search/users/', userController.searchUser);
  // documents routes
  app.post('/api/documents', documentController.create);
  app.get('/api/documents/', documentController.FindDocument);
  app.get('/api/documents/:documentId', documentController.FindOneDocument);
  app.get('/api/search/documents/:name', documentController.searchDocument);
  app.delete('/api/documents/:documentId', documentController.delete);

};
