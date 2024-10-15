function foo(nums) {
    const counts = {};
    let sum = 0;

    // Count occurrences of each number
    for (const num of nums) {
      counts[num] = (counts[num] || 0) + 1;
    }

    // Sum up numbers that appear only once
    for (const [num, count] of Object.entries(counts)) {
      if (count === 1) {
        sum += parseInt(num);
      }
    }

    return sum;
  }

  export default foo;
