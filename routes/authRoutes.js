const passport = require('passport');

/**
 * 
 * @param {*object} app  its a express object passed form index.js
 */
module.exports = (app) =>{
/**
 * @param 
 * in passport.authenticate  google is the string which will help google 
 * strategy to determine its a google authentication
 * we can add more access parameters in scope like images and many more
 * provided by particular strategy  
 * 
 * in console.developers.google.com we have given permission of call back URL
 * /auth/google/callback so that  no one can come how redirect to  any else 
 * call back url 
 * 
 */
app.get('/auth/google',
passport.authenticate('google',{
scope : ['profile','email']
})
);

/**
 *  once above auth call back return to /auth/google/callback
 *  than we nedd to again go back to google to verify whether 
 *  code provided  is authenticated or not 
 *  so we will do  use again passpot to do this 
 */
app.get('/auth/google/callback',
passport.authenticate('google')
);
}
