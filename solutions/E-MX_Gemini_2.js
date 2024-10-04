function foo(x, y) {
  // Convert x and y to lowercase for case-insensitive matching
  x = x.toLowerCase();
  y = y.toLowerCase();

  // Create a regular expression that matches any word except x and y
  const regex = new RegExp(`\\b(?!(?:${x}|${y})\\b)\\w+\\b`, 'i');

  // Test the regular expression against a string of words
  const str = 'This is a test string with some words like xyzzy, XX, and yy.';
  let match;
  const matches = [];

  // Find all matches and add them to the matches array
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[0]);
  }

  // Return the matches array
  return matches;
}