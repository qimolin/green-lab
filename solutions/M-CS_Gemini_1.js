function foo(arr) {
  if (arr.length === 0) {
    return 0; // Handle empty array case
  }

  const numSet = new Set(arr); // Create a set for efficient lookups
  let longestStreak = 0;

  for (const num of arr) {
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
