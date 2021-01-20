exports.factorial = (number) => {
  let factorial = 1n

  for (let i = 1n; i < number; i++) {
    factorial = factorial * i
  }

  return {
    number,
    factorial
  }
}