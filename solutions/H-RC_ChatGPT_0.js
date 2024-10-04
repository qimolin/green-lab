function foo(H, W, S) {
  // Directions to move: [rowOffset, colOffset] -> [North, South, East, West]
  const directions = [
    [-1, 0], // North
    [1, 0], // South
    [0, 1], // East
    [0, -1], // West
  ];

  // Initialize the result array with 0
  let result = Array.from({ length: H }, () => Array(W).fill(0));

  // BFS queue: stores [row, col, pathLength, parent]
  let queue = [[0, 0, null]]; // Start at (0, 0) with no parent
  let visited = Array.from({ length: H }, () => Array(W).fill(false));
  visited[0][0] = true;

  // To keep track of the parent for each cell to reconstruct the shortest path
  let parents = Array.from({ length: H }, () => Array(W).fill(null));

  // Perform BFS
  while (queue.length > 0) {
    let [curRow, curCol, parent] = queue.shift();

    // If we reached the bottom-right corner, reconstruct the path
    if (curRow === H - 1 && curCol === W - 1) {
      // Mark the path by following the parent pointers
      let row = curRow;
      let col = curCol;
      while (row !== null && col !== null) {
        result[row][col] = 1; // Mark the shortest path
        [row, col] = parents[row][col]; // Move to parent
      }
      return result;
    }

    // Try moving in all 4 possible directions
    for (let [rowOffset, colOffset] of directions) {
      let newRow = curRow + rowOffset;
      let newCol = curCol + colOffset;

      // Check if the new position is within bounds and is empty (S[newRow][newCol] === 0)
      if (
        newRow >= 0 &&
        newRow < H &&
        newCol >= 0 &&
        newCol < W &&
        !visited[newRow][newCol] &&
        S[newRow][newCol] === 0
      ) {
        visited[newRow][newCol] = true;
        parents[newRow][newCol] = [curRow, curCol]; // Set parent for path reconstruction
        queue.push([newRow, newCol, [curRow, curCol]]);
      }
    }
  }

  // If no path was found, return the result filled with 0 (no valid path exists)
  return result;
}

// Example usage:
const maze = [
  [0, 0, 0, 1],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
];

const H = 4;
const W = 4;

console.log(foo(H, W, maze));
