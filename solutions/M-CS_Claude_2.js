function foo(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return 0;

    // Create a Set for O(1) lookup
    const numSet = new Set(nums);
    let longestStreak = 0;

    // Iterate through each number
    for (const num of numSet) {
        // Only start checking sequences from the smallest number in the sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // Check consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // Update longest streak if current streak is longer
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}

// Test cases
console.log(foo([100, 4, 200, 1, 3, 2])); // Output: 4 (The sequence is 1, 2, 3, 4)
console.log(foo([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // Output: 9 (The sequence is 0, 1, 2, 3, 4, 5, 6, 7, 8)

export default foo;
