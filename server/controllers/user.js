const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'sec';
const saltRounds = 10;

const user = db.User;
module.exports = {
  // create a new user
  create(req, res) {
    // checks if email and password have been provided
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: 'Please add an email and password.' });
      // Check that the correct email format is entered
    } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
      return res.status(401).json({ message: 'Please enter a valid email format' });
    } else {
      user.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        // role: req.body.role
      })
        .then((resp) => {
          res.json({ success: true, msg: 'Successful created new user.', user: resp });
        })
        .catch(() => {
          res.json({ success: false, msg: 'email already exists.' });
        });
    }
  },
  // login a existing user
  login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: 'Please provide email and password.' });
    } else {
      user.findOne({ where: { email: req.body.email } })
        .then((response) => {
          // console.log('LOGIN', response.dataValues);
          if (bcrypt.compareSync(req.body.password, response.password)) {
            const token = jwt.sign({ data: user.id }, secretKey, {
              expiresIn: 60 * 60
            });
            return res.status(200).json(Object.assign({},
              { id: user.id, email: req.body.email }, { token }));
            // return token
          }
          // return error: Password is incorrect
          return res.status(401).json({
            message: 'Invalid password'
          });
        });
    }
  },
  delete(req, res) {
    user.findById(req.params.userId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        resp.destroy()
          .then(() => res.status(200).send({ message: 'user deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  paginatedUsers(req, res) {
    if (req.query.limit || req.query.offset) {
      return user.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
    return user.all()
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },
  findOneUser(req, res) {
    return user
      .findById(req.params.userId, {
        include: [{
          model: user,
          as: 'users'
        }]
      })
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'user Not Found',

          });
        }
        return res.status(200).send(resp);
      })
      .catch(error => res.status(400).send(error));
  },
  UpdateUser(req, res) {
    return user
    .findById(req.params.userId, {
      include: [{
        model: user,
        as: 'user',
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'user Not Found',
        });
      }
      return user
        .update({
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          password: req.body.password || user.password,

        })
        .then(() => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  searchUser(req, res) {
    if (req.query.q) {
      return user.findAll({
        where: {
          $or: [
            { name: { $like: `%${req.query.q}%` } },
            { email: { $like: `%${req.query.q}%` } }
          ]
        }
      })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
  }
};

