function foo(nums) {
  // Create a frequency map to store the count of each element
  const frequencyMap = new Map();

  // Iterate over the nums array and count occurrences of each element
  for (let num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Calculate the sum of elements that appear exactly once
  let sum = 0;
  for (let [num, count] of frequencyMap.entries()) {
    if (count === 1) {
      sum += num;
    }
  }

  return sum;
}

export default foo;
