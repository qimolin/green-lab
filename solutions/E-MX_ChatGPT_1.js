function foo(text, x, y) {
  // Create a case-insensitive regex for the words x and y
  const regex = new RegExp(`\\b(?!(${x}|${y})\\b)[A-Za-z0-9_]+`, 'gi');
  
  // Find all matches in the input text using the regex
  const matches = text.match(regex);
  
  // Return the matches, or an empty array if no matches were found
  return matches || [];
}

// Example usage:
const text = "This is an example with xy, Xy, xx, and x and y.";
const wordX = "x";
const wordY = "y";

console.log(foo(text, wordX, wordY));

module.exports = { foo };
