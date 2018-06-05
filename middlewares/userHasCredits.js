/**
 * this is a custom middleware used to check user has enough credits
 * all the routes which need login chek befor processing 
 * can use this middleware 
 * @param {req} req is a request object 
 * @param {res} res is a  response object 
 * @param {next} next is a function whhich invoke next middleware
 * (if any) in chain  
 * 
 * req.user is set by passport middlewares while login 
 * 
 */

module.exports =(req,res,next) => {

    console.log('checking for credit ' , req.user);
    if (req.user.credit<=0) {
        return res.status(403).send({error: 'Not enough credits for creating survey'});
    }
 next();
}