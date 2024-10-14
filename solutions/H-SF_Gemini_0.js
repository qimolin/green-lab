/*
  Given an integer array nums, an integer minK and an integer maxK,
  count the fixed-bound subarray of an array.

  A fixed-bound subarray of nums is a subarray that satisfies the following conditions:
    - The minimum value in the subarray is equal to minK.
    - The maximum value in the subarray is equal to maxK.

  A subarray is a contiguous part of an array.

  For example:
    foo([1,3,5,2,7,5], 1, 5) == 2
    foo([1,1,1,1], 1, 1) == 10
*/
const foo = (nums, minK, maxK) => {
  let count = 0;
  let j1 = -1;
  let j2 = -1;
  let k = -1;
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] < minK || nums[i] > maxK) {
      k = i;
    }
    if (nums[i] === minK) {
      j1 = i;
    }
    if (nums[i] === maxK) {
      j2 = i;
    }
    count += Math.max(0, Math.min(j1, j2) - k);
  }
  return count;
};

export default foo;
