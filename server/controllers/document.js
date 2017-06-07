const db = require('../models');


const document = db.Document;

module.exports = {
  create(req, res) {
    document.create({
      name: req.body.name,
      content: req.body.content,
      userId: req.body.userId
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },
  FindDocument(req, res) {
    return document
      .all()
      .then(resp => res.status(201).send(resp))
      .catch(error => res.status(400).send(error));
  },
  FindOneDocument(req, res) {
    if (req.query.limit || req.query.offset) {
      return document.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
    return document
      .findById(req.params.documentId, {
        include: [{
          model: document,
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
  searchDocument(req, res) {
    if (req.query.name) {
      return document.findAll({
        where: {
          $or: [
            { name: { $like: `%${req.query.name}%` } }
          ]
        }
      })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
    }
  },
  delete(req, res) {
    document.findById(req.params.documentId)
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
