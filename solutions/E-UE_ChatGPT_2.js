function foo(nums) {
    // Create an object to store the frequency of each number
    let frequency = {};

    // Iterate through the array and count the occurrences of each number
    for (let num of nums) {
        frequency[num] = (frequency[num] || 0) + 1;
    }

    // Sum only the numbers that appear exactly once
    let sum = 0;
    for (let num in frequency) {
        if (frequency[num] === 1) {
            sum += parseInt(num);
        }
    }

    return sum;
}

// Example usage:
let nums = [1, 2, 3, 2, 4, 5, 3];
console.log(foo(nums)); // Output will be 10 (1 + 4 + 5)
