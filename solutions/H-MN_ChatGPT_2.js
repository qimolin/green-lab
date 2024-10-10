function gcd(x, y) {
  while (y !== 0) {
    let temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function lcm(x, y) {
  return (x * y) / gcd(x, y);
}

function foo(a, b, n) {
  const MOD = 10 ** 9 + 7;

  // Function to count numbers <= x that are divisible by either a or b
  function countMagicalNumbers(x, a, b, lcm_ab) {
    return Math.floor(x / a) + Math.floor(x / b) - Math.floor(x / lcm_ab);
  }

  // Compute LCM of a and b
  const lcm_ab = lcm(a, b);

  // Binary search for the nth magical number
  let low = 1,
    high = n * Math.min(a, b);
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (countMagicalNumbers(mid, a, b, lcm_ab) < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  // Return the result modulo 10^9 + 7
  return low % MOD;
}

export default foo;
