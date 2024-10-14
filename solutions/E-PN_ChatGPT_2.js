function foo(name, typed) {
    let i = 0;  // Pointer for name
    let j = 0;  // Pointer for typed

    // Traverse both strings
    while (j < typed.length) {
        if (i < name.length && name[i] === typed[j]) {
            // Characters match, move both pointers forward
            i++;
            j++;
        } else if (j > 0 && typed[j] === typed[j - 1]) {
            // Current character in typed is a repetition (long press), move typed pointer forward
            j++;
        } else {
            // Characters don't match and it's not a long press, return false
            return false;
        }
    }

    // If we've gone through all characters in name, it is a valid long press
    return i === name.length;
}
