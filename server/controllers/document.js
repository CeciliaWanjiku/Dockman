const db = require('../models');
const jwt = require('jsonwebtoken');

const Document = db.Document;
const User = db.User;

module.exports = {
  create(req, res) {
    const decoded = jwt.verify(req.headers['access-token'], process.env.SECRET_KEY);
    const data = {
      name: req.body.name,
      content: req.body.content,
      category: req.body.category,
      userId: decoded.data.id
    };

    if (req.body.category === 'role-based') {
      data.role_type = decoded.data.role_type;
    }

    Document.create(data)
    .then(document => res.status(201).send(document))
    .catch(error => res.status(400).send(error));
  },
  FindDocument(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then((response) => {
        let count;
        Document.count().then((totalCount) => {
          count = totalCount;
          console.log('>>>>>>>>>>.');
          return res.status(200).send({ data: response, count });
        });
      })
      .catch(error => res.status(400).send(error));
    }
    return Document
      .all()
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },
  FindOneDocument(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'Document Not Found',

          });
        }
        return res.status(200).send(resp);
      })
      .catch(error => res.status(400).send(error));
  },
  searchDocument(req, res) {
    if (req.query.q) {
      return Document.findAll({
        where: {
          name: { $iLike: `%${req.query.q}%` },
          $or: {
            userId: req.params.userId,
            role_type: req.query.role_type,
            category: { $iLike: 'public' }
          }

        }

      })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
  },
  UpdateDocument(req, res) {
    Document.findById(req.params.documentId, {
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return document
        .update({
          name: req.body.name || document.name,
          content: req.body.content || document.content,
          category: req.body.category || document.category,
          role_type: req.body.role_type || document.role_type

        })
        .then(() => res.status(200).send(document))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    Document.findById(req.params.documentId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        resp.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  FindPublicDocuments(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          category: { $iLike: 'public' }
        }
      })
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'Documents Not Found',

          });
        }
        let count;
        Document.count({ where: {
          category: { $iLike: 'public' }
        } }).then((totalCount) => {
          count = totalCount;
          return res.status(200).send({ data: resp, count });
        });
      })
      .catch(error => res.status(400).send(error));
    }
  },
  userDocuments(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          $or: {
            userId: req.params.userId,
            role_type: req.query.role_type
          }
        }
      })
      .then((resp) => {
        let count;
        Document.count({
          where: {
            $or: {
              userId: req.params.userId,
              role_type: req.query.role_type
            }
          }
        }).then((totalCount) => {
          count = totalCount;
          return res.status(200).send({ data: resp, count });
        });
      })
      .catch(error => res.status(400).send(error));
    }
  }

};
