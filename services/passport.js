const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js')
/**
 * @param
 *  creating a google strategy 
 *  we can include other strategy in this as well like facebook , linkeding ...
 *  whenever a 'google' strings comes this strategy executed 
 */
passport.use(
    new googleStrategy(
    {
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback'
    },
   (accessToken, refreshToken,profile,done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(done);
    }
   )
);
