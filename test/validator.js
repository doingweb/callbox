var
  yaml = require('js-yaml'),
  fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  expect = chai.expect,
  mongoose = require('mongoose'),
  mockgoose = require('mockgoose');

mockMongoose();
mongoose.connect('');

var
  EntryCode = require('../app/models/entry-code'),
  validator = require('../app/lib/validator');

describe('Validator', function() {
  beforeEach(function() {
    mockgoose.reset();
  });

  afterEach(function() {
    mockgoose.reset();
  });

  it('should pass a code with no timespan', fixture('no-timespan'));
});

function mockMongoose() {
  mockgoose(mongoose);
}

function fixture(name) {
  return function fixtureTest() {
    var test = yaml.safeLoad(fs.readFileSync(path.join('test', 'fixtures', 'validator', name + '.yaml')));

    return EntryCode.create(test.data)
      .then(getValidatorResultFor(test.input))
      .then(verifyResultAgainst(test.expected));
  };

  function getValidatorResultFor(input) {
    return function() {
      return validator.checkValidity(input);
    };
  }

  function verifyResultAgainst(expected) {
    return function(result) {
      expect(result).to.equal(expected);
    };
  }
}
