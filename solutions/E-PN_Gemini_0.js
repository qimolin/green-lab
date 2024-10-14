/*
  Given two strings name and typed, determine if typed could be a
  long-pressed version of name.

  A long-pressed character is a character that appears multiple times
  in a row in typed, but only once in name.

  For example:
    foo("alex", "aaleex") == true
    foo("saeed", "ssaaedd") == true
    foo("leelee", "lleeelee") == true
    foo("laiden", "laiden") == true
    foo("alex", "alexxr") == false
    foo("alex", "aaleelx") == false
*/
const foo = (name, typed) => {
  if (typed.length < name.length) {
    return false;
  }

  let i = 0;
  let j = 0;

  while (i < name.length && j < typed.length) {
    if (name[i] !== typed[j]) {
      return false;
    }

    // Find the end of the long-pressed character in typed
    while (j < typed.length && typed[j] === name[i]) {
      j++;
    }

    i++;
  }

  // If there are any remaining characters in typed, they are not part of name
  return j === typed.length;
};

export default foo;
