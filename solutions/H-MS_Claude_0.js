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

    // Helper function to generate a unique key for memoization
    function getKey(arr, op) {
        return `${arr.sort().join(',')}-${op}`;
    }

    function dp(currentNums, operation) {
        if (currentNums.length === 0) return 0;

        const key = getKey(currentNums, operation);
        if (memo.has(key)) return memo.get(key);

        let maxScore = 0;

        // Try all possible pairs
        for (let i = 0; i < currentNums.length; i++) {
            for (let j = i + 1; j < currentNums.length; j++) {
                const x = currentNums[i];
                const y = currentNums[j];
                const score = operation * gcd(x, y);

                // Create new array without x and y
                const newNums = [...currentNums.slice(0, i), ...currentNums.slice(i + 1, j), ...currentNums.slice(j + 1)];

                const remainingScore = dp(newNums, operation + 1);
                maxScore = Math.max(maxScore, score + remainingScore);
            }
        }

        memo.set(key, maxScore);
        return maxScore;
    }

    return dp(nums, 1);
}

export default foo;
