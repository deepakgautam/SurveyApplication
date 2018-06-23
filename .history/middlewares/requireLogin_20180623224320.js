/**
 * this is a custom middleware used to check user is logged in 
 * or not , all the routes which need login chek befor processing 
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
    console.log('checking for access ' , req.user);
    if (!req.user) {
        return res.status(401).send({error:'You must login'});
    }
 next();
}