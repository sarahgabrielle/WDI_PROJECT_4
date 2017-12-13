const router = require('express').Router();
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const trips = require('../controllers/trips');
const fileUpload = require('../lib/fileUpload');
const proxies = require('../controllers/proxies');

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

router.route('/users/:id/documents')
  .post(secureRoute, fileUpload, users.createDocument);
router.route('/users/:id/documents/:documentId')
  .delete(secureRoute, fileUpload, users.deleteDocument);

//INDEX AND NEW for Trips
router.route('/trips')
  .get(trips.index)
  .post(secureRoute, trips.create);

//SHOW //UPDATE //DELETE for Trips
router.route('/trips/:id')
  .get(trips.show)
  .put(trips.update)
  .delete(trips.delete);

router.route('/trips/:id/messages')
  .post(secureRoute, trips.createMessage);
router.route('/trips/:id/messages/:messageId')
  .delete(secureRoute, trips.deleteMessage);


router.route('/trips/:id/memories')
  .post(secureRoute, fileUpload, trips.createMemory);
router.route('/trips/:id/memories/:memoryId')
  .delete(secureRoute, fileUpload, trips.deleteMemory);

router.route('/trips/:id/dashboard/getWeatherdata/:lat/:lng')
  .get(proxies.weather);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
