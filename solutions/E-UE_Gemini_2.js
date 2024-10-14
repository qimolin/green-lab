/*
  Given an integer array nums, return the sum of all the unique elements of nums.
  The unique elements of an array are those that appear exactly once in the array.

  For example:
  foo([1, 2, 3, 2]) == 4
  foo([1, 1, 1, 1, 1]) == 0
  foo([1, 2, 3, 4, 5]) == 15
*/
const foo = (nums) => {
  // Create a map to store the frequency of each element in the array.
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Iterate over the map and sum up the unique elements.
  let sum = 0;
  for (const [num, frequency] of frequencyMap) {
    if (frequency === 1) {
      sum += num;
    }
  }

  return sum;
};

export default foo;
