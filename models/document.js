const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String },
  file: { type: String }
});

module.exports = documentSchema;
