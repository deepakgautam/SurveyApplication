const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose =require('mongoose');
require('./models/User.js');
require('./services/passport.js');
const app = express();

/**
 *  these are middlewares which modify incomming requests(every)
 *  set cookie based authentication for passport
 */
app.use(
  cookieSession({
    maxAge : 1*24*60*60*1000,
    keys : [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * calling auth rout with the app object of express
 * for initializing auth routs 
 * we can do the same in the way 
 * const authRouts = require('./routes/authRoutes.js');
 * authRouts(app)
 */
 require('./routes/authRoutes.js')(app);

 /**
  * connect with mongodb hosted
  */
 mongoose.connect(keys.mongoUri).catch(function(e){
  console.log('some issues in db connectivity '+ e +'key used '+keys.mongoUri);
  console('keys used' + keys.mongoUri);
 });
 /**
  * whenever application starts  include this file since this 
  * file is the entry point of application (in the start scrept)
  */
require('./models/User.js');


/**
 * if we are working on development enviornment than 
 * we dont have envirement variable  provided by horecu 
 * or any other deployements server in that case it will 
 * be 5000  else it will be equal to envirement variable
 * provided by deployement server
 */
const PORT = process.env.PORT || 5000
app.listen(PORT);
