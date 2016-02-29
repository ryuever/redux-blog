var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');

var db = require('../components/mongodb');

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true},
  password: String,
  tokens: Array,
  profile: {
    name: { type: String, default: ''},
    gender: { type: String, default: ''},
    location: { type: String, default: ''},
    website: { type: String, default: ''},
    picture: { type: String, default: ''}
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods = {
  comparePassword: function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err) return cb(err);
      cb(null, isMatch);
    });
  }
}

UserSchema.statics = {};

module.exports = db.model('User', UserSchema);
