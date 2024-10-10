function foo(nums) {
    const n = Math.log2(nums.length);
    const memo = new Map();

    // Helper function to calculate GCD using Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Recursive function to calculate maximum score
    function calculateMaxScore(remainingNums, operation) {
        if (remainingNums.length === 0) return 0;

        // Create a key for memoization
        const key = remainingNums.sort((a, b) => a - b).join(',') + '|' + operation;

        if (memo.has(key)) return memo.get(key);

        let maxScore = 0;

        // Try all possible pairs
        for (let i = 0; i < remainingNums.length; i++) {
            for (let j = i + 1; j < remainingNums.length; j++) {
                const x = remainingNums[i];
                const y = remainingNums[j];

                // Calculate score for this operation
                const currentScore = operation * gcd(x, y);

                // Create new array without x and y
                const newNums = remainingNums.filter((_, index) => index !== i && index !== j);

                // Recursive call for remaining numbers
                const futureScore = calculateMaxScore(newNums, operation + 1);

                maxScore = Math.max(maxScore, currentScore + futureScore);
            }
        }

        memo.set(key, maxScore);
        return maxScore;
    }

    return calculateMaxScore(nums, 1);
}

// Example test cases
console.log(foo([1, 2, 3, 4])); // Expected output: 13
console.log(foo([1, 2, 3, 4, 5, 6, 7, 8])); // Expected output: 54

export default foo;
