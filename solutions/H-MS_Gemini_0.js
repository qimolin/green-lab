function foo(nums) {
  let n = nums.length / 2;
  nums.sort((a, b) => b - a); // Sort in descending order

  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  let maxScore = 0;
  for (let i = 1; i <= n; i++) {
    let x = nums.shift();
    let y = nums.shift();
    maxScore += i * gcd(x, y);
  }

  return maxScore;
}

export default foo;
