function foo(L, N, T, W, X, M, S, Y) {
  // Initialize arrays to store arrival times at each sorting station
  const arrivalTimes = new Array(N + 1)
    .fill(null)
    .map(() => new Array(M).fill(0));

  // Set departure times for all buses at the airport (station 0)
  for (let i = 0; i < N; i++) {
    arrivalTimes[i][0] = T[i];
  }
  arrivalTimes[N][0] = Y; // Reserve bus departure time

  // For each sorting station (except the airport)
  for (let j = 1; j < M; j++) {
    const distance = S[j] - S[j - 1];

    // Calculate expected arrival times for each bus
    const expectedTimes = new Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const speed = i < N ? W[i] : X;
      expectedTimes[i] = arrivalTimes[i][j - 1] + speed * distance;
    }

    // For each bus
    for (let i = 0; i <= N; i++) {
      let maxTime = expectedTimes[i];

      // Check all buses that arrived earlier at the previous station
      for (let k = 0; k <= N; k++) {
        if (arrivalTimes[k][j - 1] < arrivalTimes[i][j - 1]) {
          maxTime = Math.max(maxTime, expectedTimes[k]);
        }
      }

      arrivalTimes[i][j] = maxTime;
    }
  }

  // Return the arrival time of the reserve bus at the hotel
  return arrivalTimes[N][M - 1];
}

// Example usage:
// const L = 10;  // Length of road in km
// const N = 2;   // Number of non-reserve buses
// const T = [0, 5];  // Departure times of non-reserve buses
// const W = [2, 1];  // Speeds of non-reserve buses (seconds per km)
// const X = 1;   // Speed of reserve bus (seconds per km)
// const M = 3;   // Number of sorting stations
// const S = [0, 5, 10];  // Distances of sorting stations from airport
// const Y = 3;   // Departure time of reserve bus
//
// console.log(foo(L, N, T, W, X, M, S, Y));

export default { foo };
