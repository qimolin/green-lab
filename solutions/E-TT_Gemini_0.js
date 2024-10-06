function foo(board) {
  // Check for horizontal wins
  if (/^(XXX|OOO)...$/.test(board) ||
      /^...(XXX|OOO)...$/.test(board) ||
      /^......(XXX|OOO)$/.test(board)) {
    return true;
  }

  // Check for vertical wins
  if (/^(X..X..X..|O..O..O..)$/.test(board) ||
      /^(.X..X..X.|O..O..O.)$/.test(board) ||
      /^(..X..X..X|..O..O..O)$/.test(board)) {
    return true;
  }

  // Check for diagonal wins
  if (/^(X...X...X|O...O...O)$/.test(board) ||
      /^(..X.X.X..|..O.O.O..)$/.test(board)) {
    return true;
  }

  // No winner
  return false;
}
module.exports = { foo };
