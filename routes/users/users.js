(function () {
  "use strict";
  var router = require('express').Router();
/* Handel POST request from the contactUs form. */
  router.post('/contact-us', function (req, res, next) {
    // TODO: request parser
    // create a response object
    var response = {};


//QUESTION: how can we use functions object without importing it?
    functions.contactUs(req.body, function (error) {
      if (!error) {
        //what to do? send some sucress message? Close the pop up window?
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
