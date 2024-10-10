/*
  You are given two integer arrays gas and cost, both of length n,
  where gas[i] represents the amount of gas at the ith station, and
  cost[i] represents the cost to travel from the ith station to the
  next (i + 1)th station. You begin the journey with an empty tank at
  one of the gas stations.

  Given these two arrays, return the starting gas station's index if
  you can travel around the circuit once in the clockwise direction,
  otherwise return -1. If there exists a solution, it is guaranteed
  to be unique.
*/
const foo = (gas, cost) => {
  let totalTank = 0;
  let currTank = 0;
  let startingStation = 0;

  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];
    // If we cannot reach the next station from the current station,
    // mark the next station as the potential starting point
    if (currTank < 0) {
      startingStation = i + 1;
      currTank = 0;
    }
  }

  // If total gas is less than total cost, a solution doesn't exist
  return totalTank >= 0 ? startingStation : -1;
};

export default foo;
