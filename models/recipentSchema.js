const mongoose = require('mongoose');
const {Schema} = mongoose;
/**
 * this is a sub documment which is associated with each 
 * recipients field of survey Schema 
 * so instead of registring this schema as a model 
 * we need to export this schema so that it can be used by 
 * recipients field of survey Schema 
 */
const RecipentSchema = new Schema({
    email : String,
    responded : {type :Boolean, default : false}// this field has default value so need not to specify while creating its  instance 
})
module.exports  = RecipentSchema;