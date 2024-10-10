function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function foo(nums) {
  const n = nums.length / 2;
  const memo = new Map();

  function dp(mask, op) {
    if (op > n) return 0;
    if (memo.has(mask)) return memo.get(mask);

    let maxScore = 0;

    // Try all pairs of elements (x, y)
    for (let i = 0; i < nums.length; i++) {
      if ((mask & (1 << i)) !== 0) continue; // Skip if already used

      for (let j = i + 1; j < nums.length; j++) {
        if ((mask & (1 << j)) !== 0) continue; // Skip if already used

        // Calculate the score for this pair
        const newMask = mask | (1 << i) | (1 << j);
        const score = op * gcd(nums[i], nums[j]);

        // Recur with the updated mask
        const totalScore = score + dp(newMask, op + 1);
        maxScore = Math.max(maxScore, totalScore);
      }
    }

    memo.set(mask, maxScore);
    return maxScore;
  }

  return dp(0, 1);
}

// Example usage:
console.log(foo([3, 4, 6, 8])); // Example input, the function will return the maximum score

export default foo;
