function foo(check, x, y) {
    // Convert x and y to lowercase for case-insensitive comparison
    x = x.toLowerCase();
    y = y.toLowerCase();

    // Create the regex pattern
    // (?!\\b(x|y)\\b) - negative lookahead to exclude exact matches of x or y
    // \\w+ - match one or more word characters
    const pattern = new RegExp(`\\b(?!(${x}|${y})\\b)\\w+\\b`, 'gi');

    // Find all matches and return as array
    return check.match(pattern) || [];
}

// Test cases
function runTests() {
    const testCases = [
        {
            check: "hello x world xy xx y yy",
            x: "x",
            y: "y",
            expected: ["hello", "xy", "xx", "yy"],
            description: "Basic test with x and y"
        },
        {
            check: "abc X Y xY Xy xYz",
            x: "x",
            y: "y",
            expected: ["abc", "xy", "xyz"],
            description: "Case insensitive test"
        },
        {
            check: "test_1 x_y x",
            x: "x",
            y: "y",
            expected: ["test_1", "x_y"],
            description: "Test with underscores"
        },
        {
            check: "",
            x: "x",
            y: "y",
            expected: [],
            description: "Empty string test"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = foo(testCase.check, testCase.x, testCase.y);
        const passed = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
        console.log(`Test ${index + 1} (${testCase.description}): ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`  Input: "${testCase.check}"`);
        console.log(`  X: "${testCase.x}", Y: "${testCase.y}"`);
        console.log(`  Expected: ${JSON.stringify(testCase.expected)}`);
        console.log(`  Got: ${JSON.stringify(result)}`);
        console.log();
    });
}

// Run tests
runTests();

module.exports = { foo };
