function foo(nums) {
    // Create an object to store the count of each number
    const count = {};

    // Count the occurrences of each number
    for (const num of nums) {
      count[num] = (count[num] || 0) + 1;
    }

    // Sum up the unique elements (those with a count of 1)
    let sum = 0;
    for (const [num, occurrences] of Object.entries(count)) {
      if (occurrences === 1) {
        sum += parseInt(num);
      }
    }

    return sum;
  }

  export default foo;
