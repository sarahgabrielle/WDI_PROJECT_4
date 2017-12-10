const mongoose = require('mongoose');
// const s3 = require('../lib/s3');

const documentSchema = new mongoose.Schema({
  name: { type: String },
  file: { type: String }
});

// documentSchema
//   .path('image')
//   .set(function getPreviousImage(file) {
//     this._file = this.file;
//     return file;
//   });
//
// documentSchema
//   .virtual('imageSRC')
//   .get(function getImageSRC() {
//     if(!this.file) return null;
//     if(this.file.match(/^http/)) return this.file;
//     return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.file}`;
//   });
//
// documentSchema.pre('save', function checkPreviousImage(next) {
//   if(this.isModified('file') && this._file && !this._file.match(/^http/)) {
//     return s3.deleteObject({ Key: this._file }, next);
//   }
//   next();
// });
//
// documentSchema.pre('remove', function removeImage(next) {
//   if(this.file && !this.file.match(/^http/)) {
//     return s3.deleteObject({ Key: this.file }, next);
//   }
//   next();
// });

module.exports = documentSchema;
