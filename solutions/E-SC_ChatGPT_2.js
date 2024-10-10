function foo(x, y) {
  // Helper function to check if a character is a letter
  function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
  }

  // If either character is not a letter, return -1
  if (!isLetter(x) || !isLetter(y)) {
    return -1;
  }

  // Check if both characters are uppercase or both are lowercase
  const bothUpper = x === x.toUpperCase() && y === y.toUpperCase();
  const bothLower = x === x.toLowerCase() && y === y.toLowerCase();

  // Return 1 if both are the same case, otherwise return 0
  return bothUpper || bothLower ? 1 : 0;
}

// Example usage
console.log(foo('a', 'b')); // 1 (both lowercase)
console.log(foo('A', 'B')); // 1 (both uppercase)
console.log(foo('a', 'B')); // 0 (different cases)
console.log(foo('a', '1')); // -1 (non-letter)

export default { foo };
