const mongoose = require('mongoose');
const messageSchema = require('./message');
const documentSchema = require('./document');
const moment = require('moment');

const tripSchema = new mongoose.Schema({
  resort: { type: String, required: true },
  resortLocation: {
    lat: Number,
    lng: Number
  },
  date: { type: Date, required: true },
  accommodation: { type: String },
  accommodationLocation: {
    lat: Number,
    lng: Number
  },
  memories: [documentSchema],
  groupMessage: [messageSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

tripSchema
  .path('date')
  .get(function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  });

module.exports = mongoose.model('Trip', tripSchema);
