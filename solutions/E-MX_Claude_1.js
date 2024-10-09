function foo(check, x, y) {
    // Convert x and y to lowercase for case-insensitive comparison
    x = x.toLowerCase();
    y = y.toLowerCase();

    // Create the regex pattern
    // (?!\b(x|y)\b) - negative lookahead to ensure we don't match x or y as whole words
    // \w+ - match one or more word characters
    // /gi flags: g for global (match all occurrences), i for case-insensitive
    const pattern = new RegExp(`\\b(?!(${x}|${y})\\b)\\w+\\b`, 'gi');

    // Match all words and return as array, or empty array if no matches
    return check.match(pattern) || [];
}

// Test cases
console.log(foo("x y xx xy yx xxy yxx test", "x", "y"));
// Expected output: ["xx", "xy", "yx", "xxy", "yxx", "test"]

console.log(foo("X Y XX XY YX XXY YXX TEST", "x", "y"));
// Expected output: ["XX", "XY", "YX", "XXY", "YXX", "TEST"]

console.log(foo("apple banana x y grape", "x", "y"));
// Expected output: ["apple", "banana", "grape"]

console.log(foo("xyz abc x_y x", "x", "y"));
// Expected output: ["xyz", "abc", "x_y"]

module.exports = { foo };
