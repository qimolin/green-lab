function foo(x, y, target) {
  // Helper function to compute the greatest common divisor (GCD) using Euclidean algorithm
  function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Base case: if target is 0, we can always achieve this by doing nothing
  if (target === 0) return true;

  // If the target is larger than the sum of the two jugs, it's impossible to achieve
  if (target > x + y) return false;

  // Check if the target is a multiple of the GCD of x and y
  return target % gcd(x, y) === 0;
}
