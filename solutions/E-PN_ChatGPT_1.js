function foo(name, typed) {
    let i = 0; // Pointer for the 'name' string
    let j = 0; // Pointer for the 'typed' string

    while (j < typed.length) {
        if (i < name.length && name[i] === typed[j]) {
            // If characters match, move both pointers forward
            i++;
            j++;
        } else if (j > 0 && typed[j] === typed[j - 1]) {
            // If it's a long press (current character matches previous), just move the 'typed' pointer
            j++;
        } else {
            // If neither condition is met, it's not a valid long press
            return false;
        }
    }

    // At the end, we need to ensure all characters of 'name' were used
    return i === name.length;
}
