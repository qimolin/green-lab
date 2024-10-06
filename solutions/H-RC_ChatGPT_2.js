function foo(H, W, S) {
  // Directions for moving in the maze: [row_offset, col_offset]
  const directions = [
    [-1, 0], // north
    [1, 0], // south
    [0, -1], // west
    [0, 1], // east
  ];

  // Check if a position is within bounds of the maze and is not an obstacle
  function isValid(r, c) {
    return r >= 0 && r < H && c >= 0 && c < W && S[r][c] === 0;
  }

  // BFS to find the shortest path
  function bfs() {
    let queue = [[0, 0]]; // Start from the top-left corner
    let visited = Array.from({ length: H }, () => Array(W).fill(false)); // Visited array
    let parent = Array.from({ length: H }, () => Array(W).fill(null)); // To reconstruct the path
    visited[0][0] = true;

    while (queue.length > 0) {
      let [r, c] = queue.shift();

      // If we reached the bottom-right corner, break
      if (r === H - 1 && c === W - 1) break;

      // Explore neighbors
      for (let [dr, dc] of directions) {
        let newRow = r + dr;
        let newCol = c + dc;

        if (isValid(newRow, newCol) && !visited[newRow][newCol]) {
          queue.push([newRow, newCol]);
          visited[newRow][newCol] = true;
          parent[newRow][newCol] = [r, c]; // Record where we came from
        }
      }
    }

    // If the bottom-right corner is unreachable, return null
    if (!visited[H - 1][W - 1]) return null;

    // Backtrack from the target to the start to reconstruct the path
    let path = [];
    let current = [H - 1, W - 1];
    while (current) {
      path.push(current);
      current = parent[current[0]][current[1]];
    }

    return path.reverse(); // Path is from (0,0) to (H-1,W-1)
  }

  // Mark the shortest path on the maze grid
  function markPath(path) {
    let result = Array.from({ length: H }, () => Array(W).fill(0)); // Initialize with 0s

    for (let [r, c] of path) {
      result[r][c] = 1; // Mark the cells in the shortest path
    }

    return result;
  }

  // Main logic
  let shortestPath = bfs();
  if (shortestPath === null) {
    throw new Error('No path found from (0, 0) to (H-1, W-1)');
  }

  return markPath(shortestPath);
}

module.exports = { foo };
