// passport helps authenticate users
const passport = require('passport');
const User = require('../models/user');
const config = require("../config") || process.env.secret;
const JwtStrategy = require('passport-jwt').Strategy; // methods for authenticating user
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy (Logging in, verifying email and password are correct 
const localOptions = { usernameField: 'email'}; // default is username and password. We have password but we use email instead of username
const LocalLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify email and password, call done with user
  // if it is correct username and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user){
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
  
  // compare passwords - is password equal to user.password. (encrypted password to plain text password)
    user.comparePassword(password, function(err, isMatch){
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user); // assigns to req.user
    });
  
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy, verifying token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { // payload is decoded jwt token(sub and iat)
// See if user ID in the payload exists in our database, if it does call done with that user
// otherwise, call done without a user object
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false); } // false means could not find the user object
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy

passport.use(jwtLogin);
passport.use(LocalLogin);