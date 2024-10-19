from math import gcd

def maxScore(nums):
    n = len(nums)

    # Precompute GCD
    gcd_values = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(i+1, n):
            gcd_values[i][j] = gcd(nums[i], nums[j])

    # Memoization
    memo = {}

    def helper(index, remaining):
        if not remaining:
            return 0

        if tuple(remaining) in memo:
            return memo[tuple(remaining)]

        max_res = 0
        for i in range(len(remaining)):
            for j in range(i+1, len(remaining)):
                score = gcd_values[remaining[i]][remaining[j]] * index
                next_remaining = [remaining[k] for k in range(len(remaining)) if k != i and k != j]
                max_res = max(max_res, score + helper(index + 1, next_remaining))

        memo[tuple(remaining)] = max_res
        return max_res

    return helper(1, list(range(n)))


import json
import random
N = 50
input_output = [
    [[[1,2]], 1],
    [[[3, 4, 6, 8]], 11]
]
for _ in range(N - len(input_output)):
    n = random.randint(1, 7)
    arr = []
    for _ in range(n):
        arr.append(random.randint(1, 10**6))

    input_output.append([[arr], maxScore(arr)])

with open("./H-MS.json", "w+") as f:
    f.write(json.dumps(input_output))
