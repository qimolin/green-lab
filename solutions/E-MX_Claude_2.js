function foo(check, x, y) {
  // Convert x and y to lowercase for case-insensitive comparison
  x = x.toLowerCase();
  y = y.toLowerCase();

  // Create the regex pattern
  // (?!\\b(x|y)\\b) - negative lookahead to exclude exact matches of x or y
  // \\w+ - match one or more word characters
  const pattern = new RegExp(`\\b(?!(${x}|${y})\\b)\\w+\\b`, 'gi');

  // Find all matches and return as an array
  return check.match(pattern) || [];
}

// Test cases
function runTests() {
  console.log(foo('xx xy x y test', 'x', 'y')); // ["xx", "xy", "test"]
  console.log(foo('XX XY X Y TEST', 'x', 'y')); // ["XX", "XY", "TEST"]
  console.log(foo('apple banana x y xy apple_x', 'x', 'y')); // ["apple", "banana", "xy", "apple_x"]
  console.log(foo('x_x y_y x y', 'x', 'y')); // ["x_x", "y_y"]
  console.log(foo('testing123 x456 y789 x y', 'x', 'y')); // ["testing123", "x456", "y789"]
}

runTests();

export default { foo };
