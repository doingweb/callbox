var
  request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  chaiXml = require('chai-xml'),
  sinon = require('sinon'),
  proxyquire =  require('proxyquire'),
  speaking = require('../app/lib/speaking-helpers');

chai.use(chaiXml);

describe('Gatekeeper', function() {
  var
    validatorStub = { '@global': true },
    app = proxyquire('../app/app', {
      '../lib/validator': validatorStub
    });

  beforeEach(function(done) {
    validatorStub.isValid = sinon.stub();
    done();
  });

  describe('picking up a call', function() {
    it('should greet the user and gather entry code numbers', function(done) {
      request(app)
        .get('/gatekeeper')
        .expect('Content-Type', /xml/)
        .expect(200)
        .expect(function(res) {
          expect(res.text).xml.to.deep.equal(
            '<Response>' +
              '<Gather action="/gatekeeper">' +
                '<Say>Please dial your entry code, followed by the pound sign.</Say>' +
              '</Gather>' +
            '</Response>');
        })
        .end(done);
    });
  });

  describe('receiving an entry code', function() {
    it('should let the visitor in if the code is valid', function(done) {
      var validCode = '123';
      validatorStub.isValid.returns(true);

      request(app)
        .post('/gatekeeper')
        .send({ 'Digits': validCode })
        .expect('Content-Type', /xml/)
        .expect(200)
        .expect(function(res) {
          expect(res.text).xml.to.deep.equal(
            '<Response>' +
              '<Play digits="9"></Play>' +
            '</Response>');
        })
        .end(done);
    });

    it('should reject the visitor and deny entry if the code is invalid', function(done) {
      var invalidCode = '123';
      validatorStub.isValid.returns(false);

      request(app)
        .post('/gatekeeper')
        .send({ 'Digits': invalidCode })
        .expect('Content-Type', /xml/)
        .expect(200)
        .expect(function(res) {
          expect(res.text).xml.to.deep.equal(
            '<Response>' +
              '<Say>' + speaking.separateDigits(invalidCode) + ' was not a valid code. Bye now.</Say>' +
              '<Play digits="#"></Play>' +
            '</Response>');
        })
        .end(done);
    });
  });
});
