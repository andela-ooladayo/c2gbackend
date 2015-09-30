var _ = require('lodash'),
    moment = require('moment'),
    passport = require('passport'),
    pg = require('pg'),
    mailer = require('./email.server'),
    registrationEmailTemplate = require('../../emails/registration'),
    connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/cgdb";

//return User
exports.user = function(req, res) {
    res.json(req.user || null);
};


//Update Profile
exports.update = function(req, res) {
    var user = req.user;
    console.log(user);
    if (user) {
        var data = req.body;
        var updated_at = moment();
        var dateofBirth = null;
        pg.connect(connectionString, function(err, client, done) {
            var sql = "UPDATE users SET firstname=($1), lastname=($2), sex=($3), date_of_birth=($4), residential_address=($5), email=($6), word_attachment_url=($7), pdf_attachment_url=($8), picture_url=($9), updated_at=($10), occupation=($11), state=($12) WHERE id=($13)";
            client.query(sql, [data.firstName, data.lastName, data.sex, dateofBirth, data.address, data.email, data.wordAttachmentUrl, data.pdfAttachmentUrl, data.pictureUrl, updated_at, data.occupation, data.state, user.id], function(err) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Unable to update records'
                    });
                } else {
                    
                    var selectSql = "SELECT * FROM users WHERE id=($1)";
                    client.query(selectSql, [user.id], function(err, result) {
                        var newUser = result.rows[0];

                        req.login(newUser, function(err) {
                            if (err) {
                                res.status(400).json(err);
                            } else {
                                var msg = {};
                                msg.subject = "Registration Confirmation!";
                                msg.to = newUser.email;
                                msg.html = registrationEmailTemplate();
                                mailer(msg);
                                res.statusCode = 200;
                                res.json(newUser);
                                done();
                            }
                        });

                    });
                }
            });
        });
    } else {
        res.status(400).json({
            message: 'User is not signed in'
        });
    }
};
