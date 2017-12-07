const router = require('express').Router();
const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute'); //haven't put in secureRoute yet on my paths.
const users = require('../controllers/users');
const trips = require('../controllers/trips');

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


//INDEX AND NEW for Trips
router.route('/trips')
  .get(trips.index)
  .post(trips.create);

//SHOW //UPDATE //DELETE for Trips
router.route('/trips/:id')
  .get(trips.show)
  .put(trips.update)
  .delete(trips.delete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
