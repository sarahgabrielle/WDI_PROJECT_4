const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const documentSchema = new mongoose.Schema({
  filename: { type: String },
  fileType: { type: String },
  title: { type: String }
});

documentSchema
  .path('filename')
  .set(function getPreviousFileName(filename) {
    this._filename = this.filename;
    return filename;
  });

documentSchema
  .virtual('link')
  .get(function getDocLink() {
    if(!this.filename) return null;
    if(this.filename.match(/^http/)) return this.filename;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.filename}`;
  });

documentSchema.pre('save', function checkPreviousFile(next) {
  if(this.isModified('filename') && this._filename && !this._filename.match(/^http/)) {
    return s3.deleteObject({ Key: this._filename }, next);
  }
  next();
});

documentSchema.pre('remove', function removeFile(next) {
  if(this.filename && !this.filename.match(/^http/)) {
    return s3.deleteObject({ Key: this.filename }, next);
  }
  next();
});

module.exports = documentSchema;
