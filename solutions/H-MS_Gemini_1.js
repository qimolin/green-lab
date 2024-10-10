function foo(nums) {
  // Helper function to calculate the Greatest Common Divisor (GCD)
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  // Sort the array in descending order
  nums.sort((a, b) => b - a);

  let score = 0;
  let i = 1;

  // Iterate through the array, taking the two largest elements at a time
  while (nums.length > 0) {
    const x = nums.shift(); // Remove the first element (largest)
    const y = nums.shift(); // Remove the second element (second largest)
    score += i * gcd(x, y);
    i++;
  }

  return score;
}

export default foo;
