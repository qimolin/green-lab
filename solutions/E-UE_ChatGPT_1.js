function foo(nums) {
    // Create a map to store the frequency of each element
    const frequencyMap = new Map();

    // Count the frequency of each element in the array
    nums.forEach(num => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    // Sum up the elements that appear exactly once
    let sum = 0;
    frequencyMap.forEach((count, num) => {
        if (count === 1) {
            sum += num;
        }
    });

    return sum;
}
