const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Trip = require('../models/trip');

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User
    .create([{
      image: '',
      username: 'Sar',
      firstName: 'Sarah',
      lastName: 'Alpay',
      email: 'sarah@sarah.com',
      password: 'password',
      passwordConfirmation: 'password'
    }, {
      image: '',
      username: 'Dan',
      firstName: 'Daniel',
      lastName: 'Alpay',
      email: 'dan@dan.com',
      password: 'password',
      passwordConfirmation: 'password'
    }]))
  .then(users => {
    console.log(`${users.length} users created`);

    return Trip
      .create([{
        country: 'France',
        resort: 'Chamonix',
        date: '2018-02-14',
        address: 'Rue Montagne',
        createdBy: users[1],
        users: users
      }]);
  })
  .then(trips => console.log(`${trips.length} trips created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
