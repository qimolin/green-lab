function foo(H, W, S) {
  // Directions for moving: [rowOffset, colOffset]
  const directions = [
    [-1, 0], // North
    [1, 0], // South
    [0, -1], // West
    [0, 1], // East
  ];

  // Create a 2D array to store the shortest path with all cells initially set to 0
  let result = Array.from({ length: H }, () => Array(W).fill(0));

  // Queue for BFS: each element will be [row, col, distance, path]
  let queue = [[0, 0, 0, []]];

  // Visited array to track visited cells
  let visited = Array.from({ length: H }, () => Array(W).fill(false));
  visited[0][0] = true;

  // BFS algorithm
  while (queue.length > 0) {
    let [r, c, dist, path] = queue.shift();

    // If we've reached the destination (H-1, W-1), color the path and terminate
    if (r === H - 1 && c === W - 1) {
      // Color all cells in the shortest path with 1
      path.forEach(([pr, pc]) => {
        result[pr][pc] = 1;
      });
      result[r][c] = 1; // Include the destination itself
      return result;
    }

    // Explore adjacent cells (North, South, West, East)
    for (let [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;

      // Ensure that the new cell is within bounds and not visited, and is not an obstacle
      if (
        nr >= 0 &&
        nr < H &&
        nc >= 0 &&
        nc < W &&
        !visited[nr][nc] &&
        S[nr][nc] === 0
      ) {
        visited[nr][nc] = true; // Mark the cell as visited
        queue.push([nr, nc, dist + 1, [...path, [r, c]]]); // Add the new cell to the queue
      }
    }
  }

  // If we exit the loop without finding the target, return the original grid with no path
  return result;
}
