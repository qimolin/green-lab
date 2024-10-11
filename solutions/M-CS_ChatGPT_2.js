function foo(nums) {
  // Create a set of the numbers for O(1) lookups
  const numSet = new Set(nums);
  let longestStreak = 0;

  for (let num of numSet) {
    // Check if num is the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      // Count the length of the sequence
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      // Update the longest streak
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}

export default foo;
