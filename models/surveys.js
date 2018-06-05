const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipentSchema = require('./recipentSchema.js')
// mongoose has a limitation we need to define a fixed schema 
const userSchema = new Schema({
 title: String,
 body: String,
 subject: String,
 recipients: [RecipentSchema],
 yes :{type: Number,default:0},
 no :{type: Number,default:0},
 ownedBy :{type : Schema.Types.ObjectId, ref :"users"}, // this is kind of super key relation with users schema
 dateSent : Date,
 lastResponded : Date
});
/**
 * create a modal users of type userSchema if not exists 
 * executed when  it is invoked
 */
mongoose.model('surveys',userSchema);

