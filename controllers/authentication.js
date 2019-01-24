const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id, // subject
    iat: timestamp // Issue at time
  }, config.secret)
} // first arg is information we want to encode, second argument is the secret string to encode it

exports.signin = function(req, res, next) {
  // User has already email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
  const email = req.body.email; // To get the email
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password'
    });
  } // If there is no email or password

  // See if a user with the given email exists
  User.findOne({ email: email} , function(err, existingUser) {
    if (err) { return next(err); } // handles the case where the connection to database fails

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use'
      });
    }
    
    // If a user with email does not exist, create and save user record
    const user = new User({ // creates User
      email: email,
      password: password
    }); 

    user.save(function(err) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user)});
    }); // saves user to database
  }); // find a user with that email from our database
}