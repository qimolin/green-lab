function foo(L, N, T, W, X, M, S, Y) {
  // Initialize arrays to store the arrival times at each sorting station for each bus
  let arrivalTimes = Array.from({ length: N + 1 }, () => Array(M).fill(0));

  // Set initial arrival times for non-reserve buses at the first sorting station (the airport)
  for (let i = 0; i < N; i++) {
    arrivalTimes[i][0] = T[i];
  }
  // Set initial arrival time for the reserve bus at the first sorting station (the airport)
  arrivalTimes[N][0] = Y;

  // Iterate over sorting stations (from station 1 to M-1, skipping the first which is the airport)
  for (let j = 1; j < M; j++) {
    // Calculate the arrival times for each bus at sorting station j
    for (let i = 0; i <= N; i++) {
      // Calculate expected time for bus i to reach station j assuming no delays
      let e = arrivalTimes[i][j - 1] + (i < N ? W[i] : X) * (S[j] - S[j - 1]);

      // Find the maximum of all the buses that arrived at station j - 1 to enforce no overtaking
      let maxPreviousTime = e;
      for (let k = 0; k <= N; k++) {
        if (arrivalTimes[k][j - 1] < arrivalTimes[i][j - 1]) {
          maxPreviousTime = Math.max(maxPreviousTime, arrivalTimes[k][j]);
        }
      }
      // Set the actual arrival time at station j for bus i
      arrivalTimes[i][j] = Math.max(e, maxPreviousTime);
    }
  }

  // Return the arrival time of the reserve bus (bus N) at the final sorting station (the hotel)
  return arrivalTimes[N][M - 1];
}

export default foo;
