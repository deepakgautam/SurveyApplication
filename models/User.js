const mongoose = require('mongoose');
const {Schema} = mongoose;// same as const schema  = mongoose.Schema;

// mongoose has a limitation we need to define a fixed schema 
const userSchema = new Schema({
 googleId : String ,
 name :String
});
/**
 * create a modal users of type userSchema if not exists 
 * executed when  it is invoked
 */
mongoose.model('users',userSchema);

