const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose =require('mongoose');
require('./models/User.js');
require('./services/passport.js');
const app = express();
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise

/**
 * bodyparser is a middleware used to parse 
 * request data (form any post,put,patch request ) to json 
 */
app.use(bodyParser.json())

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
 * calling authRouts with the app object of express
 * for initializing auth routs 
 * we can do the same in the way 
 * const authRouts = require('./routes/authRoutes.js');
 * authRouts(app)
 */
 require('./routes/authRoutes.js')(app);
 /**
  * calling billingRouts with the app object of express
  */
 require('./routes/billingRouts.js')(app);


 /**
  * this part of code only run for out deployed verssion 
  * since in deployed verssion  we have only single server 
  * (in test we were usgin saperate server for clientwhich is react server )
  * so express need to handle routes for client side as well 
  * note that express always look for any route inside different 
  * routes  in the order routes are included , so first express 
  * will look any reques in to ./routes/authRoutes.js 
  * than in './routes/billingRouts.js and if not found any request in these route
  * files than look in to this
  * there can be 2 differnt types of reuest express need to serve for client routing 
  * first  is Client URLS like /surver or /dashboard .. for all these types of routes 
  * express will always return Index.html (of client) which have appropriate details what to do with
  * these routes
  * second type is express need to serve production assets like main.js which is requested from browser
  * after serving index.html these are production files which we can found in build section of client
  */

  if (process.env.NODE_ENV === 'production') {
     // first express will check whether this request is for production assets
     // if found will serve from there 
     app.use(express.static('client/build'));

     // if not found in production assets then definetly it is some type of
     // client side URL
     const path = require('path');
     app.get('*',(req,res) =>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));

     });
     
  }



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
 * 
 */
require('./models/surveys.js'); 

/**
  * calling surveyRoutes with the app object of express
  */
 require('./routes/surveyRoutes')(app);

/**
 * if we are working on development enviornment than 
 * we dont have envirement variable  provided by horecu 
 * or any other deployements server in that case it will 
 * be 5000  else it will be equal to envirement variable
 * provided by deployement server
 */
const PORT = process.env.PORT || 5000
app.listen(PORT);
