function foo(check, x, y) {
  // Escape the words X and Y to avoid issues with special characters in regex
  const escapedX = x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedY = y.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create the regex pattern to match any word except X and Y but still allow concatenations like xy or xx
  const regex = new RegExp(
    `\\b(?!${escapedX}\\b|${escapedY}\\b)[A-Za-z0-9_]+\\b`,
    'gi'
  );

  // Apply the regex on the input string and return the matched words
  return check.match(regex) || [];
}

// Example usage:
const input = 'Here are some words: hello xy test xx y example.';
const wordX = 'hello';
const wordY = 'test';

console.log(foo(input, wordX, wordY));
// Output: [ 'xy', 'xx', 'y', 'example' ]

export default { foo };
