var
  twilio = require('twilio'),
  speaking = require('../lib/speaking-helpers'),
  validator = require('../lib/validator');

module.exports = {
  pickup: function(req, res) {
    res.type('xml');

    var twiml = new twilio.TwimlResponse();

    twiml
      .gather({
        action: '/gatekeeper'
      }, function() {
        this.say('Please dial your entry code, followed by the pound sign.');
      });

    res.send(twiml.toString());
  },
  validateCode: function(req, res) {
    res.type('xml');
    var code = req.body['Digits'];

    var twiml = new twilio.TwimlResponse();

    validator.isValid(code).then(function(isValid) {
      if (isValid) {
        twiml.play({ digits: '9' });
      } else {
        twiml.say(speaking.separateDigits(code) + ' was not a valid code. Bye now.');
        twiml.play({ digits: '#' });
      }

      res.send(twiml.toString());
    });
  }
};
