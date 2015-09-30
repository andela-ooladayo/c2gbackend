
var nodemailer = require('nodemailer'),
    mandrillTransport = require('nodemailer-mandrill-transport');

module.exports = function(msg) {
    console.log("called")
    var transport = nodemailer.createTransport(mandrillTransport({
      auth: {
        apiKey: 'U_xeonxUlKZawq2lW_59ug' //to be stored on the server [process.ENV]
      }
    }));

    transport.sendMail({
        from: 'no-reply@atlas.money',
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
        generateTextFromHTML: true,
    }, function(err, info) {
        if (err) {
            if (cb) cb(err);
        } else {
            console.log("sent>>>")
        }
    });
};