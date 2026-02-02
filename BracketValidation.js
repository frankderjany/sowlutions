function isValidBracketSequence(str) {
  const stack = [];
  let top = -1;

  function push(char) {
      top++;
      stack[top] = char;
  }

  function pop() {
      if (top === -1) return null;
      const value = stack[top];
      top--;
      return value;
  }

  function isEmpty() {
      return top === -1;
  }

  for (let i = 0; i < str.length; i++) {
      const ch = str[i];

      // Opening brackets
      if (ch === '(' || ch === '[' || ch === '{') {
          push(ch);
      }
      // Closing brackets
      else if (ch === ')' || ch === ']' || ch === '}') {
          if (isEmpty()) return false;

          const last = pop();

          if (
              (ch === ')' && last !== '(') ||
              (ch === ']' && last !== '[') ||
              (ch === '}' && last !== '{')
          ) {
              return false;
          }
      }
  }

  return isEmpty();
}