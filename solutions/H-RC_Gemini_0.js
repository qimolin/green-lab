function foo(r, c, S) {
  // Initialize the maze with boundaries and obstacles
  const maze = [];
  for (let i = -1; i <= r; i++) {
    const row = [];
    for (let j = -1; j <= c; j++) {
      if (i === -1 || i === r || j === -1 || j === c) {
        row.push(-2); // Boundary cell
      } else if (S[i][j] === 1) {
        row.push(-1); // Obstacle cell
      } else {
        row.push(0); // Empty cell
      }
    }
    maze.push(row);
  }

  // Function to explore the maze using BFS
  function exploreMaze() {
    const queue = [[0, 0, 0]]; // Starting position with initial color 0
    const visited = new Set();
    const parent = new Map();

    while (queue.length > 0) {
      const [currentRow, currentCol, currentColor] = queue.shift();
      const key = `${currentRow},${currentCol}`;

      if (visited.has(key)) {
        continue;
      }
      visited.add(key);

      // Mark the current cell with the current color
      maze[currentRow][currentCol] = currentColor;

      // Check if reached the destination
      if (currentRow === r - 1 && currentCol === c - 1) {
        break;
      }

      // Explore adjacent cells
      const directions = [
        [-1, 0], // North
        [0, 1], // East
        [1, 0], // South
        [0, -1], // West
      ];

      for (const [dr, dc] of directions) {
        const newRow = currentRow + dr;
        const newCol = currentCol + dc;
        const newKey = `${newRow},${newCol}`;

        if (
          newRow >= 0 &&
          newRow < r &&
          newCol >= 0 &&
          newCol < c &&
          maze[newRow][newCol] !== -1 &&
          !visited.has(newKey)
        ) {
          queue.push([newRow, newCol, currentColor + 1]);
          parent.set(newKey, key);
        }
      }
    }

    // Backtrack to find the shortest path
    let path = [];
    let current = `${r - 1},${c - 1}`;
    while (current) {
      path.unshift(current.split(',').map(Number));
      current = parent.get(current);
    }

    return path;
  }

  // Explore the maze and get the shortest path
  const shortestPath = exploreMaze();

  // Reset the maze and mark the shortest path with color 1
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (S[i][j] === 0) {
        maze[i][j] = 0; // Reset empty cells
      }
    }
  }

  for (const [row, col] of shortestPath) {
    maze[row][col] = 1; // Mark shortest path
  }

  return maze;
}
export default foo;
