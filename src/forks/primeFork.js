process.on('message', (msg) => {
  let response = this.primeFork(msg.number)
  process.send(response)
  process.exit()
})

exports.primeFork = (number) => {
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
