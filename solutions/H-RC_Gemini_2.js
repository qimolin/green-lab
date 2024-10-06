function foo(r, c, S) {
  // Initialize the maze with a border of obstacles
  const maze = [];
  for (let i = -1; i <= r; i++) {
    maze[i] = [];
    for (let j = -1; j <= c; j++) {
      if (i === -1 || i === r || j === -1 || j === c) {
        maze[i][j] = -2; // Boundary cell
      } else {
        maze[i][j] = S[i][j] === 1 ? -1 : 0; // Obstacle or empty cell
      }
    }
  }

  // Initialize the robot's position and the path
  let currentRow = 0;
  let currentCol = 0;
  const path = [];

  // Function to explore the maze recursively
  function explore(row, col, color) {
    // If the robot is at the destination, mark the path and terminate
    if (row === r - 1 && col === c - 1) {
      markPath(path);
      return true;
    }

    // If the cell is invalid or already visited, return false
    if (
      maze[row][col] === -1 || // Obstacle
      maze[row][col] === -2 || // Boundary
      maze[row][col] >= color // Already visited with a lower or equal color
    ) {
      return false;
    }

    // Mark the current cell with the current color
    maze[row][col] = color;
    path.push({ row, col });

    // Explore adjacent cells with an incremented color
    if (
      explore(row, col - 1, color + 1) || // West
      explore(row + 1, col, color + 1) || // South
      explore(row, col + 1, color + 1) || // East
      explore(row - 1, col, color + 1) // North
    ) {
      return true;
    }

    // If no path is found from this cell, backtrack
    path.pop();
    return false;
  }

  // Function to mark the shortest path with 1s
  function markPath(path) {
    for (const cell of path) {
      maze[cell.row][cell.col] = 1;
    }
  }

  // Start the exploration from the starting cell
  explore(0, 0, 1);

  // Remove the border and return the maze
  const result = maze.slice(0, r);
  for (let i = 0; i < r; i++) {
    result[i] = result[i].slice(0, c);
  }
  return result;
}
module.exports = { foo };
