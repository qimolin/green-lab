function foo(board) {
    // First, ensure the input is valid
    if (!/^[XO-]{9}$/.test(board)) {
        throw new Error("Invalid board format");
    }

    // Convert the string to a 3x3 board representation
    let formattedBoard =
        board.slice(0,3) + '\n' +
        board.slice(3,6) + '\n' +
        board.slice(6,9);

    // Regular expression pattern to check for winners
    // This checks horizontal, vertical, and diagonal patterns
    const winningPattern = /(?:XXX|OOO)/.test(formattedBoard) ||  // Horizontal
        /(?:(...)*(.))(?:\2(...)*\2){
