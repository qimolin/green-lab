function foo(text, x, y) {
    // Create a case-insensitive regex for the forbidden words x and y
    let forbiddenRegex = new RegExp(`\\b(${x}|${y})\\b`, 'gi');

    // Create a regex for matching words formed by word characters
    let wordRegex = /\b\w+\b/g;

    // Find all matches in the text
    let allWords = text.match(wordRegex);

    // Filter out exact matches of the forbidden words
    let matchedWords = allWords.filter(word => !forbiddenRegex.test(word));

    return matchedWords;
}

// Example usage:
let text = "xx xy xyx xxz xy_xy test example";
let result = foo(text, "xy", "xx");
console.log(result);  // Output: [ 'xyx', 'xxz', 'xy_xy', 'test', 'example' ]
