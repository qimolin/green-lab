function foo(r, c, S) {
    // Create a copy of the maze for manipulation
    let maze = Array(r).fill().map((_, i) =>
        Array(c).fill().map((_, j) => S[i][j] === 1 ? -1 : 0)
    );

    // Create a result maze for the path
    let result = Array(r).fill().map(() => Array(c).fill(0));

    // Define directions: right, down, left, up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    // Check if a position is valid
    function isValid(x, y) {
        return x >= 0 && x < r && y >= 0 && y < c && maze[x][y] !== -1;
    }

    // BFS to find shortest path
    function bfs() {
        let queue = [[0, 0]];
        let visited = new Set(['0,0']);
        let parent = new Map();

        while (queue.length > 0) {
            let [x, y] = queue.shift();

            if (x === r - 1 && y === c - 1) {
                // Reconstruct path
                let path = [];
                let current = `${r-1},${c-1}`;
                while (current) {
                    let [cx, cy] = current.split(',').map(Number);
                    path.unshift([cx, cy]);
                    current = parent.get(current);
                }

                // Mark path in result
                for (let [px, py] of path) {
                    result[px][py] = 1;
                }

                return true;
            }

            for (let [dx, dy] of directions) {
                let newX = x + dx;
                let newY = y + dy;

                if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
                    queue.push([newX, newY]);
                    visited.add(`${newX},${newY}`);
                    parent.set(`${newX},${newY}`, `${x},${y}`);
                }
            }
        }

        return false;
    }

    // Find path and return result
    bfs();
    return result;
}
