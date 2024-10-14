/*
  You are given two strings, name and typed. You are asked to determine if typed could be a long-pressed version of name.

  A long-pressed version of a string is a string where some characters may be repeated multiple times due to a long press on the keyboard.

  For example:
  "alex" is a long-pressed version of "alex"
  "aaleex" is a long-pressed version of "alex"
  "aaleexa" is not a long-pressed version of "alex"
*/
const foo = (name, typed) => {
  // If the typed string is shorter than the name, it cannot be a long-pressed version.
  if (typed.length < name.length) {
    return false;
  }

  // Keep track of the indices in both strings.
  let i = 0;
  let j = 0;

  // Iterate over both strings.
  while (i < name.length && j < typed.length) {
    // If the characters at the current indices match, move on to the next characters.
    if (name[i] === typed[j]) {
      i++;
      j++;
    }
    // If the characters don't match, check if the current character in typed is the same as the previous character.
    else if (j > 0 && typed[j] === typed[j - 1]) {
      j++;
    }
    // If neither of the above conditions is met, then typed is not a long-pressed version of name.
    else {
      return false;
    }
  }

  // If we reach the end of the name string, check if the remaining characters in typed are all the same as the last character in name.
  while (j < typed.length) {
    if (typed[j] !== name[name.length - 1]) {
      return false;
    }
    j++;
  }

  // If all the checks pass, then typed is a long-pressed version of name.
  return true;
};

export default foo;
