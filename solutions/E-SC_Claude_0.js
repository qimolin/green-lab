function foo(x, y) {
  // Check if both inputs are letters
  if (!/[a-zA-Z]/.test(x) || !/[a-zA-Z]/.test(y)) {
    return -1;
  }

  // Check if both are uppercase or both are lowercase
  const xIsUpper = x === x.toUpperCase();
  const yIsUpper = y === y.toUpperCase();

  if (xIsUpper === yIsUpper) {
    return 1;
  } else {
    return 0;
  }
}

export default { foo };
