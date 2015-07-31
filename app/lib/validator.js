var
  EntryCode = require('../models/entry-code');

function checkValidity(code) {
  return EntryCode.find()
    .then(anyEntryCodeMatches);

  function anyEntryCodeMatches(entryCodes) {
    return entryCodes.some(function(entryCode) {
      return entryCode.code === code;
    });
  }
}

module.exports = {
  checkValidity: checkValidity
};
