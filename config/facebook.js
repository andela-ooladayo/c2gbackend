'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    users = require('../app/controllers/user.authentication.server'),
    pg = require('pg'),
    moment = require('moment'),
    config = require('./config'),
    connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/cgdb";


module.exports = function() {
    // Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            
            process.nextTick(function() {

                pg.connect(connectionString, function(err, client, drop) {
                    var sql = 'SELECT * FROM users WHERE facebook_id = $1';
                    client.query(sql, [ profile.id ], function(err, result) {
                        if (err)  return done(err);
                        var user = result.rows[0];

                        if (user) {
                            console.log(user);
                            return done(null, user); // user found, return that user
                        } else {
                            
                            var firstName = profile.name.givenName || "";
                            var lastName = profile.name.familyName || "";
                            var pictureUrl = "";
                            var sex = "";
                            var dateofBirth = null;
                            var occupation = "";
                            var state = "";
                            var address = "";
                            var addedAt = moment();

                            if (profile.emails) {
                                var email = profile.emails[0].value || "";
                            } else {
                                var email = "";
                            }

                            pg.connect(connectionString, function(err, client, drop) {
                                var sql = "INSERT INTO users(facebook_id, firstname, lastname, state, sex, occupation, residential_address, email, date_of_birth, picture_url, added_at) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
                                client.query(sql, [profile.id, firstName, lastName, state, sex, occupation, address, email, dateofBirth, pictureUrl,addedAt], function(err, result) {
                                    if (err) {
                                        console.log(err);
                                        return done(err);
                                    } else {
                                        var sql = 'SELECT * FROM users WHERE facebook_id = $1';
                                        client.query(sql, [ profile.id ], function(err, result) {
                                            drop();
                                            return done(null, result.rows[0]);
                                        });
                                    }
                                });
                            });

                        }
                        
                        drop();
                    });

                    if(err) {
                        console.log(err);
                        next();
                    }

                });
         
            });

        }
    ));
};
