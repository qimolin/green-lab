function foo(nums, minK, maxK) {
  let count = 0;
  let minPos = -1,
    maxPos = -1,
    leftBound = -1;

  for (let i = 0; i < nums.length; i++) {
    // If the current element is out of the [minK, maxK] range, update the leftBound
    if (nums[i] < minK || nums[i] > maxK) {
      leftBound = i;
    }
    // Track the position of the most recent occurrence of minK
    if (nums[i] === minK) {
      minPos = i;
    }
    // Track the position of the most recent occurrence of maxK
    if (nums[i] === maxK) {
      maxPos = i;
    }

    // If we have found both minK and maxK in the subarray,
    // then the number of valid subarrays ending at index i
    // is the distance between the leftBound and the smaller of minPos and maxPos.
    if (minPos !== -1 && maxPos !== -1) {
      count += Math.max(0, Math.min(minPos, maxPos) - leftBound);
    }
  }

  return count;
}

export default foo;
