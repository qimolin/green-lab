function foo(L, N, T, W, X, M, S, Y) {
  // Initialize an array to store the arrival times of each bus at each sorting station.
  let t = Array(N + 1).fill(0).map(() => Array(M).fill(0));

  // Set the initial departure times for all buses.
  for (let i = 0; i < N; i++) {
    t[i][0] = T[i];
  }
  t[N][0] = Y;

  // Iterate over the sorting stations.
  for (let j = 1; j < M; j++) {
    // Iterate over the buses.
    for (let i = 0; i <= N; i++) {
      // Calculate the expected arrival time of the current bus at the current sorting station.
      let e = t[i][j - 1] + (i < N ? W[i] : X) * (S[j] - S[j - 1]);

      // Initialize the actual arrival time to the expected arrival time.
      t[i][j] = e;

      // Iterate over the buses that have already arrived at the current sorting station.
      for (let k = 0; k <= N; k++) {
        if (t[k][j - 1] < t[i][j - 1]) {
          // If a slower bus has already arrived, update the actual arrival time to the maximum of the current actual arrival time and the arrival time of the slower bus.
          t[i][j] = Math.max(t[i][j], t[k][j]);
        }
      }
    }
  }

  // Return the arrival time of the reserve bus at the hotel.
  return t[N][M - 1];
}
module.exports = { foo };
