const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js')
const mongoose = require('mongoose');

const User = mongoose.model('users');
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
        callbackURL : '/auth/google/callback',
        proxy : true
    },
    (accessToken, refreshToken, profile, done) => {
       // check user exists in db or not 
       User.findOne({googleId : profile.id})
       .then((existingUser)=>{
        if (existingUser) {
         console.log('a user already exists with whis google id so not creating new instance of user in db');
        // done is a function provided by passport as a call back function after completion of all process 
        // first parameter to done is error message if any and second parameter is result of the operations.
         done(null, existingUser);
        } else {
            console.log('creating a new instance in db with');
            // create a user save it (saving is async operation) on completion of saving call done function with newly created dbuser
            new User({
                googleId: profile.id,
                name : profile.displayName
               })
               .save()
               .then((dbUser) =>{
                    console.log("new user created in db : " +dbUser);
                    done(null, dbUser);
                });
        }
       });
      }
   )
);

/**
 * serializeUser is use to generate a identifiens piece 
 * of information which than set as the browser cookies
 * so that in subsequent calls from the  brower can be 
 * determined by this piece of information . insubsequent calls 
 * this cookie will be appanded which will be again deserialized
 * to determine user which is making reuest .....(since https is state less)
 * so we need a pices of info to determine users .
 */
passport.serializeUser((dbUser,done) => {
 done(null,dbUser.id);
});

/**
 * deserialize the user by the id frovided from 
 * subsequent request from cookie
 */
passport.deserializeUser((id,done) => {
 User.findById(id)
 .then((dbUser =>{
     done(null,dbUser);
 }))
});