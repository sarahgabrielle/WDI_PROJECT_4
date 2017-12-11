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
    }, {
      path: 'trips'
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

module.exports = {
  index: userIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete
};
