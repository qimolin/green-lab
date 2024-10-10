function foo(a, b, n) {
  const MOD = 1000000007;
  
  // Calculate the greatest common divisor (GCD) of a and b
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  // Calculate the least common multiple (LCM) of a and b
  const lcm = (a * b) / gcd(a, b);

  // Binary search to find the nth magical number
  let low = 1;
  let high = Math.min(a, b) * n;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const count =
      Math.floor(mid / a) +
      Math.floor(mid / b) -
      Math.floor(mid / lcm);
    if (count < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low % MOD;
}

export default foo;