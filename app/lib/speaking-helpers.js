module.exports = {
  separateDigits: function separateDigits(digitString) {
    if (digitString.length > 6) {
      return 'all that';
    }

    return digitString.split('').join(' ');
  }
};
