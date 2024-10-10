function foo(L, N, T, W, X, M, S, Y) {
  // Initialize arrival times for all buses at all stations
  let arrivalTimes = Array(N + 1)
    .fill()
    .map(() => Array(M).fill(0));

  // Set initial departure times for all buses at the airport (station 0)
  for (let i = 0; i < N; i++) {
    arrivalTimes[i][0] = T[i];
  }
  arrivalTimes[N][0] = Y; // Reserve bus

  // For each station (except the airport)
  for (let j = 1; j < M; j++) {
    // Calculate the segment distance
    let segmentDistance = S[j] - S[j - 1];

    // For each bus
    for (let i = 0; i <= N; i++) {
      // Calculate expected arrival time if traveling at full speed
      let expectedTime;
      if (i < N) {
        expectedTime = arrivalTimes[i][j - 1] + W[i] * segmentDistance;
      } else {
        expectedTime = arrivalTimes[i][j - 1] + X * segmentDistance;
      }

      // Find the maximum arrival time of all buses that arrived earlier at the previous station
      let maxPreviousArrival = expectedTime;
      for (let k = 0; k <= N; k++) {
        if (k !== i && arrivalTimes[k][j - 1] < arrivalTimes[i][j - 1]) {
          let otherBusExpectedTime;
          if (k < N) {
            otherBusExpectedTime =
              arrivalTimes[k][j - 1] + W[k] * segmentDistance;
          } else {
            otherBusExpectedTime = arrivalTimes[k][j - 1] + X * segmentDistance;
          }
          maxPreviousArrival = Math.max(
            maxPreviousArrival,
            otherBusExpectedTime
          );
        }
      }

      // Set the actual arrival time
      arrivalTimes[i][j] = maxPreviousArrival;
    }
  }

  // Return the arrival time of the reserve bus at the hotel (last station)
  return arrivalTimes[N][M - 1];
}

export default foo;
