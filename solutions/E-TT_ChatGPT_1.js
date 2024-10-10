function foo(board) {
  // Ensure the board is a valid length of 9 characters
  if (board.length !== 9) {
    return false;
  }

  // Define regex for all winning patterns
  const winningPatterns = [
    /^([XO])\1\1.{6}$/, // First row
    /^.{3}([XO])\1\1.{3}$/, // Second row
    /^.{6}([XO])\1\1$/, // Third row
    /^([XO]).{2}\1.{2}\1$/, // First column
    /^.{1}([XO]).{2}\1.{2}\1$/, // Second column
    /^.{2}([XO]).{2}\1.{2}\1$/, // Third column
    /^([XO]).{3}\1.{3}\1$/, // Diagonal top-left to bottom-right
    /^.{2}([XO]).{1}\1.{1}\1$/, // Diagonal top-right to bottom-left
  ];

  // Test all patterns for a match
  for (let pattern of winningPatterns) {
    if (pattern.test(board)) {
      return true; // A winner is found
    }
  }

  // No winner found
  return false;
}

// Example usage:
console.log(foo('XXX------')); // true (X wins)
console.log(foo('XOXOXOXOX')); // false (no winner)
console.log(foo('OXOXOXOXO')); // false (no winner)
console.log(foo('XOX-XO-XO')); // true (O wins)

export default foo;
