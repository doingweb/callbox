var
  twilio = require('twilio'),
  express = require('express'),
  router = express.Router(),
  speaking = require('../lib/speaking-helpers');

router.get('/', function(req, res) {
  res.type('xml');

  var twiml = new twilio.TwimlResponse();

  twiml
    .gather({
      action: '/callbox/authenticate'
    }, function() {
      this.say('Please enter your authentication code, followed by the pound sign.');
    });

  res.send(twiml.toString());
});

router.post('/authenticate', function(req, res) {
  res.type('xml');
  var digits = req.body['Digits'];

  var twiml = new twilio.TwimlResponse();

  // TODO: Validate the code.

  twiml.say(speaking.separateDigits(digits) + ' was not a valid code. Bye now.');

  res.send(twiml.toString());
});

module.exports = router;
