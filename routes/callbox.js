var twilio = require('twilio');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.type('xml');

  var twiml = new twilio.TwimlResponse();

  twiml
    .say('Hi there.')
    .gather({
      action: '/callbox/readCode',
      numDigits: 4
    }, function() {
      this.say('You should type, like, four numbers.');
    });

  res.send(twiml.toString());
});

router.post('/readCode', function(req, res) {
  res.type('xml');
  var digits = req.body['Digits'];

  var twiml = new twilio.TwimlResponse();

  var spokenDigits = digits.split('').join(' ');
  twiml
    .say('Okay thanks for typing ' + spokenDigits + '. That was exactly what I was looking for. Bye now.');

  res.send(twiml.toString());
});

module.exports = router;
