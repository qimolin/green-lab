function foo(gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  let currentGas = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currentGas += gas[i] - cost[i];

    // If the current gas is less than 0, we can't start from this station or any before it
    if (currentGas < 0) {
      // Set the next station as the new starting point
      startStation = i + 1;
      currentGas = 0; // Reset current gas
    }
  }

  // If total gas is less than total cost, we can't complete the circuit
  return totalGas >= totalCost ? startStation : -1;
}

export default foo;
