const keys = require('../../config/keys.js')
module.exports = (newSurvey) => {
    return `
    <html>
        <body>
          <div style = "text-align : center;">
                <h3>I'd like your input!</h3>
                <p>Please answer the following questions :</p>
                <p>${newSurvey.body}</p>
                <div>
                    <a href ="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                </div>
                <div>
                <a href ="${keys.redirectDomain}/api/surveys/thanks">No</a>
                </div>
           </div>
        </body>
    </html>
    `;
}