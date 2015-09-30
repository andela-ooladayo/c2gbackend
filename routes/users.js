var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../app/controllers/user.authentication.server.js');
var profile = require('../app/controllers/user.profile.server.js');


/* Authentication Routes */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));
router.get('/auth/facebook/callback', users.oauthCallback('facebook'));
router.get('/signout', users.signout);

//profile
router.get('/profile', profile.user);
router.post('/profile/edit', validateUserData, profile.update);


function validateUserData(req, res, next) {
  req.checkBody({
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    }
  });
  var errors = req.validationErrors();
  if (errors) {
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  return next(); 
}

module.exports = router;
