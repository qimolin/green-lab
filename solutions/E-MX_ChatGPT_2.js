function foo(check, x, y) {
  // Escape special characters in x and y to avoid regex injection
  const escapeRegExp = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regex pattern that matches words but excludes x and y
  const pattern = new RegExp(
    `\\b(?!(${escapeRegExp(x)}|${escapeRegExp(y)})\\b)\\w+`,
    'gi'
  );

  // Find all matches based on the regex pattern
  const matches = check.match(pattern);

  // Return the list of matches, or an empty list if no matches are found
  return matches ? matches : [];
}

// Example usage
console.log(
  foo(
    'This is an example with xy, x, y, and other words like xx and abc',
    'x',
    'y'
  )
);

export default foo;
