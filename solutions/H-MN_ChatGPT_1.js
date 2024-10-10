function foo(a, b, n) {
  const MOD = 1e9 + 7;

  // Helper function to calculate the greatest common divisor (GCD) using Euclid's algorithm
  function gcd(x, y) {
    while (y !== 0) {
      let temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }

  // Helper function to calculate the least common multiple (LCM)
  function lcm(x, y) {
    return (x * y) / gcd(x, y);
  }

  // Binary search to find the nth magical number
  let low = Math.min(a, b);
  let high = n * low;
  const lcmAB = lcm(a, b);

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    // Count how many numbers are divisible by a or b
    let count =
      Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcmAB);

    if (count < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low % MOD;
}

export default foo;
