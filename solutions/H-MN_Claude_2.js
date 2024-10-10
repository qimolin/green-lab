function foo(a, b, n) {
    const MOD = 1000000007;

    // Find LCM of a and b
    function gcd(x, y) {
        if (y === 0) return x;
        return gcd(y, x % y);
    }

    function lcm(x, y) {
        return Math.floor((x * y) / gcd(x, y));
    }

    const lcmVal = lcm(a, b);

    // Binary search to find the nth magical number
    let left = Math.min(a, b);
    let right = n * Math.min(a, b);

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        // Count of magical numbers less than or equal to mid
        const count = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcmVal);

        if (count < n) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left % MOD;
}

export default foo;

