function foo(x, y) {
  // Check if both inputs are letters
  if (!/[a-zA-Z]/.test(x) || !/[a-zA-Z]/.test(y)) {
    return -1;
  }

  // Check if both are uppercase or both are lowercase
  const xIsUpper = x === x.toUpperCase();
  const yIsUpper = y === y.toUpperCase();

  // Return 1 if both are the same case, 0 otherwise
  return xIsUpper === yIsUpper ? 1 : 0;
}

export default foo;
