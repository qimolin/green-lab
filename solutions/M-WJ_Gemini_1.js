function foo(x, y, target) {
  // If the target is greater than the combined capacity of the jugs, it's impossible.
  if (target > x + y) {
    return false;
  }

  // If the target is not divisible by the greatest common divisor of the jug capacities, it's impossible.
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  if (target % gcd(x, y) !== 0) {
    return false;
  }

  // Otherwise, it's possible to reach the target.
  return true;
}
module.exports = { foo };
