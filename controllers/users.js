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
    .populate('trips')
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function userUpdate(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(user => res.status(200).json(user))
    .catch(next);
}

function userDelete(req, res, next) {
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204).end())
    .catch(next);
}

module.exports = {
  index: userIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete
};
