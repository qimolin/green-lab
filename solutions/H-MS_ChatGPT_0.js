function foo(nums) {
  // Helper function to calculate gcd of two numbers
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  const n = nums.length / 2;
  const memo = new Map();

  // Backtracking function with memoization
  function backtrack(op, mask) {
    if (op > n) return 0; // If we have performed all operations, return 0

    const memoKey = `${op}-${mask}`;
    if (memo.has(memoKey)) return memo.get(memoKey);

    let maxScore = 0;

    // Try every pair of numbers that haven't been used yet (indicated by mask)
    for (let i = 0; i < nums.length; i++) {
      if ((mask & (1 << i)) !== 0) continue; // If the ith element is already used
      for (let j = i + 1; j < nums.length; j++) {
        if ((mask & (1 << j)) !== 0) continue; // If the jth element is already used

        // Calculate the score for this pair
        const newMask = mask | (1 << i) | (1 << j);
        const currentScore = op * gcd(nums[i], nums[j]);

        // Backtrack and get the maximum score for the remaining elements
        const totalScore = currentScore + backtrack(op + 1, newMask);

        // Update the maximum score
        maxScore = Math.max(maxScore, totalScore);
      }
    }

    memo.set(memoKey, maxScore); // Memoize the result
    return maxScore;
  }

  // Start the backtracking from operation 1 with no numbers used (mask = 0)
  return backtrack(1, 0);
}

// Example usage:
const nums = [1, 2, 3, 4, 5, 6]; // Example input array
console.log(foo(nums)); // Expected output: the maximum score

export default foo;
