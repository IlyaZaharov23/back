const { subtract, sum, division, mult } = require("./math");

console.log(
  `Сумма: ${sum(5, 20)}, Вычитание: ${subtract(10, 2)}, Умножение: ${mult(
    2,
    12
  )}, Деление: ${division(28, 7)}`
);

