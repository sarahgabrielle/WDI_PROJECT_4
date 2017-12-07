/* globals api, expect, describe, beforeEach, afterEach, it */
require('../helper');
const User = require('../../../models/user');

describe('Users', function() {

  let token;

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('GET /api/users', () => {

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
          done();
        });
    });

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
        .end(() => {
          done();
        });
    });

    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array of users', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of user objects', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'id',
              'image',
              'username',
              'firstName',
              'lastName',
              'email',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should have properties: _id, image, username, firstName, lastName, email', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const firstUser = res.body[0];
          expect(firstUser)
            .to.have.property('id')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('image')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('username')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('firstName')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('lastName')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('email')
            .and.to.be.a('string');
          done();
        });
    });
  });

  describe('returns multiple users', () => {

    beforeEach(done => {
      User.create([
        {
          image: 'person',
          username: 'person1',
          firstName: 'person1',
          lastName: 'person1',
          email: 'person1@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        },
        {
          image: 'person',
          username: 'person2',
          firstName: 'person2',
          lastName: 'person2',
          email: 'person2@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        }
      ])
        .then(() => done())
        .catch(done);
    });

    it('should create 2 users', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          image: 'person',
          username: 'person',
          firstName: 'person',
          lastName: 'person',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });
    it('should return object with properties: _id, image, username, firstName, lastName, email, createdAt, updatedAt', done => {
      api.get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              '__v',
              '_id',
              'image',
              'username',
              'firstName',
              'lastName',
              'email',
              'passwordHash',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });
  });

  describe('PUT /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          image: 'person',
          username: 'person',
          firstName: 'person',
          lastName: 'person',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should return 200 status', function(done) {
      api
        .put(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          image: 'person',
          username: 'person',
          firstName: 'person',
          lastName: 'person',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .expect(200, done);
    });
    it('should return a JSON object', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });
    it('should return object with properties: _id, image, username, firstName, lastName, email, createdAt, updatedAt', done => {
      api.get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              '__v',
              '_id',
              'image',
              'username',
              'firstName',
              'lastName',
              'email',
              'passwordHash',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });
    it('should return updated data', function(done) {
      api
        .put(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          image: 'person',
          username: 'personperson',
          firstName: 'personperson',
          lastName: 'personperson',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.body.firstName)
            .to.be.eq('personperson');
          done();
        });
    });

  });

  describe('DELETE /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          image: 'person',
          username: 'personperson',
          firstName: 'personperson',
          lastName: 'personperson',
          email: 'person@person.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should remove a user by id', function(done) {
      api
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);

    });
  });
});
