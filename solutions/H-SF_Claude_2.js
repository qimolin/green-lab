function foo(nums, minK, maxK) {
    let result = 0;
    let minPosition = -1;
    let maxPosition = -1;
    let leftBound = -1;

    for (let i = 0; i < nums.length; i++) {
        // If the current number is out of bounds, update the left bound
        if (nums[i] < minK || nums[i] > maxK) {
            leftBound = i;
        }

        // Update the positions of minK and maxK
        if (nums[i] === minK) {
            minPosition = i;
        }
        if (nums[i] === maxK) {
            maxPosition = i;
        }

        // Calculate the number of valid subarrays ending at the current position
        const validSubarrays = Math.min(minPosition, maxPosition) - leftBound;
        if (validSubarrays > 0) {
            result += validSubarrays;
        }
    }

    return result;
}

export default foo;
