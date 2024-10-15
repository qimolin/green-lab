function foo(nums) {
    const countMap = new Map();

    // Count occurrences of each number
    for (const num of nums) {
      countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    // Sum up unique elements
    let sum = 0;
    for (const [num, count] of countMap) {
      if (count === 1) {
        sum += num;
      }
    }

    return sum;
  }

  export default foo;
