var
  app = require('../app/app'),
  request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  chaiXml = require('chai-xml');

chai.use(chaiXml);

describe('Gatekeeper API', function() {
  describe('Picking up a call', function() {
    it('should greet the user and gather authentication code numbers', function(done) {
      request(app)
        .get('/gatekeeper')
        .expect('Content-Type', /xml/)
        .expect(200)
        .expect(function(res) {
          expect(res.text).xml.to.deep.equal(
            '<Response>' +
              '<Gather action="/gatekeeper/authenticate">' +
                '<Say>Please enter your authentication code, followed by the pound sign.</Say>' +
              '</Gather>' +
            '</Response>');
        })
        .end(done);
    });
  });
});
