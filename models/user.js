const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const messageSchema = require('./message');
const documentSchema = require('./document');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  image: { type: String },
  username: { type: String, required: 'Please enter a username', unique: true },
  firstName: { type: String, required: 'Please enter your first name' },
  lastName: { type: String, required: 'Please enter your last name' },
  email: { type: String, required: 'Please enter your email address', unique: true },
  password: { type: String, required: 'Please enter your password' },
  documents: [documentSchema],
  messages: [messageSchema]
}, {
  timestamps: true
});

userSchema
  .virtual('trips', {
    ref: 'Trip',
    localField: '_id',
    foreignField: 'users'
  });

function getTrips(time) {
  return function() {
    const today = moment().startOf('day');
    if (!this.trips) return null;
    return this.trips.filter(trip => {
      return (time === 'past') ? moment(trip.date) < today : moment(trip.date) > today;
    });
  };
}

userSchema
  .virtual('pastTrips')
  .get(getTrips('past'));

userSchema
  .virtual('upcomingTrips')
  .get(getTrips('future'));

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (this.isNew) {
    if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
