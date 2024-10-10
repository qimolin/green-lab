function foo(nums) {
    // Helper function to calculate GCD using Euclidean algorithm
    function gcd(a, b) {
        while (b) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    const n = nums.length / 2;
    const memo = new Map();

    // Helper function for recursive dynamic programming
    function dp(mask, operation) {
        if (operation === n + 1) return 0;

        const key = `${mask}-${operation}`;
        if (memo.has(key)) return memo.get(key);

        let maxScore = 0;

        // Try all possible pairs of remaining numbers
        for (let i = 0; i < nums.length; i++) {
            if ((mask & (1 << i)) === 0) continue; // Skip if number already used

            for (let j = i + 1; j < nums.length; j++) {
                if ((mask & (1 << j)) === 0) continue; // Skip if number already used

                // Calculate new mask after removing these two numbers
                const newMask = mask & ~(1 << i) & ~(1 << j);

                // Calculate score for this operation and add recursive result
                const score = operation * gcd(nums[i], nums[j]) + dp(newMask, operation + 1);

                maxScore = Math.max(maxScore, score);
            }
        }

        memo.set(key, maxScore);
        return maxScore;
    }

    // Initial mask with all bits set to 1 (all numbers available)
    const initialMask = (1 << nums.length) - 1;

    return dp(initialMask, 1);
}

export default foo;
