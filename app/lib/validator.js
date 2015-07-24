var
  EntryCode = require('../models/entry-code');

function isValid(code) {
  return EntryCode.find({}).then(function(entryCodes) {
    return entryCodes.some(function(entryCode) {
      return entryCode.code === code;
    });
  });
}

module.exports = {
  isValid: isValid
};
