const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = messageSchema;
