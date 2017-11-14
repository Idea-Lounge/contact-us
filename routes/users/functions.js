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
    nodemailer.createTestAccount((err, account) => {

      // create reusable transporter object using the default SMTP transport
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
      var freelancers = '';
      function GetEmails(array) {
        array.forEach(function(element) {
          freelancers = freelancers + element.email + ',';
        });
      }

      GetEmails(config.freelancers);
      console.log(freelancers);
      //QUESTION:is null an error? how the error will be passed if such appers?
      callback(null);
      // // setup email data with unicode symbols
      var emailBody = 'Name: ' + requestBody.name + '\n';
      emailBody += 'Email: ' + requestBody.email + '\n';
      emailBody += 'Message: ' + requestBody.message;
      let mailOptions = {
        from: '"IdeaLounge 👻" <ideallounge.info@gmail.com>', // sender address
        to: freelancers, // list of receivers
        subject: 'Hello', // Subject line
        text: emailBody// plain text bodys
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
    }
  };

  module.exports = functions;
})();
