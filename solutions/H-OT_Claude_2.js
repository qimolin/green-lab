function foo(L, N, T, W, X, M, S, Y) {
    // Create an array for all buses including reserve bus
    const allBusTimes = [...T, Y];
    const allBusSpeeds = [...W, X];

    // Initialize arrival times for all buses at all stations
    let arrivalTimes = Array(N + 1).fill().map(() => Array(M).fill(0));

    // Set initial arrival times at the airport (station 0)
    for (let i = 0; i <= N; i++) {
        arrivalTimes[i][0] = allBusTimes[i];
    }

    // For each station after the airport
    for (let station = 1; station < M; station++) {
        // Calculate distance between current and previous station
        const distance = S[station] - S[station - 1];

        // For each bus
        for (let bus = 0; bus <= N; bus++) {
            // Calculate expected arrival time if traveling at full speed
            const expectedTime = arrivalTimes[bus][station - 1] +
                                allBusSpeeds[bus] * distance;

            // Find the maximum arrival time of all buses that arrived
            // at the previous station earlier
            let maxPreviousTime = expectedTime;
            for (let prevBus = 0; prevBus <= N; prevBus++) {
                if (prevBus !== bus &&
                    arrivalTimes[prevBus][station - 1] <
                    arrivalTimes[bus][station - 1]) {
                    const prevBusExpectedTime =
                        arrivalTimes[prevBus][station - 1] +
                        allBusSpeeds[prevBus] * distance;
                    maxPreviousTime = Math.max(maxPreviousTime,
                                              prevBusExpectedTime);
                }
            }

            // Set the actual arrival time
            arrivalTimes[bus][station] = maxPreviousTime;
        }
    }

    // Return the arrival time of the reserve bus at the last station (hotel)
    return arrivalTimes[N][M - 1];
}
