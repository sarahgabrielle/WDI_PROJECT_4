const User = require('../models/user');

function userIndex(req, res, next) {
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

module.exports = {
  index: userIndex
};
