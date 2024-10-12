function foo(nums, minK, maxK) {
    let result = 0;
    let lastMin = -1;
    let lastMax = -1;
    let leftBound = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < minK || nums[i] > maxK) {
            leftBound = i;
        }
        if (nums[i] === minK) {
            lastMin = i;
        }
        if (nums[i] === maxK) {
            lastMax = i;
        }
        result += Math.max(0, Math.min(lastMin, lastMax) - leftBound);
    }

    return result;
}

export default foo;
