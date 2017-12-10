const router = require('express').Router();
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const trips = require('../controllers/trips');
// const imageUpload = require('../lib/imageUpload');

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
  .post(secureRoute, trips.create);

//SHOW //UPDATE //DELETE for Trips
router.route('/trips/:id')
  .get(trips.show)
  .put(trips.update)
  .delete(trips.delete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
