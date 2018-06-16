const requireLogin = require('../middlewares/requireLogin.js');
const userHasCredits = require('../middlewares/userHasCredits.js');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer.js')
const surveyTemplets =  require('../services/emailTemplets/surveyTemplets.js')
module.exports= app => {

    app.get('/api/surveys/thanks',(req,res) => {
        res.send('thanks for voting :)');
    })
    /**
     * on submition of any survey from UI this rout will be called
     * first create a newSurvey object of type surveys
     */
    app.post('/api/surveys', requireLogin, userHasCredits, async  (req,res) => {
        console.log('survey api');
        const { title, subject, body, recipients } = req.body; // pull out these data from req.body
        const newSurvey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email })),
            ownedBy: req.user.id,
            dateSent: Date.now()
          });
        try {
            console.log(newSurvey);
            // user this service only if needed not use alot of testing on mail else may be blocked
            try {
                const newMailer = new Mailer(newSurvey, surveyTemplets(newSurvey));
                const result = await newMailer.send();
             } catch(error) {
                 console.log('error while sending mailof user ',req.user);
             }
             try {
                await newSurvey.save();
             } catch(error) {
                 console.log('error while saving  survey  od user ',req.user);
             }
             
             try {
                req.user.credit -=1 ;
                const user = await req.user.save();
                res.send(user);
             } catch(error) {
                 console.log('error updating user credit in db  after creation of servey ',req.user);
             }
          } catch(error){
            res.send(422).send(error);
            console.log("there is some error while sending mails for user ",req.user);
        }
     })
}
