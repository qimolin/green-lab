function foo(x, y) {
  // Convert x and y to lowercase for case-insensitive matching
  x = x.toLowerCase();
  y = y.toLowerCase();

  // Create a regular expression that matches any word except x and y
  const regex = new RegExp(`\\b(?!(?:${x}|${y})\\b)\\w+\\b`, 'gi');

  // Find all matches in the input string
  const matches = [];
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    matches.push(match[0]);
  }

  // Return the list of matches
  return matches;
}