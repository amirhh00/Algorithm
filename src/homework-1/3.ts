function findLowestN(a: number, b: number, c: number): number {
  let n = 0;

  while (a + b * n + c * n ** 2 >= (c + 1) * n ** 2) {
    n++;
  }

  return n;
}

console.log(findLowestN(1, 2, 3));
