def countSubarrays(nums, minK, maxK):
    """
    :type nums: List[int]
    :type minK: int
    :type maxK: int
    :rtype: int
    """
    preMin = -1
    preMax = -1
    boundary = -1

    res = 0
    # 以每部的i为右端点
    # 那么什么样的可以当左端点？
    # 离目前最近的max， min，idx更小的那个
    # 从那一点往前，只要不碰到范围外的都可以
    # 当然如果范围外的(boundary)idx 大于那一点了
    # 说明目前这一点无法成为右端点
    for i in range(len(nums)):
        if nums[i] < minK or nums[i] > maxK:
            boundary = i
            continue

        if nums[i] == minK:
            preMin = i
        if nums[i] == maxK:
            preMax = i

        res += max(0, min(preMin, preMax)-boundary)

    return res


import json
import random
N = 50
input_output = [
    [[[1, 3, 5, 2, 7], 1, 5], 2],
    [[[1, 1, 1, 1], 1, 1], 10]
]
for _ in range(N - len(input_output)):
    minK = random.randint(1, 10**6)
    maxK = random.randint(1, 10**6)
    nums_length = random.randint(2, 10**5)
    nums = []
    for _ in range(nums_length):
        nums.append(random.randint(1, 10**6))

    input_output.append([[nums, minK, maxK], countSubarrays(nums, minK, maxK)])

with open("./H-SF.json", "w+") as f:
    f.write(json.dumps(input_output))
