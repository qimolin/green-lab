/*
  Given an integer array nums, an integer minK and an integer maxK.
  A fixed-bound subarray of nums is a subarray that satisfies the following conditions:
    The minimum value in the subarray is equal to minK.
    The maximum value in the subarray is equal to maxK.
  A subarray is a contiguous part of an array.
  Return the number of fixed-bound subarrays.
*/
const foo = (nums, minK, maxK) => {
  let count = 0;
  let left = 0;
  let right = 0;
  let minKIndex = -1;
  let maxKIndex = -1;

  for (right = 0; right < nums.length; right++) {
    if (nums[right] === minK) {
      minKIndex = right;
    }
    if (nums[right] === maxK) {
      maxKIndex = right;
    }
    if (nums[right] < minK || nums[right] > maxK) {
      left = right + 1;
      minKIndex = -1;
      maxKIndex = -1;
    }
    if (minKIndex !== -1 && maxKIndex !== -1) {
      count += Math.min(minKIndex, maxKIndex) - left + 1;
    }
  }
  return count;
};

export default foo;
