function foo(nums) {
  if (nums == null || nums.length === 0) {
    return 0;
  }

  const numSet = new Set(nums); // Use a Set for efficient lookups
  let longestStreak = 0;

  for (let num of nums) {
    if (!numSet.has(num - 1)) { // Check if it's the start of a sequence
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}

export default foo;
