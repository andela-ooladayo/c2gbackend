var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../app/controllers/user.authentication.server.js');


/* Authentication Routes */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});


router.get('/signout', users.signout);

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/auth/facebook/callback', users.oauthCallback('facebook'));



module.exports = router;
