var mongoose = require('mongoose');

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
  }
})
