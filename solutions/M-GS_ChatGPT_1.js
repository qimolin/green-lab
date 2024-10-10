function foo(gas, cost) {
  const n = gas.length;
  let totalGas = 0,
    totalCost = 0;
  let currentGas = 0,
    startStation = 0;

  for (let i = 0; i < n; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currentGas += gas[i] - cost[i];

    // If currentGas is negative, it means we cannot reach the next station
    // from the current startStation, so we move the startStation forward
    if (currentGas < 0) {
      startStation = i + 1;
      currentGas = 0; // Reset currentGas for the next segment
    }
  }

  // If totalGas is less than totalCost, it is impossible to complete the circuit
  return totalGas >= totalCost ? startStation : -1;
}

export default foo;
