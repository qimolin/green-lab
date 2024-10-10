function foo(n) {
  if (n <= 0) {
    return [];
  }

  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i.toString());
  }

  result.sort();

  return result.map(Number);
}
export default { foo };
