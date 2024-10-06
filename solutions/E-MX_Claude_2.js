function foo(x, y) {
    // Convert x and y to lowercase for case-insensitive comparison
    const lowerX = x.toLowerCase();
    const lowerY = y.toLowerCase();

    // Create regex pattern
    // (?!\\b(x|y)\\b) - negative lookahead to exclude exact matches of x or y
    // \\w+ - match one or more word characters
    // 'i' flag for case-insensitive matching
    const pattern = new RegExp(`(?!\\b(${lowerX}|${lowerY})\\b)\\w+`, 'gi');

    // The function to be returned
    return function(text) {
        // Convert input text to lowercase for case-insensitive matching
        const lowerText = text.toLowerCase();

        // Find all matches and return as array
        return lowerText.match(pattern) || [];
    };
}

// Test cases
const matcher = foo('cat', 'dog');

const testCases = [
    'cat',           // Should not match
    'dog',           // Should not match
    'cats',          // Should match
    'doggy',         // Should match
    'catdog',        // Should match
    'CAT',           // Should not match
    'DOG',           // Should not match
    'CATS',          // Should match
    'CatDog',        // Should match
    'hello',         // Should match
    'catalog',       // Should match
    'hotdog',        // Should match
    'cat123',        // Should match
    'dog_house',     // Should match
    'CAT_DOG'        // Should match
];

console.log("Test results:");
testCases.forEach(test => {
    const result = matcher(test);
    console.log(`${test}: ${result.length > 0 ? 'Matched' : 'Not matched'}`);
});

module.exports = { foo };
