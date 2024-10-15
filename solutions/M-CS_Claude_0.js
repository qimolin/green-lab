function foo(nums) {
    // Handle empty array
    if (nums.length === 0) return 0;

    // Create a Set for O(1) lookups
    const numSet = new Set(nums);
    let maxLength = 0;

    // Iterate through each number
    for (const num of numSet) {
        // Only start checking sequences from the smallest number in the sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;

            // Count consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            // Update maxLength if current sequence is longer
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}

// Example usage:
console.log(foo([100, 4, 200, 1, 3, 2])); // Output: 4 (sequence: 1, 2, 3, 4)
console.log(foo([0, 3, 7, 2, 5, 8, 4, 6, 1])); // Output: 9 (sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8)
console.log(foo([])); // Output: 0

export default foo;
