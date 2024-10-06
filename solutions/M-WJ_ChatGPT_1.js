function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function foo(x, y, target) {
  // If the target is greater than the combined capacities, it's impossible
  if (target > x + y) return false;

  // Check if the target is a multiple of the GCD of x and y
  const g = gcd(x, y);
  return target % g === 0;
}

module.exports = { foo };
