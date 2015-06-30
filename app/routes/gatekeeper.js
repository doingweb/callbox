var
  twilio = require('twilio'),
  express = require('express'),
  router = express.Router(),
  speaking = require('../lib/speaking-helpers'),
  validator = require('../lib/validator');

router.get('/', function(req, res) {
  res.type('xml');

  var twiml = new twilio.TwimlResponse();

  twiml
    .gather({
      action: '/gatekeeper'
    }, function() {
      this.say('Please enter your authentication code, followed by the pound sign.');
    });

  res.send(twiml.toString());
});

router.post('/', function(req, res) {
  res.type('xml');
  var code = req.body['Digits'];

  var twiml = new twilio.TwimlResponse();

  if (validator.isValid(code)) {
    twiml.play({ digits: '9' });
  } else {
    twiml.say(speaking.separateDigits(code) + ' was not a valid code. Bye now.');
    twiml.play({ digits: '#' });
  }

  res.send(twiml.toString());
});

module.exports = router;
