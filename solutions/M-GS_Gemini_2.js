/*
  You are given two integer arrays gas and cost, both of length n, where gas[i] represents the amount of gas at the ith station and cost[i] represents the cost to travel from the ith station to the next (i+1)th station.

  The goal is to find the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.

  Examples:

  foo([1,2,3,4,5], [3,4,5,1,2]) === 3
  foo([2,3,4], [3,4,3]) === -1
*/
const foo = (gas, cost) => {
  let totalTank = 0;
  let currTank = 0;
  let startingStation = 0;

  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];
    // If we can't reach the next station from the current station,
    // reset the starting station to the next one and reset currTank to 0
    if (currTank < 0) {
      startingStation = i + 1;
      currTank = 0;
    }
  }

  // If the total gas is less than the total cost, it's impossible to complete the circuit
  return totalTank >= 0 ? startingStation : -1;
};

export default foo;
