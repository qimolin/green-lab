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
    const queue = [[0, 0, 0]]; // Starting position with initial distance
    maze[0][0] = 1; // Mark the starting cell as visited

    while (queue.length > 0) {
      const [currentRow, currentCol, distance] = queue.shift();

      // Check if reached the destination
      if (currentRow === r - 1 && currentCol === c - 1) {
        return distance;
      }

      // Explore adjacent cells
      const directions = [
        [-1, 0], // North
        [1, 0], // South
        [0, -1], // West
        [0, 1], // East
      ];
      for (const [dr, dc] of directions) {
        const newRow = currentRow + dr;
        const newCol = currentCol + dc;
        if (
          newRow >= 0 &&
          newRow < r &&
          newCol >= 0 &&
          newCol < c &&
          maze[newRow][newCol] === 0
        ) {
          maze[newRow][newCol] = distance + 1; // Mark the cell with distance
          queue.push([newRow, newCol, distance + 1]);
        }
      }
    }

    return -1; // No path found (shouldn't happen in this scenario)
  }

  // Find the shortest path length
  const shortestPathLength = exploreMaze();

  // Backtrack to mark the shortest path
  let currentRow = r - 1;
  let currentCol = c - 1;
  let currentDistance = shortestPathLength;
  while (currentDistance > 1) {
    const directions = [
      [-1, 0], // North
      [1, 0], // South
      [0, -1], // West
      [0, 1], // East
    ];
    for (const [dr, dc] of directions) {
      const newRow = currentRow + dr;
      const newCol = currentCol + dc;
      if (
        newRow >= 0 &&
        newRow < r &&
        newCol >= 0 &&
        newCol < c &&
        maze[newRow][newCol] === currentDistance - 1
      ) {
        maze[newRow][newCol] = 1; // Mark the cell as part of the shortest path
        currentRow = newRow;
        currentCol = newCol;
        currentDistance--;
        break;
      }
    }
  }

  // Reset unused cells to 0
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (maze[i][j] !== 1) {
        maze[i][j] = 0;
      }
    }
  }

  return maze;
}
export default foo;
