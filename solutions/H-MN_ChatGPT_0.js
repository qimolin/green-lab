function foo(a, b, n) {
  const MOD = 1e9 + 7;

  // Helper function to calculate the least common multiple (LCM) of two numbers
  const lcm = (x, y) => (x * y) / gcd(x, y);

  // Helper function to calculate the greatest common divisor (GCD) using Euclid's algorithm
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

  // Binary search for nth magical number
  let low = Math.min(a, b);
  let high = n * Math.min(a, b);
  const lcm_ab = lcm(a, b);

  while (low < high) {
    let mid = Math.floor((low + high) / 2);

    // Count the number of magical numbers <= mid
    let count =
      Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm_ab);

    if (count < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low % MOD;
}

export default foo;
