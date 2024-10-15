function foo(name, typed) {
    let nameIndex = 0;
    let typedIndex = 0;

    while (typedIndex < typed.length) {
        // If characters match, move both pointers
        if (nameIndex < name.length && name[nameIndex] === typed[typedIndex]) {
            nameIndex++;
            typedIndex++;
        }
        // If it's a repeated character in typed, just move typed pointer
        else if (typedIndex > 0 && typed[typedIndex] === typed[typedIndex - 1]) {
            typedIndex++;
        }
        // If neither condition is met, it's not a match
        else {
            return false;
        }
    }

    // Check if we've gone through all characters in the name
    return nameIndex === name.length;
}

export default foo;
