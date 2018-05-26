const express = require('express');
const app = express();
require('./services/passport.js');
const authRouts = require('./routes/authRoutes.js');

/**
 * calling auth rout with the app object of express
 * for initializing auth routs 
 * we can do the same in the way 
 * const authRouts = require('./routes/authRoutes.js');
 * authRouts(app)
 */
 require('./routes/authRoutes.js')(app);

/**
 * if we are working on development enviornment than 
 * we dont have envirement variable  provided by horecu 
 * or any other deployements server in that case it will 
 * be 5000  else it will be equal to envirement variable
 * provided by deployement server
 */
const PORT = process.env.PORT || 5000
app.listen(PORT);
