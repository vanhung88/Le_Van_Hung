// We will use the for loop to get the sum of 1st N natural numbers.
const sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum = sum + i;
  return sum;
};

// Using the recursion function to get the sum of the first N natural numbers.
const sum_to_n_b = function (n) {
  if (n !== 0) return n + sum_to_n_b(n - 1);
  else return n;
};

// we will use the formula for finding the n natural number.
// This is the most optimized solution. The time complexity is O(1) which is constant.
const sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};
