const router = require('express').Router();
const auth = require('../controllers/auth'); //need to create an auth file in controllers
// const secureRoute = require('../lib/secureRoute'); //haven't put in secureRoute yet on my paths.
const users = require('../controllers/users');

//INDEX
router.route('/users')
  .get(users.index);
//CREATE
//SHOW
//UPDATE
//DELETE

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
