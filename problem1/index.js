var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum = sum + i;
  return sum;
};

var sum_to_n_b = function (n) {
  if (n !== 0) return n + sum_to_n_b(n - 1);
  else return n;
};

// use mathematical formula
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};
