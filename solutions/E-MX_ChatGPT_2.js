function foo(inputString, x, y) {
    // Create a regex that matches any word but not the words 'x' or 'y' (case-insensitive)
    let regex = new RegExp(`\\b(?!${x}\\b|${y}\\b)\\w+`, 'gi');

    // Match the words based on the regex
    let matches = inputString.match(regex);

    // Return the matches or an empty array if no match is found
    return matches || [];
}

// Example usage
let text = "This is a sample text with xy, xx, x, and y.";
let x = "x";
let y = "y";

console.log(foo(text, x, y)); // Example Output: ['This', 'is', 'a', 'sample', 'text', 'with', 'xy', 'xx']

module.exports = { foo };
