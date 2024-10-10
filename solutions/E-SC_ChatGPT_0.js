function foo(x, y) {
  // Helper function to check if a character is a letter
  function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
  }

  // Check if either x or y is not a letter
  if (!isLetter(x) || !isLetter(y)) {
    return -1;
  }

  // Check if both characters are the same case
  if (
    (x === x.toLowerCase() && y === y.toLowerCase()) ||
    (x === x.toUpperCase() && y === y.toUpperCase())
  ) {
    return 1;
  }

  // If both are letters but not the same case
  return 0;
}

module.exports = { foo };
