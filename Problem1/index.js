function countChar(str) {
  const counts = new Map();
  const result = [];

  for (const char of str) {
    if (char !== " ") {
      const upperChar = char.toUpperCase();
      if (!counts.has(upperChar)) {
        counts.set(upperChar, 1);
        result.push(upperChar);
      } else {
        counts.set(upperChar, counts.get(upperChar) + 1);
      }
    }
  }

  for (const char of result) {
    console.log(`${char}----${counts.get(char)}`);
  }
}

countChar("Amolya Sharma");
