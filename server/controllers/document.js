const db = require('../models');


const Document = db.Document;
const User = db.User;

module.exports = {
  create(req, res) {
    Document.create({
      name: req.body.name,
      content: req.body.content,
      category: req.body.category,
      userId: req.body.userId
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },
  FindDocument(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
    return Document
      .all()
      .then(resp => res.status(201).send(resp))
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
          name: { $iLike: `%${req.query.q}%` }
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
          category: req.body.category || document.category

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
          .then(() => res.status(200).send({ message: 'Document deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
