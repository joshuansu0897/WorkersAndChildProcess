// single thread
const { factorial } = require('./factorial')

async function run() {
  let number = 30000n

  console.time('factorial')
  console.log(factorial(number))
  console.timeEnd('factorial')
}

run()
