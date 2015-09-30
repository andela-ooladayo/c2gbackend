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
        passport.authenticate(strategy, function(err, user, newUser, redirectURL) {
            if (err || !user) {
                return res.redirect('/#!/user/signin');
            }
            req.login(user, function(err) {
                console.log("here");
                if (err) {
                    return res.redirect('/#!/user/signin');
                }
                if (!err && newUser) {
                    var msg = {};
                    msg.subject = "Registration Confirmation!";
                    msg.to = newUser.email;
                    msg.html = registrationEmailTemplate();
                    mailer(msg);
                    return res.redirect('/#!/user/profile');
                }
                res.statusCode = 200;
                return res.json(user);
            });
        })(req, res, next);
    };
};