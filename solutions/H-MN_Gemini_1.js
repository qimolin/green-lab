function foo(a, b, n) {
  const MOD = 1000000007;
  let low = Math.min(a, b);
  let high = Math.min(a, b) * n;
  let lcm = (a * b) / gcd(a, b);

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let count = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm);
    if (count < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low % MOD;

  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
}

export default foo;
