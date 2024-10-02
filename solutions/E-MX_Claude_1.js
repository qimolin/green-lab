function foo(x, y) {
    // Ensure x and y are lowercase for case-insensitive comparison
    x = x.toLowerCase();
    y = y.toLowerCase();

    // Build the regex pattern
    // (?!\\b(x|y)\\b) - negative lookahead to exclude exact matches of x or y
    // \\w+ - match one or more word characters
    // 'i' flag for case-insensitive matching
    const pattern = new RegExp(`(?!\\b(${x}|${y})\\b)\\w+`, 'gi');

    // Function to test a single word
    function testWord(word) {
        return pattern.test(word);
    }

    // Example usage with test cases
    const testCases = [
        'hello',         // should match
        x,               // shouldn't match
        y,               // shouldn't match
        x + y,           // should match
        y + x,           // should match
        x + x,           // should match
        'world',         // should match
        x.toUpperCase(), // shouldn't match
        y.toUpperCase()  // shouldn't match
    ];

    // Filter test cases to get matches
    return testCases.filter(testWord);
}

// Example usage
console.log(foo('cat', 'dog'));
