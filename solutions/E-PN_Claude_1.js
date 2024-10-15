function foo(name, typed) {
    let nameIndex = 0;
    let typedIndex = 0;

    while (typedIndex < typed.length) {
      if (nameIndex < name.length && name[nameIndex] === typed[typedIndex]) {
        nameIndex++;
        typedIndex++;
      } else if (typedIndex > 0 && typed[typedIndex] === typed[typedIndex - 1]) {
        typedIndex++;
      } else {
        return false;
      }
    }

    return nameIndex === name.length;
  }

  export default foo;
