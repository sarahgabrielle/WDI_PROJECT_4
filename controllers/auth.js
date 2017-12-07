const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24hr' });
      return res.json({ message: 'Registration successful', token });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ $or: [{ email: req.body.identifier }, { username: req.body.identifier }] })
    .then((user) => {
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(422).json({
          message: 'Unprocessable Entity',
          errors: {
            identifier: 'Invalid username/email address',
            password: 'Invalid password'
          }
        });
      }

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24hr' });
      return res.json({ message: `Welcome back ${user.username}`, token });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
