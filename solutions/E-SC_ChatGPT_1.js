function foo(x, y) {
  // Helper function to check if a character is a letter
  function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
  }

  // Check if either character is not a letter
  if (!isLetter(x) || !isLetter(y)) {
    return -1;
  }

  // Check if both characters are uppercase or both are lowercase
  if (
    (x === x.toUpperCase() && y === y.toUpperCase()) ||
    (x === x.toLowerCase() && y === y.toLowerCase())
  ) {
    return 1;
  }

  // If both characters are letters but different case
  return 0;
}

module.exports = { foo };
