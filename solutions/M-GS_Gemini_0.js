/*
  You are given two integer arrays gas and cost, both of length n,
  where gas[i] represents the amount of gas at the ith station,
  and cost[i] represents the cost to travel from the ith station
  to the next (i + 1)th station.

  The task is to determine if there exists a starting gas station
  from which you can travel around the circuit once in the clockwise
  direction, and if so, return the index of that starting station.

  If there is no solution, return -1. If a solution exists, it is
  guaranteed to be unique.
*/
const foo = (gas, cost) => {
  let totalTank = 0;  // Track the total remaining gas
  let currTank = 0;   // Track the current tank level
  let startStation = 0; // Potential starting station

  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];

    // If we can't reach the next station from the current one
    if (currTank < 0) {
      // Reset the current tank and try starting from the next station
      startStation = i + 1;
      currTank = 0;
    }
  }

  // If the total gas is less than 0, no solution exists
  return totalTank >= 0 ? startStation : -1;
};

export default foo;
