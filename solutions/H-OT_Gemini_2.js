function foo(L, N, T, W, X, M, S, Y) {
  // Initialize an array to store the arrival times of each bus at each sorting station.
  let t = Array(N + 1)
    .fill(0)
    .map(() => Array(M).fill(0));

  // Initialize the arrival times of the non-reserve buses at the airport (sorting station 0).
  for (let i = 0; i < N; i++) {
    t[i][0] = T[i];
  }

  // Initialize the arrival time of the reserve bus at the airport.
  t[N][0] = Y;

  // Iterate over the sorting stations, starting from the second one (index 1).
  for (let j = 1; j < M; j++) {
    // Iterate over the buses.
    for (let i = 0; i <= N; i++) {
      // Calculate the expected arrival time of bus i at sorting station j.
      let e = t[i][j - 1] + (i < N ? W[i] : X) * (S[j] - S[j - 1]);

      // Initialize the actual arrival time of bus i at sorting station j to its expected arrival time.
      t[i][j] = e;

      // Iterate over the buses that arrived at the previous sorting station before bus i.
      for (let k = 0; k <= N; k++) {
        if (t[k][j - 1] < t[i][j - 1]) {
          // If bus k arrived at the previous sorting station before bus i,
          // update the arrival time of bus i to the maximum of its current arrival time
          // and the expected arrival time of bus k.
          t[i][j] = Math.max(t[i][j], t[k][j]);
        }
      }
    }
  }

  // Return the arrival time of the reserve bus at the hotel (the last sorting station).
  return t[N][M - 1];
}
export default foo;
