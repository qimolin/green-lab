function foo(L, N, T, W, X, M, S, Y) {
  // Initialize the arrival times at each station for each bus, including the reserve bus
  let arrivalTimes = Array(N + 1)
    .fill(null)
    .map(() => Array(M).fill(0));

  // Set initial times at station 0 (the airport)
  for (let i = 0; i < N; i++) {
    arrivalTimes[i][0] = T[i]; // Time at the airport for non-reserve buses
  }
  arrivalTimes[N][0] = Y; // Time at the airport for the reserve bus

  // Loop over each station from 1 to M - 1 (since station 0 is the airport)
  for (let j = 1; j < M; j++) {
    for (let i = 0; i <= N; i++) {
      // Calculate the expected time to reach this station at full speed
      let expectedTime;
      if (i < N) {
        expectedTime = arrivalTimes[i][j - 1] + W[i] * (S[j] - S[j - 1]);
      } else {
        expectedTime = arrivalTimes[i][j - 1] + X * (S[j] - S[j - 1]);
      }

      // Find the maximum arrival time of any bus that arrived earlier to the previous station
      let maxArrival = expectedTime;
      for (let k = 0; k <= N; k++) {
        if (arrivalTimes[k][j - 1] < arrivalTimes[i][j - 1]) {
          let kExpectedTime;
          if (k < N) {
            kExpectedTime = arrivalTimes[k][j - 1] + W[k] * (S[j] - S[j - 1]);
          } else {
            kExpectedTime = arrivalTimes[k][j - 1] + X * (S[j] - S[j - 1]);
          }
          maxArrival = Math.max(maxArrival, kExpectedTime);
        }
      }

      // The actual arrival time at this station for bus i is the maximum of expected and maxArrival
      arrivalTimes[i][j] = Math.max(expectedTime, maxArrival);
    }
  }

  // Return the arrival time of the reserve bus (bus N) at the hotel (last sorting station)
  return arrivalTimes[N][M - 1];
}

export default foo;
