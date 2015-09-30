var _ = require('lodash'),
    moment = require('moment'),
    passport = require('passport'),
    pg = require('pg');



// Signout
exports.signout = function(req, res) {
    req.logout();
    res.statusCode = 200;
    res.json({"message": "logout successfully"});
};


// Oauth Authentication method
exports.oauthCallback = function(strategy) {
    return function(req, res, next) {
        passport.authenticate(strategy, function(err, user, redirectURL) {
            if (err || !user) {
                return res.redirect('/#!/user/signin');
            }
            req.login(user, function(err) {
                if (err) {
                    return res.redirect('/#!/user/signin');
                }
                res.statusCode = 200;
                return res.json({"message" : "login successfully"});
            });
        })(req, res, next);
    };
};