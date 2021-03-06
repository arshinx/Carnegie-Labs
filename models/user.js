var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true // removes whitespace
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Authenticate input with db docs
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(error, user) {
      // Error handling
      if (error) {
        return callback(error);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      // Compare password
      bcrypt.compare(password, user.password, function(error, result) {
        if (result === true) {
          return callback(null, user); // null mapping to error var meaning "no error"
        } else {
          return callback();
        }
      });
    });
}

// Hash password, prior to saving in database
UserSchema.pre('save', function(next) {
  // get user object
  var user = this; // user entered info in signup form
  // hash password
  bcrypt.hash(user.password, 10, function(err, hash) {
    // error handler
    if (err) {
      return next(err);
    }

    // Overwrite password with hash
    user.password = hash;
    next();
  });
});

// Export model
var User = mongoose.model('User', UserSchema);
module.exports = User;
