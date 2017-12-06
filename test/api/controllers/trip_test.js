/* globals api, describe, beforeEach, afterEach, it */

require('../helper');
const Trip = require('../../../models/trip');
const User = require('../../../models/user');

describe('Trips', function() {

  let token, user;


  beforeEach(done => {
    Trip.collection.remove();
    User.collection.remove();
    done();
  });

  afterEach(done => {
    Trip.collection.remove();
    User.collection.remove();

    done();
  });


  describe('GET /api/trips', () => {

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          image: 'person',
          username: 'person',
          firstName: 'person',
          lastName: 'person',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          user = res.body.user;
          done();
        });
    });

    beforeEach(done => {
      Trip.create({
        country: 'France',
        resort: 'Courchevel',
        date: '2/14/2017',
        address: 'Hotel Le Hameau de Kashmir',
        memories: '',
        groupMessage: '',
        createdBy: user
      })
        .then(() => done())
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/trips')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });
  });
});
