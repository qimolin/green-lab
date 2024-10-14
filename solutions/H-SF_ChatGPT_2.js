function foo(nums, minK, maxK) {
  let count = 0;
  let minPos = -1,
    maxPos = -1,
    leftBound = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < minK || nums[i] > maxK) {
      // Reset the bounds if the current number is out of the valid range
      leftBound = i;
      minPos = -1;
      maxPos = -1;
    }
    if (nums[i] === minK) {
      minPos = i;
    }
    if (nums[i] === maxK) {
      maxPos = i;
    }

    // A valid subarray exists if both minK and maxK have been found within valid bounds
    if (minPos !== -1 && maxPos !== -1) {
      count += Math.min(minPos, maxPos) - leftBound;
    }
  }

  return count;
}

// Example usage
const nums = [1, 3, 5, 2, 7, 5, 2, 1];
const minK = 2;
const maxK = 5;
console.log(foo(nums, minK, maxK)); // Output: Number of fixed-bound subarrays

export default foo;
