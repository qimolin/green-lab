function gcd(x, y) {
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function foo(nums) {
  const n = nums.length / 2;
  const memo = new Map();

  // Recursive function to calculate the maximum score
  function dp(mask, op) {
    if (op > n) return 0; // Base case: all operations are done

    if (memo.has(mask)) return memo.get(mask);

    let maxScore = 0;

    // Try all pairs of elements that haven't been picked yet
    for (let i = 0; i < nums.length; i++) {
      if (mask & (1 << i)) continue; // Skip if the i-th element has already been picked
      for (let j = i + 1; j < nums.length; j++) {
        if (mask & (1 << j)) continue; // Skip if the j-th element has already been picked

        // Calculate new mask with i and j elements picked
        const newMask = mask | (1 << i) | (1 << j);

        // Calculate the score for this pair
        const currentScore = op * gcd(nums[i], nums[j]);

        // Recursively calculate the maximum score for the next operation
        const totalScore = currentScore + dp(newMask, op + 1);

        // Update the maximum score
        maxScore = Math.max(maxScore, totalScore);
      }
    }

    memo.set(mask, maxScore);
    return maxScore;
  }

  // Start with no elements picked (mask = 0) and operation 1
  return dp(0, 1);
}

export default foo;
