(function () {
  "use strict";
  var nodemailer = require('nodemailer'),
    config = require('../../config.js');
  // functions collection, which will be used to react on different http requests
  var functions = {
    contactUs: function (requestBody, callback) {
      const nodemailer = require('nodemailer');
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // codeReview(Anurag): createTestAccount is not required since we already have a real mail account.
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        // codeReview(Anurag): transporter object needs to be loaded only once in the beginning and not everytime for every request.
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.emailAccount.username, // generated ethereal user
            pass: config.emailAccount.password  // generated ethereal password
          }
        });
        //what a wonderful function to construct the string of the freelacer emails!
        // :)
        var freelancers = '';
        function getEmails(array) {
          array.forEach(function(element) {
            freelancers = freelancers + element.email + ',';
          });
        }

        getEmails(config.freelancers);
        console.log(freelancers);
        // setup email data with unicode symbols
        var emailBody = 'Name: ' + requestBody.name + '\n';
        emailBody += 'Email: ' + requestBody.email + '\n';
        emailBody += 'Message: ' + requestBody.message;
        let mailOptions = {
          // codeReview(Anurag): IdeaLounge mail information to be stored in config and not here.
          from: '"IdeaLounge 👻" <ideallounge.info@gmail.com>', // sender address
          to: freelancers, // list of receivers
          subject: 'Hello', // Subject line
          text: emailBody// plain text bodys
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (!error) {
            //QUESTION:is null an error? how the error will be passed if such appers?
            //ANSWER: pass null here to show that there is no error in sending the email. If there is an error which appears see else condition. Resolved?
            callback(null);
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          } else {
            // codeReview(Anurag): I am passing the error which we get directly from nodemailer. Should change this to be more structured.
            // feat():
            callback(error);
            console.log(error);
          }
        });
      });
    }
  };

  module.exports = functions;
})();
