const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
  email: { 
    type: String,
    unique: true,
    lowercase: true // email will always be lowercase
  },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function below hence pre('save')
userSchema.pre('save', function(next) {
  const user = this; // get access to user model

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash or encrypt password using salt 
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch)
  })
} // this.password is the hashed and salted password. Internally, hashes candidated password and compares them

// Create model class

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;