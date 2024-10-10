function foo(board) {
  // Check if the board length is valid
  if (board.length !== 9) return false;

  // Regular expression for horizontal, vertical, and diagonal wins
  const regex = /^(...)?([XO])\2\2(?:...)?$|^..([XO])..\3..\3$|^[XO]..\1..\1$/;

  // Test the board string for a match using the regex
  return regex.test(board);
}

export default foo;
