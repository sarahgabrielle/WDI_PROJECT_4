const router = require('express').Router();
const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute'); //haven't put in secureRoute yet on my paths.
const users = require('../controllers/users');

router.route('/register')
  .post(auth.register);
router.route('/login')
  .post(auth.login);

//INDEX for Users
router.route('/users')
  .get(users.index);

//SHOW //UPDATE //DELETE for Users
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/trips') //this needs to be a trips create 
  .get(trips.new);


router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
