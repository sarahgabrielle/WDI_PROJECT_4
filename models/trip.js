const mongoose = require('mongoose');

const messageSchema = require('./message');
const documentSchema = require('./document');

const tripSchema = new mongoose.Schema({
  country: { type: String, required: true },
  resort: { type: String, required: true },
  date: { type: Date, require: true },
  address: { type: String },
  memories: [documentSchema],
  groupMessage: [messageSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
