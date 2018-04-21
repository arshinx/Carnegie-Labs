var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next){

  // Required Fields
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {

      // Confirm user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        // Error
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // Create object with form input data
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      }

      // Debugging
      console.log(userData);

      // Insert schema into MongoDB 
      User.create(userData, function(error, user) {

      });

    } else {
      // Error
      var err = new Error('All fields are required.');
      err.status = 400;
      return next(err);
    }
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
