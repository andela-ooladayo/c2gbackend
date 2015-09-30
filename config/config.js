'use strict';

module.exports = {

    facebook: {
        clientID: process.env.FACEBOOK_ID || '846461252119060',
        clientSecret: process.env.FACEBOOK_SECRET || '44bd87653a0bb3b5536d9fff61f14d9a',
        callbackURL: 'http://7445ce1.ngrok.com/user/auth/facebook/callback'
    }
};
