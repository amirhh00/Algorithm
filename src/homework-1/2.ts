function areAnagrams(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) return false;

  // Sort the characters and compare the sorted strings
  const sortedStr1 = str1.split("").sort().join("");
  const sortedStr2 = str2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
}

console.log(areAnagrams("listen", "silent"));
