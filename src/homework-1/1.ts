function isSubsetSum(S: number[], k: number): boolean {
  const n = S.length;
  const dp: boolean[][] = [];
  let z = 0;
  // Initialize the DP table with false values
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(k + 1).fill(false);
  }

  // A sum of 0 is always possible with an empty subset
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      z++;
      if (S[i - 1] <= j) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - S[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  console.log("z: ", z);
  return dp[n][k];
}

// Example usage:
const S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 99999;

if (isSubsetSum(S, k)) {
  console.log("There is a subset that adds up to k.");
} else {
  console.log("No subset adds up to k.");
}
