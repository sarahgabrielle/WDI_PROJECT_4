const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24hr' });
      res.json({ message: 'Registration successful', token });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24hr' });
      return res.json({ message: `Welcome back ${user.username}`, token });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
