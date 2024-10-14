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
  let minKIndex = -1;
  let maxKIndex = -1;
  let outOfBoundsIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === minK) {
      minKIndex = i;
    }
    if (nums[i] === maxK) {
      maxKIndex = i;
    }
    if (nums[i] < minK || nums[i] > maxK) {
      outOfBoundsIndex = i;
    }
    count += Math.max(0, Math.min(minKIndex, maxKIndex) - outOfBoundsIndex);
  }
  return count;
};

export default foo;
