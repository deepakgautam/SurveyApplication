const passport = require('passport');
const Survey = mongoose.model('surveys');

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
 *  chained other call backs also like redirect to some url after login
 */
app.get('/auth/google/callback',
passport.authenticate('google'),
(req,res) => {
    res.redirect('/dashboard');
}
);

/**
 * test rount for checking that google login authentication cookie
 * based authentication is working
 */
app.get('/api/current_user', (req,res) => {
    res.send(req.user);
});

/**
 * api call for log out
 * passport profide this functionality to logout 
 * 
 */
app.get('/api/logout',(req, res) =>{ 
    const user = req.user;
    req.logout();
    res.redirect('/')
   });
}

