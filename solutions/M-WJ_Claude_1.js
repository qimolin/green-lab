/**
 * Determines if it's possible to measure exactly 'target' units of water
 * using two jugs of capacity 'x' and 'y'.
 * @param {number} x - Capacity of the first jug
 * @param {number} y - Capacity of the second jug
 * @param {number} target - Target amount of water to measure
 * @returns {boolean} - Whether it's possible to measure the target amount
 */
function foo(x, y, target) {
  // If target is greater than the sum of jug capacities, it's impossible
  if (target > x + y) return false;

  // Set to keep track of visited states
  const visited = new Set();
  // Queue for BFS
  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [a, b] = queue.shift();

    // Check if current state has been visited
    const state = `${a},${b}`;
    if (visited.has(state)) continue;
    visited.add(state);

    // Check if target is reached
    if (a + b === target) return true;

    // Try all possible operations

    // Fill jug 1
    if (!visited.has(`${x},${b}`)) queue.push([x, b]);

    // Fill jug 2
    if (!visited.has(`${a},${y}`)) queue.push([a, y]);

    // Empty jug 1
    if (!visited.has(`0,${b}`)) queue.push([0, b]);

    // Empty jug 2
    if (!visited.has(`${a},0`)) queue.push([a, 0]);

    // Pour from jug 1 to jug 2
    const pour1to2 = Math.min(a, y - b);
    if (!visited.has(`${a - pour1to2},${b + pour1to2}`))
      queue.push([a - pour1to2, b + pour1to2]);

    // Pour from jug 2 to jug 1
    const pour2to1 = Math.min(b, x - a);
    if (!visited.has(`${a + pour2to1},${b - pour2to1}`))
      queue.push([a + pour2to1, b - pour2to1]);
  }

  return false;
}

// Test cases
console.log(foo(3, 5, 4)); // true
console.log(foo(2, 6, 5)); // false
console.log(foo(4, 3, 2)); // true

export default foo;
