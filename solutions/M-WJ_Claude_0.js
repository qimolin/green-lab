function foo(x, y, target) {
    // Create a Set to keep track of visited states
    const visited = new Set();

    // Create a queue for BFS
    const queue = [];

    // Add initial state (0, 0)
    queue.push([0, 0]);
    visited.add('0,0');

    while (queue.length > 0) {
        const [currX, currY] = queue.shift();

        // Check if target is reached
        if (currX + currY === target) {
            return true;
        }

        // Try all possible operations

        // 1. Fill jug X
        tryOperation(x, currY);

        // 2. Fill jug Y
        tryOperation(currX, y);

        // 3. Empty jug X
        tryOperation(0, currY);

        // 4. Empty jug Y
        tryOperation(currX, 0);

        // 5. Pour from X to Y
        const pourXToY = Math.min(currX, y - currY);
        tryOperation(currX - pourXToY, currY + pourXToY);

        // 6. Pour from Y to X
        const pourYToX = Math.min(currY, x - currX);
        tryOperation(currX + pourYToX, currY - pourYToX);
    }

    // Helper function to try an operation
    function tryOperation(newX, newY) {
        const state = `${newX},${newY}`;
        if (!visited.has(state)) {
            visited.add(state);
            queue.push([newX, newY]);
        }
    }

    // If we've exhausted all possibilities and haven't found a solution
    return false;
}

// Test cases
console.log(foo(3, 5, 4));  // true
console.log(foo(2, 6, 5));  // false
console.log(foo(4, 3, 2));  // true

module.exports = { foo };
