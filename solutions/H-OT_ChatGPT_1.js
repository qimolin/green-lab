function foo(L, N, T, W, X, M, S, Y) {
  // Initialize an array to track the arrival times of all buses (including the reserve bus) at each station.
  let arrivalTimes = Array.from({ length: N + 1 }, () => Array(M).fill(0));

  // Set the starting times for each bus at the airport (station 0).
  for (let i = 0; i < N; i++) {
    arrivalTimes[i][0] = T[i]; // Non-reserve buses start at their scheduled times.
  }
  arrivalTimes[N][0] = Y; // Reserve bus starts at the given Y time.

  // Loop through each sorting station (from 1 to M-1) and calculate the time of arrival for each bus.
  for (let j = 1; j < M; j++) {
    // Iterate over each bus (including the reserve bus).
    for (let i = 0; i <= N; i++) {
      // Calculate the expected arrival time of bus i at station j, assuming it can travel at its maximum speed.
      let distance = S[j] - S[j - 1];
      let travelTime = i === N ? X * distance : W[i] * distance;
      let expectedArrival = arrivalTimes[i][j - 1] + travelTime;

      // The bus i arrives at station j at the latest of its expected arrival time or the arrival times
      // of the slower buses ahead of it at station j-1 (those that arrived earlier).
      let actualArrival = expectedArrival;
      for (let k = 0; k <= N; k++) {
        if (arrivalTimes[k][j - 1] < arrivalTimes[i][j - 1]) {
          actualArrival = Math.max(actualArrival, arrivalTimes[k][j]);
        }
      }
      arrivalTimes[i][j] = actualArrival;
    }
  }

  // The time when the reserve bus arrives at the hotel (station M-1).
  return arrivalTimes[N][M - 1];
}

export default { foo };
