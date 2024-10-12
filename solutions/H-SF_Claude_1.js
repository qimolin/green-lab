function foo(nums, minK, maxK) {
    let result = 0;
    let minPosition = -1;
    let maxPosition = -1;
    let leftBound = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < minK || nums[i] > maxK) {
            leftBound = i;
        }

        if (nums[i] === minK) {
            minPosition = i;
        }

        if (nums[i] === maxK) {
            maxPosition = i;
        }

        result += Math.max(0, Math.min(minPosition, maxPosition) - leftBound);
    }

    return result;
}

export default foo;
