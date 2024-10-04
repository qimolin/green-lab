function foo(x, y, target) {
  if (target > x + y) {
    return false; // Target is impossible if it's greater than the sum of both jug capacities
  }

  const queue = [[0, 0]]; // Initial state with both jugs empty
  const visited = new Set(); // To keep track of visited states
  visited.add('0,0');

  while (queue.length > 0) {
    const [a, b] = queue.shift();

    // Check if we've reached the target amount
    if (a === target || b === target || a + b === target) {
      return true;
    }

    // List of possible next states
    const nextStates = [
      [x, b], // Fill jug x
      [a, y], // Fill jug y
      [0, b], // Empty jug x
      [a, 0], // Empty jug y
      [Math.max(a - (y - b), 0), Math.min(b + a, y)], // Pour water from x to y
      [Math.min(a + b, x), Math.max(b - (x - a), 0)], // Pour water from y to x
    ];

    // Explore each possible state
    for (const [newA, newB] of nextStates) {
      const state = `${newA},${newB}`;
      if (!visited.has(state)) {
        visited.add(state);
        queue.push([newA, newB]);
      }
    }
  }

  // If we exhaust the queue and don't find a solution, return false
  return false;
}
