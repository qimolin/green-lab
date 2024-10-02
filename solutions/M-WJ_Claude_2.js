function foo(x, y, target) {
    // Set to keep track of visited states
    const visited = new Set();
    // Queue for BFS
    const queue = [];

    // Helper function to add state to queue if not visited
    function addState(state) {
        const stateStr = state.join(',');
        if (!visited.has(stateStr)) {
            visited.add(stateStr);
            queue.push(state);
        }
    }

    // Add initial state [0, 0]
    addState([0, 0]);

    while (queue.length > 0) {
        const [jug1, jug2] = queue.shift();

        // Check if target is reached
        if (jug1 === target || jug2 === target || jug1 + jug2 === target) {
            return true;
        }

        // Try all possible operations

        // Fill jug1
        addState([x, jug2]);

        // Fill jug2
        addState([jug1, y]);

        // Empty jug1
        addState([0, jug2]);

        // Empty jug2
        addState([jug1, 0]);

        // Pour from jug1 to jug2
        const pour1to2 = Math.min(jug1, y - jug2);
        addState([jug1 - pour1to2, jug2 + pour1to2]);

        // Pour from jug2 to jug1
        const pour2to1 = Math.min(jug2, x - jug1);
        addState([jug1 + pour2to1, jug2 - pour2to1]);
    }

    // If we've exhausted all possibilities and haven't found a solution
    return false;
}
