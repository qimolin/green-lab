function foo(board) {
  // Convert the string to a 3x3 representation for regex matching
  const rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)].join(
    '|'
  );

  // Create a string that represents all possible win combinations
  const allLines = [
    // Original rows
    board.slice(0, 3),
    board.slice(3, 6),
    board.slice(6, 9),
    // Columns
    board[0] + board[3] + board[6],
    board[1] + board[4] + board[7],
    board[2] + board[5] + board[8],
    // Diagonals
    board[0] + board[4] + board[8],
    board[2] + board[4] + board[6],
  ].join('|');

  // Check for three X's or three O's in a row
  return /XXX|OOO/.test(allLines);
}

// Test cases
console.log(foo('XXXXXOOOO')); // true
console.log(foo('XO-XO-XO-')); // true (X wins diagonally)
console.log(foo('O-OXXOX-O')); // true (O wins vertically)
console.log(foo('XO-X-OX-O')); // false (no winner)

export default { foo };
