function foo(board) {
    // Check if input is valid
    if (!/^[XO-]{9}$/.test(board)) {
        throw new Error("Invalid board format");
    }

    // Convert string to 3x3 board for regex pattern matching
    const formattedBoard = board[0] + board[1] + board[2] + '\n' +
                          board[3] + board[4] + board[5] + '\n' +
                          board[6] + board[7] + board[8];

    // Regex pattern to check for winning combinations
    const winningPattern = /(?:^(?:X{3}|O{3}).*)|        # Horizontal top
                           (?:^.{4}(?:X{3}|O{3}).*)|     # Horizontal middle
                           (?:^.{8}(?:X{3}|O{3}).*)|     # Horizontal bottom
                           (?:^(?:X|O)(.{3}\1){2}.*)|    # Vertical left
                           (?:^.(?:X|O)(.{3}\2){2}.*)|   # Vertical middle
                           (?:^..(?:X|O)(.{3}\3){2}.*)|  # Vertical right
                           (?:^(?:X|O).{3}\4.{3}\4.*)|   # Diagonal top-left to bottom-right
                           (?:^..(?:X|O).(?:\5)..\5.*)/x # Diagonal top-right to bottom-left

    return winningPattern.test(formattedBoard);
}

// Test cases
console.log(foo("XOXOXOXOX")); // false
console.log(foo("XXXXXOOOO")); // true
console.log(foo("XO-XO-XO-")); // true
console.log(foo("O--XO-XXO")); // false
console.log(foo("X--O-OX--")); // false
console.log(foo("XOXXOO---")); // false

module.exports = { foo };
