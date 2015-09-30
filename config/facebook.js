'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    users = require('../app/controllers/users.server.controller'),
    pg = require('pg'),
    moment = require('moment'),
    config = require('./config'),
    connectionString = process.env.DATABASE_URL || "postgres://dayo:nifemi00@localhost/c2gdb";


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
                    var sql = 'SELECT * FROM atlas_users WHERE facebook_id = $1';
                    client.query(sql, [ profile.id ], function(err, result) {
                        if (err)  return done(err);
                        var user = result.rows[0];

                        if (user) {
                            return done(null, user); // user found, return that user
                        } else {
                        
                            var name,
                                email,
                                provider = 'facebook';

                            if (profile.name.givenName && profile.name.familyName) {
                                name = profile.name.givenName + " " + profile.name.familyName ;
                            }
                            else {
                                name = profile.name.givenName || profile.name.familyName || "";
                            }

                            if(profile.emails) {
                                email = profile.emails[0].value;
                            }
                            else {
                                email = "";
                            }

                            var signupTimestamp = moment();
                            pg.connect(connectionString, function(err, client, drop) {
                                var sql = "INSERT INTO atlas_users(name, email, facebook_id, signup_timestamp, provider) values($1, $2, $3, $4, $5)";
                                client.query(sql, [name, email, profile.id, signupTimestamp, provider], function(err, result) {
                                    if (err) {
                                        console.log(err);
                                        return done(err);
                                    } else {
                                        var sql = 'SELECT * FROM atlas_users WHERE facebook_id = $1';
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
