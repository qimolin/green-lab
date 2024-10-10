function foo(x, y) {
  // Check if both inputs are letters
  if (!/[a-zA-Z]/.test(x) || !/[a-zA-Z]/.test(y)) {
    return -1;
  }

  // Check if both are uppercase or both are lowercase
  const isXUpperCase = x === x.toUpperCase();
  const isYUpperCase = y === y.toUpperCase();

  if (isXUpperCase === isYUpperCase) {
    return 1;
  } else {
    return 0;
  }
}

export default foo;
