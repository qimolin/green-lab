function foo(gas, cost) {
    // Edge case: if total gas is less than total cost, no solution exists
    const totalGas = gas.reduce((sum, curr) => sum + curr, 0);
    const totalCost = cost.reduce((sum, curr) => sum + curr, 0);
    if (totalGas < totalCost) return -1;

    let start = 0;
    let tank = 0;

    for (let i = 0; i < gas.length; i++) {
        tank += gas[i] - cost[i];

        // If we can't reach the next station
        if (tank < 0) {
            // Reset and try starting from the next station
            start = i + 1;
            tank = 0;
        }
    }

    return start;
}

// Example usage:
const gas1 = [1, 2, 3, 4, 5];
const cost1 = [3, 4, 5, 1, 2];
console.log(foo(gas1, cost1)); // Output: 3

const gas2 = [2, 3, 4];
const cost2 = [3, 4, 3];
console.log(foo(gas2, cost2)); // Output: -1

export default foo;
