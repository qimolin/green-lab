function foo(check, x, y) {
  // Escape the special characters in x and y to avoid regex issues
  let escapeRegex = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create the regex pattern to exclude whole words x and y (case-insensitive)
  let pattern = new RegExp(
    `\\b(?!${escapeRegex(x)}\\b|${escapeRegex(y)}\\b)\\w+`,
    'gi'
  );

  // Use the regex pattern to find all the matches in the input string
  let matches = check.match(pattern);

  // If no matches are found, return an empty array
  return matches ? matches : [];
}

// Example usage
const result = foo('foo xy x y fooX fooY xx', 'x', 'y');
console.log(result); // Output: ['foo', 'xy', 'fooX', 'fooY', 'xx']

module.exports = { foo };
