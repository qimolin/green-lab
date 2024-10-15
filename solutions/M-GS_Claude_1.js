function foo(gas, cost) {
    // Edge case: if total gas is less than total cost, no solution exists
    const totalGas = gas.reduce((sum, current) => sum + current, 0);
    const totalCost = cost.reduce((sum, current) => sum + current, 0);

    if (totalGas < totalCost) {
        return -1;
    }

    let currentTank = 0;
    let startStation = 0;

    for (let i = 0; i < gas.length; i++) {
        currentTank += gas[i] - cost[i];

        // If we can't reach the next station
        if (currentTank < 0) {
            // Reset the tank and try starting from the next station
            startStation = i + 1;
            currentTank = 0;
        }
    }

    return startStation;
}

// Test cases
console.log(foo([1,2,3,4,5], [3,4,5,1,2])); // Expected output: 3
console.log(foo([2,3,4], [3,4,3])); // Expected output: -1

export default foo;
