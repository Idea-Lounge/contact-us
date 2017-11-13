(function () {
  "use strict";
  var router = require('express').Router(),
    functions = require('./functions');
/* Handel POST request from the contactUs form. */
  router.post('/contact-us', function (req, res, next) {
    // TODO: request parser
    var response = {};
    functions.contactUs(req.body, function (error) {
      if (!error) {
        response = {
          'message': 'Email sent to freelancers.'
        };
        res.json(response);
      } else {
        response = {
          error_code: 400,
          message: 'There was some error'
        };
        res.status(response.error_code);
        res.json(response);
      }
    });
  });

  module.exports = router;
})();
