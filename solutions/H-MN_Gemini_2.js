function foo(a, b, n) {
  const MOD = 1000000007;
  let low = 1,
    high = Number.MAX_SAFE_INTEGER;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const count =
      Math.floor(mid / a) +
      Math.floor(mid / b) -
      Math.floor(mid / lcm(a, b));
    if (count < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low % MOD;

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
}

export default foo;
