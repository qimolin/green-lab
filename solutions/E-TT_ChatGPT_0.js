function foo(board) {
  // Define the regular expressions for each winning combination
  const winningPatterns = [
    // Horizontal rows
    /^([XO])\1\1....../, // Top row
    /^...([XO])\1\1.../, // Middle row
    /^......([XO])\1\1/, // Bottom row

    // Vertical columns
    /^([XO])..\1..\1../, // Left column
    /^.([XO])..\1..\1./, // Middle column
    /^..([XO])..\1..\1/, // Right column

    // Diagonals
    /^([XO])...\1...\1/, // Top-left to bottom-right diagonal
    /^..([XO]).\1.\1../, // Top-right to bottom-left diagonal
  ];

  // Check each pattern for a match
  for (let pattern of winningPatterns) {
    if (pattern.test(board)) {
      return true; // Return true if any pattern matches
    }
  }

  return false; // Return false if no pattern matches
}

export default { foo };
