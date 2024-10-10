function foo(n) {
  // Create an array of numbers from 1 to n
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }

  // Sort the array lexicographically by converting each number to a string
  result.sort((a, b) => {
    return a.toString().localeCompare(b.toString());
  });

  return result;
}

// Example usage
console.log(foo(13)); // Output: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]

export default { foo };
