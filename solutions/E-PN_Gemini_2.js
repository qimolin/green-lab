/*
  Given two strings name and typed, determine if typed could be a
  long-pressed version of name.

  A long-pressed character is a character that appears multiple times
  in a row in typed, but only once in name.

  For example:
    foo("alex", "aaleex") == true
    foo("saeed", "ssaaedd") == false
    foo("leelee", "lleeelee") == true
    foo("laiden", "laiden") == true
    foo("alex", "alexxr") == false
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

    let count1 = 1;
    while (i + 1 < name.length && name[i] === name[i + 1]) {
      count1++;
      i++;
    }

    let count2 = 1;
    while (j + 1 < typed.length && typed[j] === typed[j + 1]) {
      count2++;
      j++;
    }

    if (count2 < count1) {
      return false;
    }

    i++;
    j++;
  }

  return i === name.length && j === typed.length;
};

export default foo;
