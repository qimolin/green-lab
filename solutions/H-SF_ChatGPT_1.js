function foo(nums, minK, maxK) {
  let count = 0;
  let minPos = -1,
    maxPos = -1,
    leftBound = -1;

  for (let i = 0; i < nums.length; i++) {
    // If the current number is out of the [minK, maxK] range, reset bounds
    if (nums[i] < minK || nums[i] > maxK) {
      leftBound = i;
      minPos = -1;
      maxPos = -1;
    }

    // Track the position of minK
    if (nums[i] === minK) {
      minPos = i;
    }

    // Track the position of maxK
    if (nums[i] === maxK) {
      maxPos = i;
    }

    // If we have seen both minK and maxK in the valid subarray, calculate the count
    if (minPos !== -1 && maxPos !== -1) {
      count += Math.min(minPos, maxPos) - leftBound;
    }
  }

  return count;
}

// Example usage:
const nums = [1, 3, 5, 2, 7, 5];
const minK = 3;
const maxK = 7;
console.log(foo(nums, minK, maxK)); // Output: 3

export default foo;
