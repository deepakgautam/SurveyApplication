const Sendgrid = require('sendgrid');
const helper = Sendgrid.mail;
const keys = require('../config/keys');
/**
 * 
 */
class Mailer extends helper.Mail {
    /**
     * @param  we are only destructuring  subject,recipients  fields of newServey passed 
     * @param  containts email templet 
     * 
     */
    constructor({subject,recipients}, containts) { // here we are only destructuring   fields of newServey passed , and containts is the templet 
        super();
        this.sgApi = Sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@survey.com');
        this.subject = subject;
        this.body = new helper.Content('text/html',containts);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    /**
     * @param {*array of objects} recipients
     * from array of onbjects return another array in which each elements is one email. 
     */
    formatAddresses (recipients) {
        return recipients.map(({email}) => { //only destructuring email and return it after formating  with helper
            return new helper.Email(email);
        });
    }

    /**
     *  click tracking
     */
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipients => {
            personalize.addTo(recipients);
        })
        this.addPersonalization(personalize);
    }

    async send() {
        try {
          const request = this.sgApi.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: this.toJSON()
          });
          const response = await this.sgApi.API(request);
          return response;
        } catch (err) {
          console.log("error in sending",err.response.body.errors);
        }
       }
}

module.exports = Mailer;