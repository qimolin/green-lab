function foo(gas, cost) {
    // Edge case: if total gas is less than total cost, no solution exists
    const totalGas = gas.reduce((sum, current) => sum + current, 0);
    const totalCost = cost.reduce((sum, current) => sum + current, 0);
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
// const gas = [1,2,3,4,5];
// const cost = [3,4,5,1,2];
// console.log(foo(gas, cost)); // Output: 3

// Example explanation:
// Start at station 3 (index 3)
// - Start with tank = 0
// - Add gas[3] = 4, subtract cost[3] = 1, tank = 3
// - Add gas[4] = 5, subtract cost[4] = 2, tank = 6
// - Add gas[0] = 1, subtract cost[0] = 3, tank = 4
// - Add gas[1] = 2, subtract cost[1] = 4, tank = 2
// - Add gas[2] = 3, subtract cost[2] = 5, tank = 0
// Completed the circuit, so return 3

export default foo;
