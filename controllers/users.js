const User = require('../models/user');

function userIndex(req, res, next) {

  User
    .find()
    .populate([{
      path: 'messages.createdBy',
      select: 'username image'
    }, {
      path: 'messages'
    }, {
      path: 'messages.replies.createdBy',
      select: 'username image'
    }])
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function userShow(req, res, next) {

  User
    .findById(req.params.id)
    .fill('trips')
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function userUpdate(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function userDelete(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}


function userDocumentCreate(req, res, next) {

  if(req.file) {
    req.body.filename = req.file.filename;
    req.body.fileType = req.file.type;
  }

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();

      user.documents.push(req.body);
      return user.save();
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

function tripDocumentDelete(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user.documents.pull(req.params.documentId);

      return user.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: userIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete,
  createDocument: userDocumentCreate,
  deleteDocument: tripDocumentDelete
};
