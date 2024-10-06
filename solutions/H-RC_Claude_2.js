function foo(r, c, S) {
    // Create a copy of the input maze where:
    // 0 = empty, -1 = obstacle, -2 = boundary
    let maze = Array(r + 2).fill().map(() => Array(c + 2).fill(-2));
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            maze[i + 1][j + 1] = S[i][j] === 1 ? -1 : 0;
        }
    }

    // Directions: up, right, down, left
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];

    // BFS to find shortest path
    let queue = [[1, 1]]; // Starting at (0,0) in the padded maze
    let visited = new Set(['1,1']);
    let parent = new Map();
    let found = false;

    while (queue.length > 0 && !found) {
        let [x, y] = queue.shift();

        if (x === r && y === c) {
            found = true;
            break;
        }

        for (let i = 0; i < 4; i++) {
            let newX = x + dx[i];
            let newY = y + dy[i];
            let key = `${newX},${newY}`;

            if (!visited.has(key) && maze[newX][newY] === 0) {
                queue.push([newX, newY]);
                visited.add(key);
                parent.set(key, [x, y]);
            }
        }
    }

    // Create result maze and mark the path
    let result = Array(r).fill().map(() => Array(c).fill(0));

    if (found) {
        let current = [r, c];
        while (current[0] !== 1 || current[1] !== 1) {
            result[current[0] - 1][current[1] - 1] = 1;
            current = parent.get(`${current[0]},${current[1]}`);
        }
        result[0][0] = 1; // Mark the starting position
    }

    return result;
}

// Test the function
let testMaze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [1, 1, 1, 0]
];

let result = foo(4, 4, testMaze);
console.log("Test maze:");
testMaze.forEach(row => console.log(row.join(' ')));
console.log("\nResult (path marked with 1s):");
result.forEach(row => console.log(row.join(' ')));

module.exports = { foo };
