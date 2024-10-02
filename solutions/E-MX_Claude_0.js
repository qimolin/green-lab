function foo(x, y) {
    // Convert parameters to lowercase for case-insensitive comparison
    const X = x.toLowerCase();
    const Y = y.toLowerCase();

    // Function to escape special regex characters
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Escape the input words for regex safety
    const escapedX = escapeRegex(X);
    const escapedY = escapeRegex(Y);

    // Create the regex pattern
    // (?!\b(x|y)\b) - negative lookahead to ensure the word is not exactly x or y
    // \w+ - match one or more word characters
    const pattern = new RegExp(`\\b(?!\\b(${escapedX}|${escapedY})\\b)\\w+\\b`, 'gi');

    // Test function
    return function(testString) {
        return testString.match(pattern) || [];
    };
}

// Example usage:
const matcher = foo('cat', 'dog');

// Test cases
const testCases = [
    'cat',           // Should not match
    'dog',           // Should not match
    'catdog',        // Should match
    'dogcat',        // Should match
    'cats',          // Should match
    'CAT',           // Should not match (case insensitive)
    'DOG',           // Should not match (case insensitive)
    'catalog',       // Should match
    'dogmatic',      // Should match
    'CATDOG',        // Should match
    'cat_dog',       // Should match
    'catcat',        // Should match
    'dogdog'         // Should match
];

testCases.forEach(test => {
    console.log(`"${test}": ${matcher(test).join(', ') || 'no match'}`);
});
