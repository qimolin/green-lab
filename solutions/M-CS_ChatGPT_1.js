function foo(nums) {
  // Create a set to store unique elements from the array
  const numSet = new Set(nums);
  let longestStreak = 0;

  // Iterate through the array
  for (let num of numSet) {
    // Check if this number is the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      // Count the consecutive elements
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      // Update the longest streak if current streak is longer
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}

export default foo;
