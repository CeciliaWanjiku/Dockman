const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;


// const secretKey = 'sec';
const saltRounds = 10;

const user = db.User;
const Document = db.Document;
module.exports = {
  // create a new user
  create(req, res) {
    // checks if email and password have been provided
    if (!req.body.email && !req.body.password) {
      res.json({ success: false, msg: 'Please add an email and password.' });
      // Check that the correct email format is entered
    } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
      return res.status(401).json({ message: 'Please enter a valid email format' });
    } else {
      user.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role || 'user',
        role_type: req.body.role_type,
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
      user
        .findOne({ where: { email: req.body.email } })
        .then((response) => {
          if (!response) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          // console.log('LOGIN', response.dataValues);
          const passwordValid = bcrypt.compareSync(req.body.password, response.password);
          if (passwordValid) {
            const token = jwt.sign({ data: { id: response.id, name: response.name, role: response.role, role_type: response.role_type } }, secretKey, { expiresIn: 60 * 60 });
            return res.status(200).json(Object.assign({}, { id: response.id, email: req.body.email, name: req.body.name }, { token }));
            // return token
          }
          // return error: Password is incorrect
          return res.status(401).json({
            message: 'Invalid password'
          });
        })
        .catch(err => console.log(err));
    }
  },
  logout(req, res) {

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
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  paginatedUsers(req, res) {
    if (req.query.limit || req.query.offset) {
      return user.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then((response) => {
        let count;
        user.count().then((totalCount) => {
          count = totalCount;
          return res.status(200).send({ data: response, count });
        });
      })

      .catch(error => res.status(400).send(error));
    }
    return user.all({
      include: [{
        model: Document,
        as: 'documents',

      }] })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },
  findOneUser(req, res) {
    return user
      .findById(req.params.userId, {
        include: [{
          model: Document,
          as: 'documents'
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
    user.findById(req.params.userId, {
      include: [{
        model: Document,
        as: 'documents',
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
          role_type: req.body.role_type,
          password: req.body.password || user.password
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

