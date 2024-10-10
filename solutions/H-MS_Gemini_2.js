function foo(nums) {
  /**
   * Calculates the greatest common divisor (GCD) of two integers using Euclid's algorithm.
   *
   * @param {number} x - The first integer.
   * @param {number} y - The second integer.
   * @returns {number} The GCD of x and y.
   */
  function gcd(x, y) {
    if (y === 0) {
      return x;
    }
    return gcd(y, x % y);
  }

  // Sort the array in descending order to prioritize larger numbers
  nums.sort((a, b) => b - a);

  let score = 0;
  let i = 1;

  while (nums.length > 0) {
    const x = nums.shift(); // Remove the first element (largest)
    const y = nums.shift(); // Remove the second element (next largest)
    score += i * gcd(x, y);
    i++;
  }

  return score;
}

export default foo;
