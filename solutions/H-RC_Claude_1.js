function foo(r, c, S) {
  // Create a queue for BFS
  class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(element) {
      this.items.push(element);
    }
    dequeue() {
      if (this.isEmpty()) return null;
      return this.items.shift();
    }
    isEmpty() {
      return this.items.length === 0;
    }
  }

  // Initialize the result grid
  let result = Array(r)
    .fill()
    .map(() => Array(c).fill(0));

  // If start or end is an obstacle, return the empty result
  if (S[0][0] === 1 || S[r - 1][c - 1] === 1) return result;

  // Direction vectors for adjacent cells (up, right, down, left)
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  // BFS implementation
  function bfs() {
    let queue = new Queue();
    let visited = Array(r)
      .fill()
      .map(() => Array(c).fill(false));
    let parent = Array(r)
      .fill()
      .map(() =>
        Array(c)
          .fill()
          .map(() => ({ r: -1, c: -1 }))
      );

    queue.enqueue({ r: 0, c: 0 });
    visited[0][0] = true;

    while (!queue.isEmpty()) {
      let current = queue.dequeue();

      // If we've reached the target
      if (current.r === r - 1 && current.c === c - 1) {
        return reconstructPath(parent);
      }

      // Check all four directions
      for (let i = 0; i < 4; i++) {
        let newR = current.r + dr[i];
        let newC = current.c + dc[i];

        // Check if the new position is valid
        if (
          isValid(newR, newC) &&
          !visited[newR][newC] &&
          S[newR][newC] === 0
        ) {
          queue.enqueue({ r: newR, c: newC });
          visited[newR][newC] = true;
          parent[newR][newC] = { r: current.r, c: current.c };
        }
      }
    }

    return false;
  }

  // Helper function to check if a position is valid
  function isValid(row, col) {
    return row >= 0 && row < r && col >= 0 && col < c;
  }

  // Reconstruct the path from end to start
  function reconstructPath(parent) {
    let path = [];
    let current = { r: r - 1, c: c - 1 };

    while (current.r !== -1 && current.c !== -1) {
      path.push(current);
      current = parent[current.r][current.c];
    }

    // Mark the path in the result grid
    for (let cell of path) {
      result[cell.r][cell.c] = 1;
    }

    return true;
  }

  // Run BFS and return the result
  bfs();
  return result;
}

export default foo;
