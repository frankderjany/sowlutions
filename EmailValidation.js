function validateEmail(email) {
  // 1. Must be a string
  if (typeof email !== "string") return false;

  // 2. Length constraints
  const n = email.length;
  if (n === 0 || n > 256) return false;

  let atIndex = -1;
  let atCount = 0;

  // 3. Find '@' and ensure no spaces
  for (let i = 0; i < n; i++) {
      const ch = email[i];

      if (ch === ' ') return false;

      if (ch === '@') {
          atCount++;
          atIndex = i;
      }
  }

  // 4. Exactly one '@'
  if (atCount !== 1) return false;

  // 5. '@' not first or last
  if (atIndex === 0 || atIndex === n - 1) return false;

  let dotAfterAt = false;

  // 6. Check '.' rules
  for (let i = atIndex + 1; i < n; i++) {
      if (email[i] === '.') {
          // '.' cannot be immediately before or after '@'
          if (i === atIndex + 1 || i === atIndex - 1) return false;

          // Must have at least 2 characters after the last '.'
          if (n - i - 1 < 2) return false;

          dotAfterAt = true;
          break;
      }
  }

  return dotAfterAt;
}