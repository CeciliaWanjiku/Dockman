const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: "welcome to the user api",
    }));

    app.post('/api/user', userController.create);
    app.post('/api/login', userController.login);
    app.get('/api/user', userController.list);
    app.get('/api/user/:userId', userController.findOneUser);
    app.delete('/api/users/:userId', userController.delete);

};
