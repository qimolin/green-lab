function foo(n) {
    // Create an array with all numbers from 1 to n
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i.toString()); // Convert each number to a string for lexicographical comparison
    }

    // Sort the array lexicographically
    arr.sort();

    // Convert the sorted string array back to numbers
    return arr.map(Number);
}

// Example usage:
console.log(foo(20));  // Output: [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 3, 4, 5, 6, 7, 8, 9]

module.exports = { foo };
