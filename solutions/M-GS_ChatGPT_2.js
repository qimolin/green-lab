function foo(gas, cost) {
  const n = gas.length;
  let totalGas = 0;
  let totalCost = 0;
  let currentGas = 0;
  let startingStation = 0;

  for (let i = 0; i < n; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currentGas += gas[i] - cost[i];

    // If current gas is negative, we cannot reach the next station from the current starting station
    if (currentGas < 0) {
      // Reset the starting station to the next one and reset the current gas
      startingStation = i + 1;
      currentGas = 0;
    }
  }

  // If total gas is less than total cost, it's impossible to complete the circuit
  return totalGas >= totalCost ? startingStation : -1;
}

export default foo;
