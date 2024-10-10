function foo(n) {
  if (n <= 0) {
    return [];
  }

  // Generate an array of numbers from 1 to n
  let numbers = Array.from({ length: n }, (_, i) => i + 1);

  // Sort the numbers lexicographically (as strings)
  numbers.sort((a, b) => a.toString().localeCompare(b.toString()));

  return numbers;
}
export default foo;
