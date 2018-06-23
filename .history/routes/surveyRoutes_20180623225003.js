const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url'); 
const requireLogin = require('../middlewares/requireLogin.js');
const userHasCredits = require('../middlewares/userHasCredits.js');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer.js')
const surveyTemplets =  require('../services/emailTemplets/surveyTemplets.js')
module.exports= app => {

    app.get('/api/surveys/:surveyId/:choice',(req,res) => {
        console.log('thanks for your vote');
        res.send('thanks for voting :)');
    });


    // // this is actual hook handler 
    // // but since my click handler is not working due to some issue with SENDGRID so i  will updated 
    // // db on mail open instead of on click
    // app.post('/api/surveys/webhook',(req,res) => {
    //    // extract mail , surveyid and choice from event 
    //    // here we have used  lodash chain to cain multiple 
    //    // functions result of one function get passed to next chain and so on
    //    //  finaly last function value() will return result after applying all the function
    //    const p = new Path('/api/surveys/:surveyId/:choice');

    //    _.chain(req.body)
    //      .map(({ email, url }) => {
    //        const match = p.test(new URL(url).pathname);
    //        if (match) {
    //          return { email, surveyId: match.surveyId, choice: match.choice };
    //        }
    //      })
    //      .compact()
    //      .uniqBy('email', 'surveyId')
    //      .each(({ surveyId, email, choice }) => {
    //        Survey.updateOne(
    //          {
    //            _id: surveyId,
    //            recipients: {
    //              $elemMatch: { email: email, responded: false }
    //            }
    //          },
    //          {
    //            $inc: { [choice]: 1 },
    //            $set: { 'recipients.$.responded': true },
    //            lastResponded : new Date()             
    //          }
    //        ).exec();
    //      })
    //      .value();
   
    //    res.send({});
    // });



// fix need to change after send grid click event starts working
    app.post('/api/surveys/webhook',(req,res) => {
      // extract mail , surveyid and choice from event 
      // here we have used  lodash chain to cain multiple 
      // functions result of one function get passed to next chain and so on
      //  finaly last function value() will return result after applying all the function
      _.chain(req.body)
        .map(({ email }) => {
            return {email};
        })
        .compact()
        .uniqBy('email')
        .each(({ email }) => {
          console.log('updating response from email '+ email);
          Survey.updateOne(
            {
              recipients: {
                $elemMatch: { email: email, responded: false }
              }
            },
            {
              $inc: { 'yes': 1 },
              $set: { 'recipients.$.responded': true },
              lastResponded : new Date()   
            }
          ).exec();
        })
        .value();
      res.send({});
   });

    /**
     *  send all the surveys created by a particular user
     */
    app.get('/api/surveys',requireLogin ,async (req,res) => {
        console.log('get survey list for user '+ req.user);
       const servey_data = await  Survey.find({ownedBy :  req.user.id});
       console.log('survey data is '+servey_data);
       res.send(servey_data);
    });

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
