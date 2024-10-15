function foo(name, typed) {
    let i = 0; // Index for name
    let j = 0; // Index for typed

    while (j < typed.length) {
        // If characters match, move both pointers
        if (i < name.length && name[i] === typed[j]) {
            i++;
            j++;
        }
        // If characters don't match, check if it's a long press
        else if (j > 0 && typed[j] === typed[j - 1]) {
            j++;
        }
        // If neither condition is met, it's not a match
        else {
            return false;
        }
    }

    // Check if we've gone through all characters in the name
    return i === name.length;
}

export default foo;
