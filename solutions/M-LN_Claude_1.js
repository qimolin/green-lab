function foo(n) {
    // Create an array of numbers from 1 to n
    const numbers = Array.from({length: n}, (_, i) => i + 1);

    // Sort the numbers lexicographically
    return numbers.sort((a, b) => {
        // Convert numbers to strings for lexicographical comparison
        const strA = a.toString();
        const strB = b.toString();

        return strA.localeCompare(strB);
    });
}

// Example usage:
console.log(foo(15));
// Output: [1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9]

// Another example:
console.log(foo(5));
// Output: [1, 2, 3, 4, 5]

module.exports = { foo };
