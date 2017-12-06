const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const User = require('../models/user');

const userData = [{
  image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
  username: 'Sar',
  firstName: 'Sarah',
  lastName: 'Alpay',
  email: 'sarah@sarah.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
  username: 'Dan',
  firstName: 'Daniel',
  lastName: 'Alpay',
  email: 'dan@dan.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    console.log(`${users.length} users created!`);
    const user = users[0];
    user.messages = [{
      createdBy: user.id,
      content: 'Hello',
      replies: [{
        createdBy: users[1].id,
        content: 'Bye'
      }]
    }];

    return user.save();
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
