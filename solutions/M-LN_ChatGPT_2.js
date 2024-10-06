function foo(n) {
    // Create an array of numbers from 1 to n
    const numbers = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i.toString()); // Convert each number to a string for lexicographical sorting
    }
    
    // Sort the numbers lexicographically
    numbers.sort();
    
    // Convert the array elements back to integers
    return numbers.map(Number);
}

// Example usage:
console.log(foo(20)); // Output: [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 3, 4, 5, 6, 7, 8, 9]

module.exports = { foo };
