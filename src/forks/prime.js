exports.prime = (number) => {

  let isPrime = false

  let startDate = Date.now()
  for (let i = 3; i < (number - 1); i++) {
    if (number % i) {
      isPrime = true
    }
  }
  let endDate = Date.now()

  return {
    number,
    isPrime,
    time: (endDate - startDate)
  }
}
