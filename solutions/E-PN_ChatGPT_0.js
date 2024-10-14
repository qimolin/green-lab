function foo(name, typed) {
  let i = 0; // Pointer for name
  let j = 0; // Pointer for typed

  while (j < typed.length) {
    // If characters match, move both pointers
    if (i < name.length && name[i] === typed[j]) {
      i++;
      j++;
    }
    // If it's a long-pressed character, just move the typed pointer
    else if (j > 0 && typed[j] === typed[j - 1]) {
      j++;
    }
    // If there's a mismatch and it's not a long press, return false
    else {
      return false;
    }
  }

  // After the loop, check if we've consumed the entire name
  return i === name.length;
}

// Example usage:
console.log(foo('alex', 'aaleex')); // true
console.log(foo('saeed', 'ssaaedd')); // false
console.log(foo('leelee', 'lleeelee')); // true
console.log(foo('laiden', 'laiden')); // true

export default foo;
