function foo(a, b, n) {
    const MOD = 1000000007;

    // Find LCM of a and b
    const lcm = (a * b) / gcd(a, b);

    // Binary search to find the nth magical number
    let left = Math.min(a, b);
    let right = n * Math.min(a, b);

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        // Count of magical numbers less than or equal to mid
        const count = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm);

        if (count < n) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left % MOD;
}

// Helper function to find GCD using Euclidean algorithm
function gcd(x, y) {
    while (y) {
        let temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

// Test cases
console.log(foo(2, 3, 4));  // Should output 6
console.log(foo(4, 6, 8));  // Should output 12

export default foo;

